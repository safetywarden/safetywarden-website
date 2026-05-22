# Intelligence Hub Admin Panel

## Overview

A comprehensive admin panel for managing Intelligence Hub content with full CRUD operations, filtering, search, and publishing controls.

## Access

- **Login URL**: `/admin/login`
- **Dashboard URL**: `/admin/intelligence`
- **Authentication**: Supabase email/password authentication required

## Features

### 1. Admin Authentication
- Secure login page with email/password authentication
- Protected routes that require authentication
- Automatic redirect to login if not authenticated
- Sign out functionality

### 2. Intelligence Dashboard (`/admin/intelligence`)
- **View all entries**: See all intelligence entries (published and drafts)
- **Search**: Real-time search across titles and summaries
- **Filter by**:
  - Category (Safety & Fire, EHS, ESG, Pollution Control, Climate Risk)
  - Status (All, Published, Draft)
- **Quick actions**:
  - Publish/unpublish entries (eye icon)
  - Feature/unfeature entries (star icon)
  - Edit entries (pencil icon)
  - Delete entries (trash icon)
- **Visual indicators**:
  - Featured entries show a star
  - Severity badges (Low, Medium, High, Critical)
  - Status badges (Published/Draft)

### 3. Entry Editor (`/admin/intelligence/new` or `/admin/intelligence/edit/:id`)
- **Create new entries** or **edit existing ones**
- **Form sections**:
  - **Basic Information**: Title, slug, summary, content (markdown supported)
  - **Additional Details**: Source URL, image URL, tags
  - **Metadata**: Category, severity level, geography, publish date
  - **Publishing**: Toggle published/featured status
- **Auto-generated slugs** from titles
- **Tag management**: Add/remove tags
- **Preview link**: View entry on public site (if published)

### 4. Navigation
- Quick access to:
  - Website home
  - Intelligence dashboard
  - Database admin
- Sign out button

## Database Security

### Row Level Security (RLS) Policies

1. **Public Read Access**:
   - Unauthenticated users can view published entries only
   - `is_published = true` entries are visible on the public site

2. **Admin Access** (authenticated users):
   - View all entries (published and drafts)
   - Create new entries
   - Update any entry
   - Delete any entry

## Creating Your First Admin User

To access the admin panel, you need to create a Supabase user:

### Option 1: Using Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Invite User" or "Add User"
4. Enter email and password
5. Confirm the user

### Option 2: Using SQL
```sql
-- Create a new admin user via SQL
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_sent_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@safetywarden.com', -- Change this email
  crypt('YourStrongPassword123!', gen_salt('bf')), -- Change this password
  NOW(),
  '',
  '',
  '',
  '',
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  NOW()
);
```

### Option 3: Using Supabase Auth Signup API
You can also create a signup page or use the Supabase Auth API directly.

## Workflow

### Publishing a New Intelligence Entry

1. **Login** at `/admin/login`
2. **Navigate** to Intelligence dashboard
3. **Click "New Entry"** button
4. **Fill in the form**:
   - Title (required) - automatically generates slug
   - Summary (required) - brief overview
   - Content (required) - full article in markdown
   - Category (required) - select from dropdown
   - Severity level (required)
   - Geography (required) - e.g., "India", "Maharashtra", "Global"
   - Publish date (required)
   - Source URL (optional) - link to original source
   - Image URL (optional) - featured image
   - Tags (optional) - add relevant tags
5. **Toggle "Published"** to make it visible
6. **Toggle "Featured"** to show in featured section (optional)
7. **Click "Save Entry"**
8. Entry now appears on `/intelligence`

### Editing an Existing Entry

1. From the dashboard, click the **edit icon** (pencil) on any entry
2. Modify any fields
3. Click **"Save Entry"** to update
4. Changes are immediately reflected on the public site

### Managing Entry Visibility

- **Draft → Published**: Click the eye icon to make it visible
- **Published → Draft**: Click the eye-off icon to hide it
- **Featured**: Click the star icon to feature/unfeature

## Tips

- **Slugs**: Auto-generated but can be manually edited for SEO
- **Categories**: Choose the most relevant category for proper filtering
- **Severity Levels**: Use Critical for major incidents/regulations
- **Geography**: Be specific (e.g., "Pune, Maharashtra" vs "India")
- **Tags**: Help with search and related content
- **Publish Date**: Can be backdated or future-dated
- **Preview**: Use preview link to check formatting before publishing

## Files Created

### Components
- `/src/components/admin/AdminLayout.tsx` - Main admin layout with navigation
- `/src/components/admin/ProtectedAdminRoute.tsx` - Route protection wrapper

### Pages
- `/src/pages/admin/AdminLogin.tsx` - Login page
- `/src/pages/admin/IntelligenceAdmin.tsx` - Main dashboard
- `/src/pages/admin/IntelligenceEditor.tsx` - Entry editor (new/edit)

### Routes Added to App.tsx
- `/admin/login` - Login page
- `/admin` - Redirects to intelligence dashboard
- `/admin/intelligence` - Intelligence dashboard
- `/admin/intelligence/new` - New entry editor
- `/admin/intelligence/edit/:id` - Edit entry editor

### Database Migration
- `add_intelligence_admin_policies.sql` - RLS policies for admin access

## Next Steps

1. Create your first admin user in Supabase
2. Login at `/admin/login`
3. Start creating intelligence entries
4. Monitor the public Intelligence Hub at `/intelligence`
