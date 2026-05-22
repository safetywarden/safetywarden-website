import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import PostCard from '../components/blog/PostCard';
import { blogPosts, blogCategories } from '../data/blog/posts';

const BlogCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = blogCategories.find(
    c => c.slug === categorySlug || c.name.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  if (!category) {
    return <Navigate to="/blog" replace />;
  }

  const categoryPosts = blogPosts.filter(post => post.category === category.name);

  return (
    <>
      <SEOHead
        title={`${category.name} Articles - SafetyWarden Blog`}
        description={`${category.description}. Read expert insights and best practices for ${category.name.toLowerCase()}.`}
        keywords={`${category.name}, safety, compliance, EHS, audits`}
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
              <li className="text-slate-900 font-medium">{category.name}</li>
            </ol>
          </div>
        </nav>

        <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-orange-100 mb-6">
              {category.description}
            </p>
            <p className="text-orange-200">
              {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {categoryPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600 mb-4">No articles found in this category yet.</p>
              <Link to="/blog" className="text-orange-600 hover:text-orange-700 font-semibold">
                Browse all articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default BlogCategory;
