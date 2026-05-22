# SafetyWarden Intelligence Hub

## Overview

The Intelligence Hub is a comprehensive content management system for tracking, analyzing, and publishing insights on:
- Safety & Fire
- EHS & Occupational Health
- ESG & Sustainability
- Pollution Control (CPCB / SPCB)
- Climate Change & Operational Risk

## Features

### Public-Facing
- **Landing Page** (`/intelligence`) - Filterable feed with category navigation
- **Category Pages** (`/intelligence/[category]`) - Category-specific intelligence
- **Detail Pages** (`/intelligence/[category]/[slug]`) - Full intelligence entries with SafetyWarden insights
- **RSS Feeds** - Global and category-specific RSS 2.0 feeds

### Content Management
- Database-backed intelligence entries
- Rich metadata (severity, geography, risk tags, source attribution)
- Draft/publish workflow
- Featured entry highlighting

## Database Schema

### Table: `intelligence_entries`

```sql
- id (uuid, PK)
- title (text)
- slug (text, unique)
- category (Safety & Fire | EHS | ESG | Pollution Control | Climate)
- source_type (Incident | Regulation | Enforcement | Climate | Insight)
- source_link (text, optional)
- publish_date (date)
- short_summary (text)
- safetywarden_insight (text)
- risk_tags (text[])
- geography (text)
- severity_level (Low | Medium | High)
- featured_image (text, optional)
- seo_meta_title (text)
- seo_meta_description (text)
- is_published (boolean)
- is_featured (boolean)
- created_at (timestamptz)
- updated_at (timestamptz)
```

## Usage

### Seeding Sample Data

To populate the database with sample intelligence entries:

```bash
npm run seed:intelligence
```

This will insert 5 sample entries across all categories.

### Generating RSS Feeds

RSS feeds are automatically generated during build:

```bash
npm run build  # Generates all RSS feeds
```

Or generate manually:

```bash
npm run generate:rss
```

### RSS Feed URLs

**Global Feeds:**
- Blog: `/rss.xml`
- Intelligence: `/intelligence-rss.xml`

**Category Feeds:**
- Safety & Fire: `/rss/safety-fire.xml`
- EHS & Occupational Safety: `/rss/ehs.xml`
- ESG & Sustainability: `/rss/esg.xml`
- Pollution Control: `/rss/pollution-control.xml`
- Climate & Environmental Risk: `/rss/climate.xml`

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/intelligence` | Landing | Main hub with filters |
| `/intelligence/safety-fire` | Category | Safety & Fire intelligence |
| `/intelligence/ehs` | Category | EHS intelligence |
| `/intelligence/esg` | Category | ESG intelligence |
| `/intelligence/pollution-control` | Category | Pollution control intelligence |
| `/intelligence/climate` | Category | Climate risk intelligence |
| `/intelligence/:category/:slug` | Detail | Individual entry |

## Creating New Intelligence Entries

### Via Supabase Dashboard

1. Navigate to Supabase Dashboard
2. Open `intelligence_entries` table
3. Click "Insert row"
4. Fill in required fields:
   - `title` - Headline (50-80 characters)
   - `slug` - URL-friendly identifier (lowercase, hyphens)
   - `category` - Select from dropdown
   - `source_type` - Select from dropdown
   - `publish_date` - YYYY-MM-DD format
   - `short_summary` - 150-200 words
   - `safetywarden_insight` - Detailed analysis with recommendations
   - `is_published` - Set to `true` to make public
5. Optional fields:
   - `source_link` - URL to original source
   - `risk_tags` - Array of risk categories
   - `geography` - Location (e.g., "Mumbai, Maharashtra, India")
   - `severity_level` - Low/Medium/High
   - `featured_image` - Image URL
   - `is_featured` - Highlight on homepage

### Via API (Programmatic)

```typescript
import { createIntelligenceEntry } from './lib/intelligence';

const entry = await createIntelligenceEntry({
  title: 'Your Title',
  slug: 'your-title-slug',
  category: 'Safety & Fire',
  source_type: 'Incident',
  publish_date: '2025-01-15',
  short_summary: 'Brief description...',
  safetywarden_insight: 'Detailed analysis...',
  risk_tags: ['Fire Safety', 'NBC Compliance'],
  geography: 'Mumbai, India',
  severity_level: 'High',
  is_published: true
});
```

## Content Guidelines

### Title
- Clear, specific, factual
- 50-80 characters
- Include key details (location, type, impact)

### Short Summary
- 150-200 words
- Who, what, when, where, why
- Factual, neutral tone

### SafetyWarden Insight
Structure:
1. **Context** - Why this matters
2. **Key Learnings** - Specific takeaways
3. **Compliance Checkpoints** - What to verify
4. **Immediate Actions** - Concrete next steps

### Risk Tags
Use specific, searchable terms:
- Fire Safety, Chemical Storage, Electrical Safety
- Air Quality, Water Quality, Waste Management
- Heat Stress, Confined Space, Height Work
- CPCB, SPCB, NBC, NFPA, ISO 45001

### Geography
Format: `City, State, Country` or `State, Country` or `Country`

Examples:
- "Mumbai, Maharashtra, India"
- "Gujarat, India"
- "India"

## RSS Integration

### Autodiscovery
RSS feeds are automatically discoverable via `<link>` tags in `<head>`:

```html
<link rel="alternate" type="application/rss+xml"
      title="SafetyWarden Intelligence Hub RSS Feed"
      href="/intelligence-rss.xml" />
```

### Testing RSS Feeds

1. **Validate XML:**
   - Use [W3C Feed Validator](https://validator.w3.org/feed/)
   - Check for well-formed XML and RSS 2.0 compliance

2. **Test in Readers:**
   - Feedly: Add feed URL
   - Inoreader: Subscribe to feed
   - RSS clients: Test autodiscovery

## Security & Permissions

### Row Level Security (RLS)

Public access:
- Read: Published entries only (`is_published = true`)

Authenticated access:
- Create: Any authenticated user
- Update: Any authenticated user
- Delete: Any authenticated user

### Production Recommendations

For production, implement role-based access:
1. Create `admin` role
2. Restrict write operations to admins only
3. Add approval workflow for publishing

## Performance

### Caching Strategy

- Static RSS feeds regenerated on build
- Client-side caching: Consider SWR/React Query for intelligence data
- CDN caching: Set `Cache-Control` headers for RSS XML files

### Optimization

- Limit initial load to 12-24 entries
- Implement pagination for large datasets
- Add database indexes on:
  - `category`
  - `publish_date`
  - `is_published`
  - `severity_level`

## SEO

### Structured Data

Intelligence detail pages include:
- Article schema
- Breadcrumb schema
- Organization schema

### Meta Tags

Each page includes:
- Unique title
- Description (from entry summary)
- Keywords (from risk tags)
- Canonical URL
- Open Graph tags

## Roadmap

Planned enhancements:
- [ ] Email notifications for new intelligence
- [ ] Search functionality with filters
- [ ] Related intelligence recommendations
- [ ] Export to PDF
- [ ] Analytics dashboard
- [ ] User bookmarking/favorites
- [ ] Comments/discussion threads
- [ ] Multi-language support

## Support

For issues or questions:
- Email: hello@safetywarden.com
- Documentation: https://safetywarden.com/resources
