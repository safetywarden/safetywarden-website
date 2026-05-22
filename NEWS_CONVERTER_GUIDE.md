# SafetyWarden Intelligence News Converter

## Overview

The Intelligence News Converter is a tool that transforms raw safety/EHS/fire/regulatory news items into publish-ready SafetyWarden Intelligence Hub entries. It streamlines the content creation workflow for the Intelligence Hub by providing a structured conversion process with built-in validation.

## Access

**URL:** `/admin/news-converter`

**Authentication:** Requires admin login (available in admin navigation menu)

## Features

### Input Section
- **Title** (required): News article headline
- **Snippet** (required): Brief summary or excerpt from the article
- **Publish Date** (optional): Original publication date (defaults to today)
- **Source Link** (optional): URL to the original article

### Output Section
The converter generates a structured intelligence entry with:

1. **Basic Information**
   - Auto-generated slug from title
   - Category selection (Safety & Fire, EHS, ESG, etc.)
   - Source type (Incident, Regulation, Enforcement, etc.)
   - Severity level (Low, Medium, High)

2. **Content Fields**
   - Short Summary (60-90 words)
   - SafetyWarden Insight (150-200 words)
   - 6 Inspection Guidance points
   - 6 Risk Tags

3. **SEO Metadata**
   - SEO meta title
   - SEO meta description

### Actions

- **Generate Intelligence Entry**: Creates structured output from news input
- **Copy JSON**: Copies the output as JSON to clipboard
- **Save to DB**: Saves entry directly to intelligence_entries table (as unpublished draft)

## Workflow

1. **Input News Details**
   - Paste title and snippet from source article
   - Add date and link if available
   - Click "Generate Intelligence Entry"

2. **Review & Edit**
   - Review auto-generated content
   - Edit any field directly in the output form
   - Adjust categories, severity, and tags as needed
   - Customize inspection guidance and insights

3. **Save**
   - Click "Save to DB" to store in database
   - Entry is saved as unpublished (draft)
   - Navigate to Intelligence Admin to review and publish

## Allowed Values

### Category
- Safety & Fire
- EHS & Occupational Safety
- ESG & Sustainability
- Pollution Control
- Climate & Environmental Risk

### Source Type
- Incident
- Regulation
- Enforcement
- Climate
- Insight

### Severity Level
- Low
- Medium
- High

## Content Guidelines

### Short Summary
- 60-90 words
- Summarize: what happened, where, why it matters
- Focus on facts, no opinion

### SafetyWarden Insight
- 150-200 words
- Explain implications for:
  - Site owners
  - Contractors
  - EHS heads
  - Compliance officers
- Focus on actionable takeaways

### Inspection Guidance
- 6 specific auditor checks
- Practical, inspection-focused
- Directly related to the news item
- Examples:
  - "Review current safety protocols and documentation"
  - "Verify compliance with relevant regulatory requirements"
  - "Inspect physical safety systems and equipment"

### Risk Tags
- 6 relevant tags
- Common tags: Compliance, Safety Management, Risk Assessment, Regulatory, Audit, Training
- Use existing tags when possible for consistency

## Database Integration

Entries are saved to the `intelligence_entries` table with:
- `is_published`: false (draft state)
- All required fields populated
- Ready for review and publishing via Intelligence Admin

## Tips

1. **Consistency**: Use similar phrasing for recurring themes
2. **Accuracy**: Don't invent facts not in the source
3. **Relevance**: Ensure inspection guidance is practical
4. **SEO**: Keep meta descriptions under 155 characters
5. **Tags**: Reuse existing tags for better categorization

## Example Input

```
Title: Factory Fire Exposes Gaps in Emergency Response Systems
Snippet: A major fire at a manufacturing facility in Mumbai highlighted critical deficiencies in fire safety equipment and emergency evacuation procedures, leading to significant property damage.
Date: 2024-01-15
Link: https://example.com/factory-fire-mumbai
```

## Example Output

The converter will generate a complete intelligence entry with properly structured content, ready for review and publication.

## Support

For issues or questions about the News Converter, contact the development team or refer to the Intelligence Hub documentation.
