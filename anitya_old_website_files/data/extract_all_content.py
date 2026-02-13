#!/usr/bin/env python3
"""
Extract all content from WordPress SQL database
This script extracts all pages, posts, rooms, and other content in all available languages
"""

import re
import json
import html

def clean_html(text):
    """Remove HTML tags and decode HTML entities"""
    if not text:
        return ""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Decode HTML entities
    text = html.unescape(text)
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_content_from_sql(sql_file):
    """Extract all content from WordPress SQL dump"""

    with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Find all wp_posts INSERT statements
    posts_pattern = r"INSERT INTO `wp_posts`.*?VALUES\s*(.*?);"
    posts_matches = re.finditer(posts_pattern, content, re.DOTALL)

    all_content = {
        "pages": {},
        "rooms": [],
        "posts": [],
        "testimonials": [],
        "navigation": {},
        "metadata": {}
    }

    for match in posts_matches:
        values_text = match.group(1)

        # Split by record (each record is enclosed in parentheses)
        records = re.findall(r'\(([^)]*(?:\([^)]*\)[^)]*)*)\)', values_text)

        for record in records:
            # Parse the record fields
            # Fields: ID, post_author, post_date, post_date_gmt, post_content, post_title,
            # post_excerpt, post_status, comment_status, ping_status, post_password, post_name,
            # to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent,
            # guid, menu_order, post_type, post_mime_type, comment_count

            # Use a more sophisticated field extraction
            fields = []
            current_field = ""
            in_quotes = False
            escape_next = False
            paren_count = 0

            for char in record:
                if escape_next:
                    current_field += char
                    escape_next = False
                elif char == '\\':
                    current_field += char
                    escape_next = True
                elif char == "'" and not escape_next:
                    in_quotes = not in_quotes
                    if not in_quotes and paren_count == 0:
                        # End of field
                        continue
                    elif in_quotes and paren_count == 0:
                        # Start of field
                        continue
                    else:
                        current_field += char
                elif char == ',' and not in_quotes and paren_count == 0:
                    fields.append(current_field)
                    current_field = ""
                elif char == '(' and in_quotes:
                    paren_count += 1
                    current_field += char
                elif char == ')' and in_quotes:
                    paren_count -= 1
                    current_field += char
                else:
                    current_field += char

            if current_field:
                fields.append(current_field)

            if len(fields) < 23:
                continue

            post_id = fields[0].strip()
            post_content = fields[4].strip()
            post_title = fields[5].strip()
            post_excerpt = fields[6].strip()
            post_status = fields[7].strip()
            post_name = fields[11].strip()
            post_type = fields[20].strip()

            # Only process published content
            if post_status != 'publish':
                continue

            # Remove quotes from strings
            post_content = post_content.strip("'")
            post_title = post_title.strip("'")
            post_excerpt = post_excerpt.strip("'")
            post_name = post_name.strip("'")
            post_type = post_type.strip("'")

            # Decode escaped quotes and newlines
            post_content = post_content.replace("\\'", "'").replace('\\"', '"')
            post_title = post_title.replace("\\'", "'").replace('\\"', '"')
            post_excerpt = post_excerpt.replace("\\'", "'").replace('\\"', '"')

            item = {
                "id": post_id,
                "title": post_title,
                "slug": post_name,
                "content": post_content,
                "excerpt": post_excerpt,
                "type": post_type
            }

            # Categorize by post type
            if post_type == 'page':
                # Check if it's a language-specific page
                if '_en' in post_name or post_name in ['home', 'about', 'contact', 'gallery', 'rooms']:
                    lang = 'en'
                elif '_tr' in post_name or '_turkish' in post_name:
                    lang = 'tr'
                elif '_zh' in post_name or '_chinese' in post_name:
                    lang = 'zh'
                else:
                    lang = 'default'

                page_key = post_name.replace('_en', '').replace('_tr', '').replace('_zh', '').replace('_turkish', '').replace('_chinese', '')

                if page_key not in all_content["pages"]:
                    all_content["pages"][page_key] = {}

                all_content["pages"][page_key][lang] = {
                    "title": post_title,
                    "content": post_content,
                    "excerpt": post_excerpt,
                    "slug": post_name
                }

            elif post_type == 'shb_accommodation':
                all_content["rooms"].append(item)

            elif post_type == 'post':
                all_content["posts"].append(item)

            elif post_type == 'shb_testimonial':
                all_content["testimonials"].append(item)

    return all_content

def main():
    sql_file = '/Users/keremal/Projects/Web/anityacavehouse/anitya_old_website_files/data/anityaca_wp142.sql'
    output_file = '/Users/keremal/Projects/Web/anityacavehouse/anitya_old_website_files/data/complete_website_content.json'

    print("Extracting content from SQL database...")
    content = extract_content_from_sql(sql_file)

    print(f"\nExtracted content summary:")
    print(f"- Pages: {len(content['pages'])}")
    print(f"- Rooms: {len(content['rooms'])}")
    print(f"- Posts: {len(content['posts'])}")
    print(f"- Testimonials: {len(content['testimonials'])}")

    print(f"\nPage keys found: {list(content['pages'].keys())}")

    # Save to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(content, f, ensure_ascii=False, indent=2)

    print(f"\nContent saved to: {output_file}")

if __name__ == '__main__':
    main()
