import { blogPosts } from '../data/blog/posts';

const SITE_URL = 'https://safetywarden.com';
const BLOG_URL = `${SITE_URL}/blog`;
const RSS_URL = `${SITE_URL}/rss.xml`;

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

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\n\n+/g, ' ').trim();
}

function generateDescription(content: string, excerpt: string): string {
  if (excerpt) {
    return excerpt;
  }
  const stripped = stripHtml(content);
  return stripped.length > 200 ? stripped.substring(0, 200) + '...' : stripped;
}

export function generateRSSFeed(): string {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestPostDate = sortedPosts.length > 0
    ? formatRFC822Date(sortedPosts[0].date)
    : new Date().toUTCString();

  const items = sortedPosts
    .map(post => {
      const postUrl = `${BLOG_URL}/${post.slug}`;
      const description = generateDescription(post.content, post.excerpt);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${formatRFC822Date(post.date)}</pubDate>
      <author>hello@safetywarden.com (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
      <description><![CDATA[${description}]]></description>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SafetyWarden Blog</title>
    <link>${BLOG_URL}</link>
    <description>Practical insights on safety compliance, audits, and inspection readiness.</description>
    <language>en</language>
    <copyright>© SafetyWarden</copyright>
    <managingEditor>hello@safetywarden.com (SafetyWarden Team)</managingEditor>
    <webMaster>hello@safetywarden.com (SafetyWarden Team)</webMaster>
    <lastBuildDate>${latestPostDate}</lastBuildDate>
    <atom:link href="${RSS_URL}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/icon.png</url>
      <title>SafetyWarden Blog</title>
      <link>${BLOG_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
${items}
  </channel>
</rss>`;

  return rss;
}
