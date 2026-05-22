import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Home, ChevronRight, Tag as TagIcon } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import PostCard from '../components/blog/PostCard';
import { blogPosts } from '../data/blog/posts';

const BlogTag = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();

  const allTags = new Set<string>();
  blogPosts.forEach(post => post.tags.forEach(tag => allTags.add(tag)));

  const tag = Array.from(allTags).find(
    t => t.toLowerCase().replace(/\s+/g, '-') === tagSlug
  );

  if (!tag) {
    return <Navigate to="/blog" replace />;
  }

  const tagPosts = blogPosts.filter(post => post.tags.includes(tag));

  return (
    <>
      <SEOHead
        title={`${tag} Articles - SafetyWarden Blog`}
        description={`Browse all articles tagged with ${tag}. Expert insights on safety, compliance, and EHS management.`}
        keywords={`${tag}, safety, compliance, EHS, audits`}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="bg-white border-b border-slate-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link to="/" className="flex items-center text-slate-600 hover:text-orange-600 transition-colors">
                  <Home className="h-4 w-4" />
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <li>
                <Link to="/blog" className="text-slate-600 hover:text-orange-600 transition-colors">
                  Blog
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <li className="flex items-center gap-1 text-slate-900 font-medium">
                <TagIcon className="h-4 w-4" />
                {tag}
              </li>
            </ol>
          </div>
        </nav>

        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <TagIcon className="h-8 w-8" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {tag}
              </h1>
            </div>
            <p className="text-xl text-slate-300">
              {tagPosts.length} {tagPosts.length === 1 ? 'article' : 'articles'} tagged with {tag}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {tagPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600 mb-4">No articles found with this tag.</p>
              <Link to="/blog" className="text-orange-600 hover:text-orange-700 font-semibold">
                Browse all articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tagPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default BlogTag;
