import OpenAI from 'openai';
import faqDatabase from '@/data/faq-with-embeddings.json';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

/**
 * Calculate cosine similarity between two vectors
 * Returns a value between -1 and 1, where 1 means identical
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

export interface FAQMatchResult {
  isCached: boolean;
  answer?: string;
  confidence?: number;
  faqId?: string;
  category?: string;
}

/**
 * Find semantically similar FAQ using OpenAI embeddings
 *
 * @param userQuestion - The user's question
 * @param language - Language code (tr, en, zh)
 * @returns FAQ match result with cached answer if confidence is high
 *
 * How it works:
 * 1. Generate embedding for user question (semantic vector representation)
 * 2. Compare with pre-generated FAQ embeddings using cosine similarity
 * 3. If similarity > threshold (0.82-0.92), return cached answer
 * 4. Otherwise, return cache miss (fallback to GPT-4o)
 *
 * Why semantic matching is safe:
 * - "Balon turu fiyatı" and "How much balloon tour?" → High similarity (same meaning)
 * - "Balon turundan korkuyorum" (I'm afraid of balloons) → Low similarity (different meaning)
 * - No keyword risk - AI understands semantic meaning, not just words
 */
export async function findSimilarFAQ(
  userQuestion: string,
  language: string = 'tr'
): Promise<FAQMatchResult> {
  try {
    // 1. Generate embedding for user question
    const questionEmbedding = await openai.embeddings.create({
      model: 'text-embedding-3-small', // $0.02 per 1M tokens (very cheap!)
      input: userQuestion,
    });

    const questionVec = questionEmbedding.data[0].embedding;

    // 2. Find most similar FAQ using cosine similarity
    let bestMatch: any = null;
    let highestSimilarity = 0;

    for (const faq of faqDatabase.faqs) {
      const faqVec = faq.embeddings[language as keyof typeof faq.embeddings];

      // Skip if embedding doesn't exist for this language
      if (!faqVec) continue;

      const similarity = cosineSimilarity(questionVec, faqVec);

      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = faq;
      }
    }

    // 3. Check if confidence exceeds threshold
    if (bestMatch && highestSimilarity >= bestMatch.confidence_threshold) {
      console.log(`✅ FAQ Cache Hit: ${bestMatch.id} (${(highestSimilarity * 100).toFixed(1)}% match)`);

      return {
        isCached: true,
        answer: bestMatch[`answer_${language}`],
        confidence: highestSimilarity,
        faqId: bestMatch.id,
        category: bestMatch.category,
      };
    }

    // 4. Confidence too low → fallback to GPT-4o
    console.log(
      `ℹ️  FAQ Cache Miss (best match: ${(highestSimilarity * 100).toFixed(1)}% - ${bestMatch?.id || 'none'}) - Using GPT-4o`
    );

    return {
      isCached: false,
      confidence: highestSimilarity,
    };

  } catch (error) {
    console.error('FAQ matching error:', error);

    // On error, fallback to GPT-4o (safe default)
    return { isCached: false };
  }
}

/**
 * Get FAQ statistics (for monitoring)
 */
export function getFAQStats() {
  return {
    totalFAQs: faqDatabase.faqs.length,
    categories: [...new Set(faqDatabase.faqs.map(f => f.category))],
    languages: ['tr', 'en', 'zh'],
    averageThreshold: faqDatabase.faqs.reduce((sum, f) => sum + f.confidence_threshold, 0) / faqDatabase.faqs.length,
  };
}
