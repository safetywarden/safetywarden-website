import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

async function generateIntelligenceRSS() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.log('⚠️  Supabase credentials not found. Skipping intelligence RSS generation.');
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { generateIntelligenceRSSFeed } = await import('../src/utils/intelligenceRssGenerator.js');
  const { INTELLIGENCE_CATEGORIES } = await import('../src/types/intelligence.js');

  const { data: allEntries, error } = await supabase
    .from('intelligence_entries')
    .select('*')
    .eq('is_published', true)
    .order('publish_date', { ascending: false });

  if (error) {
    console.error('❌ Error fetching intelligence entries:', error);
    return;
  }

  if (!allEntries || allEntries.length === 0) {
    console.log('ℹ️  No published intelligence entries found. Skipping RSS generation.');
    return;
  }

  const globalRSS = generateIntelligenceRSSFeed(allEntries);

  const publicPath = join(__dirname, '../public/intelligence-rss.xml');
  writeFileSync(publicPath, globalRSS, 'utf-8');
  console.log('✅ Global intelligence RSS feed generated at public/intelligence-rss.xml');

  try {
    const distPath = join(__dirname, '../dist/intelligence-rss.xml');
    writeFileSync(distPath, globalRSS, 'utf-8');
    console.log('✅ Global intelligence RSS feed copied to dist/intelligence-rss.xml');
  } catch (error) {
    console.log('ℹ️  dist folder not yet created (will be generated during build)');
  }

  try {
    mkdirSync(join(__dirname, '../public/rss'), { recursive: true });
    mkdirSync(join(__dirname, '../dist/rss'), { recursive: true });
  } catch (error) {
  }

  for (const category of INTELLIGENCE_CATEGORIES) {
    const categoryEntries = allEntries.filter(entry => entry.category === category.name);

    if (categoryEntries.length > 0) {
      const categoryRSS = generateIntelligenceRSSFeed(categoryEntries, category.name);

      const publicCategoryPath = join(__dirname, `../public/rss/${category.slug}.xml`);
      writeFileSync(publicCategoryPath, categoryRSS, 'utf-8');
      console.log(`✅ ${category.name} RSS feed generated at public/rss/${category.slug}.xml`);

      try {
        const distCategoryPath = join(__dirname, `../dist/rss/${category.slug}.xml`);
        writeFileSync(distCategoryPath, categoryRSS, 'utf-8');
        console.log(`✅ ${category.name} RSS feed copied to dist/rss/${category.slug}.xml`);
      } catch (error) {
      }
    }
  }
}

generateIntelligenceRSS().catch(console.error);
