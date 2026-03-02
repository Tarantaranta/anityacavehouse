#!/bin/bash

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ANITYA CAVE HOUSE - QUALITY TEST (10 Critical Questions)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

API_URL="http://localhost:3006/api/chat"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}🧪 QUALITY TEST - 10 Critical Questions${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

test_question() {
    local num=$1
    local category=$2
    local question=$3
    local language=$4
    local expected_behavior=$5

    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}TEST #${num}: ${category}${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}❓ Question:${NC} $question"
    echo -e "${CYAN}🎯 Expected:${NC} $expected_behavior"
    echo ""

    RESPONSE=$(curl -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"messages\": [{\"role\": \"user\", \"content\": \"$question\"}], \"language\": \"$language\"}" \
        -s 2>/dev/null)

    FAQ_ASSISTED=$(echo "$RESPONSE" | jq -r '.faqAssisted // false')
    FAQ_ID=$(echo "$RESPONSE" | jq -r '.faqId // "none"')
    FAQ_CONFIDENCE=$(echo "$RESPONSE" | jq -r '.faqConfidence // 0')
    MESSAGE=$(echo "$RESPONSE" | jq -r '.message')
    TOKENS=$(echo "$RESPONSE" | jq -r '.usage.total_tokens // 0')

    # Display result
    if [ "$FAQ_ASSISTED" == "true" ]; then
        CONFIDENCE_PCT=$(echo "$FAQ_CONFIDENCE * 100" | bc)
        echo -e "${GREEN}✅ FAQ-ASSISTED${NC}"
        echo -e "   FAQ ID: ${FAQ_ID}"
        echo -e "   Confidence: ${CONFIDENCE_PCT}%"
    else
        echo -e "${YELLOW}🤖 GPT-4o-mini (Pure)${NC}"
        if [ "$FAQ_CONFIDENCE" != "0" ]; then
            CONFIDENCE_PCT=$(echo "$FAQ_CONFIDENCE * 100" | bc)
            echo -e "   Best match: ${CONFIDENCE_PCT}% (below threshold)"
        fi
    fi

    echo -e "   Tokens: ${TOKENS}"
    echo ""
    echo -e "${CYAN}💬 Response:${NC}"
    echo "$MESSAGE" | head -c 500
    if [ ${#MESSAGE} -gt 500 ]; then
        echo "..."
    fi
    echo ""

    # Check for quick answers
    if echo "$MESSAGE" | grep -q "HIZLI_CEVAPLAR"; then
        echo -e "${GREEN}   ✓ Has quick answer buttons${NC}"
    fi

    # Check for emoji
    if echo "$MESSAGE" | grep -qE '😊|🎈|🏨|🗺️|💼|📸|🍽️|🌄|✨|🎯'; then
        echo -e "${GREEN}   ✓ Has emoji (personalized)${NC}"
    fi

    sleep 2
}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 10 CRITICAL QUALITY TESTS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# TEST 1: Simple FAQ - Should match with high confidence
test_question 1 \
    "FAQ: Exact Match" \
    "Balon turu ne kadar?" \
    "tr" \
    "FAQ-assisted, high confidence, contextual response with buttons"

# TEST 2: Semantic Challenge - Same word, DIFFERENT meaning (should NOT match)
test_question 2 \
    "Semantic Understanding (Critical)" \
    "Balon turu çok tehlikeli diyorlar, doğru mu?" \
    "tr" \
    "Should NOT match balloon price FAQ - different intent (safety vs price)"

# TEST 3: Paraphrased FAQ - Should still match
test_question 3 \
    "FAQ: Paraphrase Test" \
    "Sıcak hava balonu uçuşu kaça mal olur?" \
    "tr" \
    "FAQ-assisted, reasonable confidence, natural response"

# TEST 4: Complex Personalized Request - Should use GPT-4o-mini intelligence
test_question 4 \
    "Complex Request" \
    "Yaşlı annem ve küçük çocuğum var, 2 günlük özel bir plan hazırlar mısın?" \
    "tr" \
    "Pure GPT-4o-mini, personalized multi-day plan considering family needs"

# TEST 5: Multi-language FAQ
test_question 5 \
    "Multi-language FAQ (English)" \
    "How much does the hot air balloon ride cost?" \
    "en" \
    "FAQ-assisted (EN), natural English response with contextual details"

# TEST 6: Edge Case - Complaint (should NOT feel robotic)
test_question 6 \
    "Edge Case: Complaint Handling" \
    "Rezervasyonumu iptal etmek istiyorum, para iadesi alabilir miyim?" \
    "tr" \
    "Should handle empathetically, explain policy, offer alternatives"

# TEST 7: Contextual Follow-up (intelligence test)
test_question 7 \
    "Contextual Intelligence" \
    "Kahvaltı var mı? Glutensiz seçenekler sunabiliyor musunuz?" \
    "tr" \
    "Should understand both questions, provide comprehensive answer"

# TEST 8: Local Knowledge Test
test_question 8 \
    "Local Expertise" \
    "Gün batımında fotoğraf çekmek için Göreme'de en iyi nokta neresi?" \
    "tr" \
    "Should provide specific locations, tips, distances - expert knowledge"

# TEST 9: Multi-language (Chinese)
test_question 9 \
    "Multi-language FAQ (Chinese)" \
    "热气球之旅多少钱？" \
    "zh" \
    "FAQ-assisted (ZH), natural Chinese response"

# TEST 10: Robot Detection Test - Question that SOUNDS like FAQ but isn't
test_question 10 \
    "Robot Detection (Critical)" \
    "Balon turları neden bu kadar pahalı, daha ucuz alternatif var mı?" \
    "tr" \
    "Should NOT blindly match balloon FAQ - different intent (why expensive + alternatives)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SUMMARY
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}📊 QUALITY TEST COMPLETED${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "✅ All 10 critical quality tests completed!"
echo ""
echo "Quality Indicators to Check:"
echo "  1. FAQ matching accuracy (Tests 1, 3, 5, 9)"
echo "  2. Semantic understanding - no wrong matches (Tests 2, 10)"
echo "  3. Complex personalization (Test 4)"
echo "  4. Empathetic handling (Test 6)"
echo "  5. Contextual intelligence (Tests 7, 8)"
echo "  6. Never robotic - always natural (All tests)"
echo ""
