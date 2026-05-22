import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnvFile() {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const envVars: Record<string, string> = {};

    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, '');
        envVars[key] = value;
      }
    });

    return envVars;
  } catch (error) {
    console.error('Error reading .env file:', error);
    return {};
  }
}

const env = loadEnvFile();
const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env file');
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  const email = 'fireadvisor@gmail.com';
  const password = 'B@m!8121416';
  const fullName = 'Fire Advisor';

  console.log('Creating admin user...');
  console.log(`Email: ${email}`);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      console.error('Error creating user:', error.message);

      if (error.message.includes('already registered')) {
        console.log('\nUser already exists! You can log in with:');
        console.log(`Email: ${email}`);
        console.log('Password: [your password]');
        console.log('\nLogin at: /admin/login');
        process.exit(0);
      }

      process.exit(1);
    }

    if (data.user) {
      console.log('✓ Admin user created successfully!');
      console.log('User ID:', data.user.id);
      console.log('Email:', data.user.email);
      console.log('\nYou can now log in at: /admin/login');
      console.log(`Email: ${email}`);
      console.log('Password: [provided password]');

      if (data.session) {
        console.log('\n✓ User is automatically logged in');
      } else {
        console.log('\nNote: Email confirmation may be required depending on your Supabase settings.');
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

createAdminUser();
