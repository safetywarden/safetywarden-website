import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rss, ArrowLeft, TrendingUp } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import IntelligenceCard from '../components/intelligence/IntelligenceCard';
import { IntelligenceEntry, getCategoryBySlug, IntelligenceCategory as IntelligenceCategoryType } from '../types/intelligence';
import { getPublishedIntelligence } from '../lib/intelligence';

const IntelligenceCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [entries, setEntries] = useState<IntelligenceEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryInfo = getCategoryBySlug(categorySlug || '');

  useEffect(() => {
    if (categoryInfo) {
      loadCategoryIntelligence();
    }
  }, [categorySlug]);

  const loadCategoryIntelligence = async () => {
    if (!categoryInfo) return;

    setLoading(true);
    const data = await getPublishedIntelligence({
      category: categoryInfo.name as IntelligenceCategoryType
    });
    setEntries(data);
    setLoading(false);
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Category Not Found</h1>
          <Link to="/intelligence" className="text-orange-600 hover:text-orange-700 font-semibold">
            Return to Intelligence Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${categoryInfo.name} Intelligence - SafetyWarden`}
        description={`${categoryInfo.description}. Stay informed about latest incidents, regulations, and enforcement actions.`}
        keywords={`${categoryInfo.name}, safety intelligence, compliance, regulations, enforcement`}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/intelligence"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Intelligence Hub
            </Link>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {categoryInfo.name}
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl">
                  {categoryInfo.description}
                </p>
              </div>

              <a
                href={`/rss/${categoryInfo.slug}.xml`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold"
                title={`Subscribe to ${categoryInfo.name} RSS Feed`}
              >
                <Rss className="h-5 w-5" />
                <span className="hidden sm:inline">RSS</span>
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-orange-600"></div>
              <p className="mt-4 text-slate-600">Loading intelligence...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-20">
              <TrendingUp className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Intelligence Yet
              </h3>
              <p className="text-slate-600 mb-6">
                We're currently tracking and analyzing data for this category. Check back soon.
              </p>
              <Link
                to="/intelligence"
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Explore Other Categories
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-slate-600">
                  Showing <span className="font-semibold text-slate-900">{entries.length}</span>{' '}
                  {entries.length === 1 ? 'entry' : 'entries'} in {categoryInfo.name}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entries.map((entry) => (
                  <IntelligenceCard key={entry.id} entry={entry} />
                ))}
              </div>
            </>
          )}
        </section>

        <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 text-white py-16 mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Ahead of Compliance
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Get expert guidance on {categoryInfo.name} compliance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-orange-600 font-semibold rounded-lg transition-colors"
              >
                Book a Consultation
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 hover:bg-orange-800 text-white font-semibold rounded-lg transition-colors border-2 border-orange-400"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IntelligenceCategory;
