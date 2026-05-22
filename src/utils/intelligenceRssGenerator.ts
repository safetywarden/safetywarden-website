import { IntelligenceEntry, IntelligenceCategory, getCategorySlug } from '../types/intelligence';

const SITE_URL = 'https://safetywarden.com';
const INTELLIGENCE_URL = `${SITE_URL}/intelligence`;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRFC822Date(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

function generateIntelligenceItem(entry: IntelligenceEntry): string {
  const categorySlug = getCategorySlug(entry.category);
  const entryUrl = `${INTELLIGENCE_URL}/${categorySlug}/${entry.slug}`;

  return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entryUrl}</link>
      <guid isPermaLink="true">${entryUrl}</guid>
      <pubDate>${formatRFC822Date(entry.publish_date)}</pubDate>
      <author>hello@safetywarden.com (SafetyWarden Team)</author>
      <category>${escapeXml(entry.category)}</category>
      <description><![CDATA[${entry.short_summary}]]></description>
    </item>`;
}

export function generateIntelligenceRSSFeed(entries: IntelligenceEntry[], category?: IntelligenceCategory): string {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  );

  const latestDate = sortedEntries.length > 0
    ? formatRFC822Date(sortedEntries[0].publish_date)
    : new Date().toUTCString();

  const items = sortedEntries.map(entry => generateIntelligenceItem(entry)).join('\n');

  const isGlobal = !category;
  const title = isGlobal
    ? 'SafetyWarden Intelligence Hub'
    : `SafetyWarden Intelligence - ${category}`;

  const description = isGlobal
    ? 'Actionable insights from incidents, regulations, and enforcement signals across safety, EHS, ESG, pollution control, and climate risk.'
    : `Latest intelligence on ${category} - incidents, regulations, and enforcement actions.`;

  const feedUrl = isGlobal
    ? `${SITE_URL}/rss.xml`
    : `${SITE_URL}/rss/${getCategorySlug(category!)}.xml`;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${INTELLIGENCE_URL}</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <copyright>© SafetyWarden</copyright>
    <managingEditor>hello@safetywarden.com (SafetyWarden Team)</managingEditor>
    <webMaster>hello@safetywarden.com (SafetyWarden Team)</webMaster>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/icon.png</url>
      <title>${escapeXml(title)}</title>
      <link>${INTELLIGENCE_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
${items}
  </channel>
</rss>`;

  return rss;
}
