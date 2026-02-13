#!/usr/bin/env python3
"""
Extract all content from WordPress SQL database - Version 2
Simplified approach that reads line by line
"""

import re
import json
import html as htmllib

def clean_html(text):
    """Remove HTML tags and decode HTML entities"""
    if not text:
        return ""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    # Decode HTML entities
    text = htmllib.unescape(text)
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    # Decode WordPress shortcodes brackets
    text = text.replace('[vc_row]', '').replace('[/vc_row]', '')
    text = text.replace('[vc_column]', '').replace('[/vc_column]', '')
    text = text.replace('[vc_column_text]', '').replace('[/vc_column_text]', '')
    # Remove remaining shortcodes
    text = re.sub(r'\[/?[^\]]+\]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_field(line, field_num):
    """Extract a specific field from a SQL VALUES line"""
    # This is a simplified extraction - split by comma and handle quotes
    # Field numbers: 0=ID, 4=content, 5=title, 6=excerpt, 7=status, 11=slug, 20=post_type

    try:
        # Find all quoted strings
        parts = []
        current = ""
        in_quote = False
        escaped = False

        for char in line:
            if escaped:
                current += char
                escaped = False
            elif char == '\\':
                escaped = True
                current += char
            elif char == "'":
                if in_quote:
                    parts.append(current)
                    current = ""
                    in_quote = False
                else:
                    in_quote = True
            elif char == ',' and not in_quote:
                if current and not in_quote:
                    parts.append(current.strip())
                    current = ""
            else:
                if in_quote:
                    current += char
                else:
                    current += char

        if current:
            parts.append(current.strip())

        # Clean up the parts - remove leading numbers and commas
        cleaned_parts = []
        for i, part in enumerate(parts):
            # First part might have the opening paren and ID
            if i == 0:
                # Extract ID
                match = re.match(r'\((\d+),', part)
                if match:
                    cleaned_parts.append(match.group(1))
                    continue
            cleaned_parts.append(part)

        if field_num < len(cleaned_parts):
            return cleaned_parts[field_num]
        return ""
    except:
        return ""

def parse_sql_line(line):
    """Parse a single line from wp_posts INSERT statement"""
    # Extract values between parentheses
    match = re.search(r'\((\d+),.*?, \'(.*?)\', \'(.*?)\', \'(.*?)\', \'.*?\', \'.*?\', \'.*?\', \'.*?\', \'.*?\', \'.*?\', \'(.*?)\'.*?, \'(.*?)\'', line)

    if not match:
        return None

    return {
        'id': match.group(1),
        'title': match.group(3),
        'slug': match.group(5),
        'post_type': match.group(6)
    }

def main():
    sql_file = '/Users/keremal/Projects/Web/anityacavehouse/anitya_old_website_files/data/anityaca_wp142.sql'
    output_file = '/Users/keremal/Projects/Web/anityacavehouse/anitya_old_website_files/data/complete_website_content.json'

    print("Reading SQL file...")

    all_content = {
        "pages": {},
        "rooms": {},
        "posts": [],
        "testimonials": [],
        "languages_found": [],
        "metadata": {
            "extraction_note": "Content extracted from WordPress SQL database",
            "source": "anityaca_wp142.sql"
        }
    }

    # Read the SQL file and look for wp_posts inserts
    with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Find the wp_posts section
    posts_section_match = re.search(r'INSERT INTO `wp_posts`.*?VALUES\s*(.*?);', content, re.DOTALL)

    if not posts_section_match:
        print("Could not find wp_posts section")
        return

    posts_data = posts_section_match.group(1)

    # Split into individual records (very carefully handling nested parentheses)
    records = []
    current_record = ""
    paren_depth = 0
    in_quote = False
    escaped = False

    for char in posts_data:
        if escaped:
            current_record += char
            escaped = False
            continue

        if char == '\\':
            current_record += char
            escaped = True
            continue

        if char == "'" and not escaped:
            in_quote = not in_quote

        if not in_quote:
            if char == '(':
                paren_depth += 1
            elif char == ')':
                paren_depth -= 1
                if paren_depth == 0:
                    current_record += char
                    records.append(current_record)
                    current_record = ""
                    continue

        if paren_depth > 0:
            current_record += char

    print(f"Found {len(records)} records")

    # Process each record
    for record in records:
        # Extract fields using regex
        # Pattern: (ID, author, date, date_gmt, 'content', 'title', 'excerpt', 'status', ...)

        # Try to extract key fields
        field_match = re.match(
            r"\((\d+),\s*\d+,\s*'[^']*',\s*'[^']*',\s*'(.*?)',\s*'(.*?)',\s*'(.*?)',\s*'(.*?)',.*?'(.*?)',.*?'(.*?)'",
            record,
            re.DOTALL
        )

        if not field_match:
            continue

        post_id = field_match.group(1)
        post_content_raw = field_match.group(2)
        post_title = field_match.group(3)
        post_excerpt = field_match.group(4)
        post_status = field_match.group(5)
        post_name = field_match.group(6)
        post_type = field_match.group(7)

        # Only process published content
        if post_status != 'publish':
            continue

        # Clean content
        post_content = clean_html(post_content_raw)
        post_title_clean = htmllib.unescape(post_title.replace("\\'", "'").replace('\\"', '"'))
        post_excerpt_clean = htmllib.unescape(post_excerpt.replace("\\'", "'").replace('\\"', '"'))

        # Skip if title is empty
        if not post_title_clean:
            continue

        item = {
            "id": post_id,
            "title": post_title_clean,
            "slug": post_name,
            "content": post_content,
            "content_raw": post_content_raw[:500] + "..." if len(post_content_raw) > 500 else post_content_raw,  # Keep first 500 chars of raw
            "excerpt": post_excerpt_clean,
            "type": post_type
        }

        # Categorize by post type
        if post_type == 'page':
            # Detect language
            lang = 'en'  # default
            if '_tr' in post_name or 'turkish' in post_name.lower():
                lang = 'tr'
            elif '_zh' in post_name or 'chinese' in post_name.lower():
                lang = 'zh'
            elif post_name in ['ana-sayfa', 'hakkimizda', 'iletisim', 'galeri']:
                lang = 'tr'
            elif post_name in ['home', 'about', 'contact', 'gallery', 'rooms']:
                lang = 'en'

            if lang not in all_content["languages_found"]:
                all_content["languages_found"].append(lang)

            # Normalize page key
            page_key = (post_name
                       .replace('_en', '').replace('_tr', '').replace('_zh', '')
                       .replace('-en', '').replace('-tr', '').replace('-zh', '')
                       .replace('_english', '').replace('_turkish', '').replace('_chinese', ''))

            if page_key not in all_content["pages"]:
                all_content["pages"][page_key] = {}

            all_content["pages"][page_key][lang] = {
                "title": post_title_clean,
                "content": post_content,
                "content_raw": post_content_raw,
                "excerpt": post_excerpt_clean,
                "slug": post_name
            }

        elif post_type == 'shb_accommodation':
            # Room/accommodation
            lang = 'en'  # default
            if '_tr' in post_name or 'turkish' in post_name.lower():
                lang = 'tr'
            elif '_zh' in post_name or 'chinese' in post_name.lower():
                lang = 'zh'

            if lang not in all_content["languages_found"]:
                all_content["languages_found"].append(lang)

            room_key = (post_name
                       .replace('_en', '').replace('_tr', '').replace('_zh', '')
                       .replace('-en', '').replace('-tr', '').replace('-zh', ''))

            if room_key not in all_content["rooms"]:
                all_content["rooms"][room_key] = {}

            all_content["rooms"][room_key][lang] = item

        elif post_type == 'post':
            all_content["posts"].append(item)

        elif post_type == 'shb_testimonial':
            all_content["testimonials"].append(item)

    print(f"\nExtracted content summary:")
    print(f"- Pages: {len(all_content['pages'])} ({list(all_content['pages'].keys())})")
    print(f"- Rooms: {len(all_content['rooms'])} ({list(all_content['rooms'].keys())})")
    print(f"- Posts: {len(all_content['posts'])}")
    print(f"- Testimonials: {len(all_content['testimonials'])}")
    print(f"- Languages found: {all_content['languages_found']}")

    # Save to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_content, f, ensure_ascii=False, indent=2)

    print(f"\nContent saved to: {output_file}")

if __name__ == '__main__':
    main()
