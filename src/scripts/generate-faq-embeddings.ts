import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

// Load environment variables from .env or .env.local
config({ path: path.join(process.cwd(), '.env.local') });
config({ path: path.join(process.cwd(), '.env') });

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not found in environment variables');
  console.error('Please add your OpenAI API key to .env or .env.local file\n');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateEmbeddings() {
  console.log('🚀 Starting FAQ embedding generation...\n');

  // Read FAQ database
  const faqPath = path.join(process.cwd(), 'src/data/faq-database.json');
  const faqData = JSON.parse(fs.readFileSync(faqPath, 'utf-8'));

  let totalCost = 0;
  let processedCount = 0;

  for (const faq of faqData.faqs) {
    // Generate embeddings for all language variants
    const languages = ['tr', 'en', 'zh'];
    faq.embeddings = {};

    for (const lang of languages) {
      const question = faq[`question_${lang}`];

      try {
        const embedding = await openai.embeddings.create({
          model: 'text-embedding-3-small', // $0.02 per 1M tokens
          input: question,
        });

        faq.embeddings[lang] = embedding.data[0].embedding;

        // Calculate cost (approximate)
        const tokens = question.split(/\s+/).length * 1.3; // rough estimate
        const cost = (tokens / 1_000_000) * 0.02;
        totalCost += cost;

        console.log(`✅ [${lang.toUpperCase()}] ${faq.id}: "${question}"`);

      } catch (error) {
        console.error(`❌ Error generating embedding for ${faq.id} (${lang}):`, error);
        throw error;
      }
    }

    processedCount++;
    console.log(`   → Processed ${processedCount}/${faqData.faqs.length} FAQs\n`);
  }

  // Save with embeddings
  const outputPath = path.join(process.cwd(), 'src/data/faq-with-embeddings.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify(faqData, null, 2)
  );

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 All embeddings generated successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 Statistics:`);
  console.log(`   - Total FAQs: ${faqData.faqs.length}`);
  console.log(`   - Total embeddings: ${faqData.faqs.length * 3} (3 languages)`);
  console.log(`   - Estimated cost: $${totalCost.toFixed(4)}`);
  console.log(`   - Output file: ${outputPath}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Next step: Run "npm run dev" and test the FAQ matcher!\n');
}

// Run the script
generateEmbeddings().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
