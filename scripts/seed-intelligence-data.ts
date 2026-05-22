import { createClient } from '@supabase/supabase-js';
import { sampleIntelligenceEntries } from '../src/data/intelligence/sampleData.js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

async function seedIntelligenceData() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file.');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  console.log('🔄 Seeding intelligence data...\n');

  for (const entry of sampleIntelligenceEntries) {
    const { data: existing } = await supabase
      .from('intelligence_entries')
      .select('slug')
      .eq('slug', entry.slug)
      .maybeSingle();

    if (existing) {
      console.log(`⏭️  Skipping "${entry.title}" (already exists)`);
      continue;
    }

    const { error } = await supabase
      .from('intelligence_entries')
      .insert([entry])
      .select()
      .single();

    if (error) {
      console.error(`❌ Error inserting "${entry.title}":`, error.message);
    } else {
      console.log(`✅ Added: "${entry.title}"`);
    }
  }

  console.log('\n✅ Intelligence data seeding completed!');
}

seedIntelligenceData().catch(console.error);
