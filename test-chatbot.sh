#!/bin/bash

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ANITYA CAVE HOUSE CHATBOT - COMPREHENSIVE TEST (20 Messages)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Test Categories:
# 1. FAQ Cache Hits (should use embeddings - $0.0001)
# 2. FAQ Cache Misses - Complex Questions (should use GPT-4o-mini - $0.001-0.002)
# 3. Multi-language Support
# 4. Edge Cases & Tricky Questions
# 5. Semantic Understanding (similar keywords, different meanings)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

API_URL="http://localhost:3006/api/chat"
TOTAL_COST=0
TEST_COUNT=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 ANITYA CAVE HOUSE CHATBOT - COMPREHENSIVE TEST"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Testing Hybrid Optimization System:"
echo "   • Layer 1: Semantic FAQ Cache (Embeddings)"
echo "   • Layer 2: GPT-4o-mini with Cached Prompt"
echo "   • Layer 3: GPT-4o-mini with Fresh Prompt"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to test a message
test_message() {
    local test_num=$1
    local category=$2
    local question=$3
    local language=$4
    local expected_result=$5

    TEST_COUNT=$((TEST_COUNT + 1))

    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}TEST #${test_num} - ${category}${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "❓ Question: $question"
    echo "🌍 Language: $language"
    echo "🎯 Expected: $expected_result"
    echo ""

    # Make API call
    RESPONSE=$(curl -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"messages\": [{\"role\": \"user\", \"content\": \"$question\"}], \"language\": \"$language\"}" \
        -s 2>/dev/null)

    # Parse response
    CACHED=$(echo "$RESPONSE" | jq -r '.cached // false')
    PROMPT_CACHED=$(echo "$RESPONSE" | jq -r '.promptCached // false')
    CONFIDENCE=$(echo "$RESPONSE" | jq -r '.confidence // 0')
    FAQ_ID=$(echo "$RESPONSE" | jq -r '.faqId // "none"')
    MESSAGE=$(echo "$RESPONSE" | jq -r '.message' | head -c 200)
    USAGE=$(echo "$RESPONSE" | jq -r '.usage.total_tokens // 0')

    # Determine cost
    if [ "$CACHED" == "true" ]; then
        COST=0.0001
        STATUS="${GREEN}✅ FAQ CACHE HIT${NC}"
    elif [ "$PROMPT_CACHED" == "true" ]; then
        COST=0.0002
        STATUS="${GREEN}⚡ GPT-4o-mini (Prompt Cached)${NC}"
    else
        COST=0.002
        STATUS="${YELLOW}🔄 GPT-4o-mini (Fresh)${NC}"
    fi

    echo -e "📊 Result: $STATUS"
    echo "💰 Cost: \$$COST"

    if [ "$CACHED" == "true" ]; then
        echo "🎯 FAQ ID: $FAQ_ID"
        echo "📈 Confidence: $(echo "$CONFIDENCE * 100" | bc)%"
    fi

    if [ ! -z "$USAGE" ] && [ "$USAGE" != "0" ]; then
        echo "🔢 Tokens: $USAGE"
    fi

    echo "💬 Response Preview:"
    echo "   \"$MESSAGE...\""
    echo ""

    # Add to total cost
    TOTAL_COST=$(echo "$TOTAL_COST + $COST" | bc)

    sleep 1
}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CATEGORY 1: FAQ CACHE HITS (Should use Embeddings)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}CATEGORY 1: FAQ CACHE HITS (Embeddings)${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

test_message 1 "FAQ - Exact Match (TR)" "Balon turu ne kadar?" "tr" "FAQ Cache Hit"

test_message 2 "FAQ - Paraphrased (TR)" "Balonla uçuş fiyatı nedir?" "tr" "FAQ Cache Hit"

test_message 3 "FAQ - Suite Info (TR)" "Hangi odalarınız var?" "tr" "FAQ Cache Hit"

test_message 4 "FAQ - Breakfast (TR)" "Kahvaltı dahil mi?" "tr" "FAQ Cache Hit"

test_message 5 "FAQ - English" "How much does the balloon tour cost?" "en" "FAQ Cache Hit (EN)"

test_message 6 "FAQ - Chinese" "热气球之旅多少钱？" "zh" "FAQ Cache Hit (ZH)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CATEGORY 2: COMPLEX QUESTIONS (Should use GPT-4o-mini)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}CATEGORY 2: COMPLEX QUESTIONS (GPT-4o-mini)${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

test_message 7 "Complex - Travel Plan" "3 günlük Kapadokya seyahat planı hazırla, hem balon hem ATV hem de kültürel yerler görmek istiyorum" "tr" "GPT-4o-mini"

test_message 8 "Complex - Personalized Advice" "Çocuklu bir aileyiz, 5 ve 8 yaşında çocuklarımız var, onlar için hangi aktiviteler uygun?" "tr" "GPT-4o-mini"

test_message 9 "Complex - Restaurant Recommendations" "Vejetaryen yemekleri olan ve romantik bir atmosferi olan restoran öner" "tr" "GPT-4o-mini"

test_message 10 "Complex - Photography Tips" "Fotoğraf çekmeyi seviyorum, gün batımında en iyi kareler için nereye gitmeliyim?" "tr" "GPT-4o-mini"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CATEGORY 3: SEMANTIC UNDERSTANDING (Tricky - Same Keywords, Different Meaning)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo -e "${RED}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${RED}CATEGORY 3: SEMANTIC UNDERSTANDING (Edge Cases)${NC}"
echo -e "${RED}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

test_message 11 "Semantic - Fear (Should NOT cache)" "Balon turundan çok korkuyorum, başka ne yapabilirim?" "tr" "Cache Miss (Different Meaning)"

test_message 12 "Semantic - Complaint (Should NOT cache)" "Balon turuna gittik ama çok kötüydü, para iadesi alabilir miyim?" "tr" "Cache Miss (Complaint)"

test_message 13 "Semantic - Timing Question" "Balon ne zaman uçuyor, saati nedir?" "tr" "Might Cache or GPT"

test_message 14 "Semantic - Weather Concern" "Yarın hava kötü olursa balon turu iptal mi olur?" "tr" "GPT-4o-mini (Not in FAQ)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CATEGORY 4: EDGE CASES & SPECIAL REQUESTS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}CATEGORY 4: EDGE CASES & SPECIAL REQUESTS${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

test_message 15 "Edge - Accessibility" "Tekerlekli sandalye kullanan babam için uygun suite var mı?" "tr" "GPT-4o-mini (Accessibility)"

test_message 16 "Edge - Pet Policy" "Küçük köpeğimle kalabilir miyiz?" "tr" "Might Cache (Pet FAQ)"

test_message 17 "Edge - Special Diet" "Glutensiz kahvaltı seçeneği var mı?" "tr" "GPT-4o-mini (Special Request)"

test_message 18 "Edge - Last Minute Booking" "Bugün gece için boş odanız var mı?" "tr" "GPT-4o-mini (Real-time)"

test_message 19 "Edge - Group Booking" "10 kişilik bir grup geliyoruz, hepimizi aynı yere yerleştirebilir misiniz?" "tr" "GPT-4o-mini (Complex)"

test_message 20 "Edge - Mixed Language" "How much kahvaltı? Suite price?" "en" "GPT-4o-mini (Mixed)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SUMMARY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}📊 TEST SUMMARY${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Total Tests: $TEST_COUNT"
echo "Total Cost: \$$TOTAL_COST"
echo ""
echo "💡 Cost Analysis:"
echo "   • Old System (GPT-4o):     \$$(echo "$TEST_COUNT * 0.07" | bc)"
echo "   • New System (Hybrid):     \$$TOTAL_COST"
echo "   • Savings:                 \$$(echo "$TEST_COUNT * 0.07 - $TOTAL_COST" | bc)"
echo "   • Reduction:               $(echo "scale=1; ($TEST_COUNT * 0.07 - $TOTAL_COST) / ($TEST_COUNT * 0.07) * 100" | bc)%"
echo ""
echo -e "${GREEN}✅ Test Completed!${NC}"
echo ""
