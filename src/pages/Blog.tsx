import React, { useState, useMemo } from 'react';
import { Search, Filter, Tag as TagIcon, Rss } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import PostCard from '../components/blog/PostCard';
import { blogPosts, blogCategories } from '../data/blog/posts';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedTag, sortOrder]);

  return (
    <>
      <SEOHead
        title="SafetyWarden Blog - EHS, Compliance & Safety Audit Insights"
        description="Practical insights on compliance, safety audits, fire safety, ISO 45001, contractor management, and inspection readiness. Expert guidance for EHS professionals."
        keywords="safety audits, EHS compliance, fire safety, ISO 45001, contractor safety, incident reporting, digital audits, Factories Act, safety management"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                SafetyWarden Blog
              </h1>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-medium"
                title="Subscribe to RSS Feed"
              >
                <Rss className="h-4 w-4" />
                <span className="hidden sm:inline">RSS Feed</span>
              </a>
            </div>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
              Practical insights on compliance, audits, and inspection readiness
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Categories</option>
                {blogCategories.map(category => (
                  <option key={category.slug} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sort by
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <TagIcon className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">Filter by Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === ''
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Tags
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedTag('');
                }}
                className="mt-4 text-orange-600 hover:text-orange-700 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>

        <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 text-white py-16 mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Digitize Your Safety Audits?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              See how SafetyWarden can transform your compliance workflows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-orange-600 font-semibold rounded-lg transition-colors"
              >
                Book a Demo
              </a>
              <a
                href="/features"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 hover:bg-orange-800 text-white font-semibold rounded-lg transition-colors border-2 border-orange-400"
              >
                Explore Features
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
