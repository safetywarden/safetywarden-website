import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight, Home, ChevronRight } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import BlogContent from '../components/blog/BlogContent';
import RelatedPosts from '../components/blog/RelatedPosts';
import PageCounter from '../components/PageCounter';
import { blogPosts } from '../data/blog/posts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'SafetyWarden',
      logo: {
        '@type': 'ImageObject',
        url: 'https://safetywarden.com/safety-warden-header.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://safetywarden.com/blog/${post.slug}`
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://safetywarden.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://safetywarden.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.category,
        item: `https://safetywarden.com/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: `https://safetywarden.com/blog/${post.slug}`
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.tags.join(', ')}
        canonical={`https://safetywarden.com/blog/${post.slug}`}
        ogImage={post.coverImage}
      />

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="bg-white border-b border-slate-200 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <li>
                <Link
                  to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-slate-600 hover:text-orange-600 transition-colors"
                >
                  {post.category}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-slate-400" />
              <li className="text-slate-900 font-medium truncate">{post.title}</li>
            </ol>
          </div>
        </nav>

        <header className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link
                to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block px-3 py-1 bg-orange-600 text-white text-sm font-semibold rounded-full hover:bg-orange-700 transition-colors"
              >
                {post.category}
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-slate-600 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <PageCounter variant="compact" />
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-full transition-colors"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <BlogContent content={post.content} />
          </div>

          <div className="mt-12 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Safety Audits?</h2>
            <p className="text-lg text-orange-100 mb-8">
              See how SafetyWarden's digital platform can help you implement the best practices discussed in this article.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-orange-600 font-semibold rounded-lg transition-colors"
              >
                Book a Pilot Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/features"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 hover:bg-orange-800 text-white font-semibold rounded-lg transition-colors border-2 border-orange-400"
              >
                Explore Features
              </a>
            </div>
          </div>

          <RelatedPosts currentPost={post} allPosts={blogPosts} />
        </div>
      </article>
    </>
  );
};

export default BlogPost;
