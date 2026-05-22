import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, ExternalLink, AlertCircle, CheckCircle, Download, MessageSquare } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import SeverityBadge from '../components/intelligence/SeverityBadge';
import PageCounter from '../components/PageCounter';
import { IntelligenceEntry, getCategoryBySlug } from '../types/intelligence';
import { getIntelligenceBySlug } from '../lib/intelligence';

const IntelligenceDetail = () => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();
  const [entry, setEntry] = useState<IntelligenceEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadEntry();
    }
  }, [slug]);

  const loadEntry = async () => {
    setLoading(true);
    const data = await getIntelligenceBySlug(slug || '');
    setEntry(data);
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categoryInfo = getCategoryBySlug(categorySlug || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-orange-600"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Entry Not Found</h1>
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
        title={entry.seo_meta_title || `${entry.title} - SafetyWarden Intelligence`}
        description={entry.seo_meta_description || entry.short_summary}
        keywords={`${entry.category}, ${entry.source_type}, ${entry.risk_tags.join(', ')}`}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-600">
              <li>
                <Link to="/intelligence" className="hover:text-orange-600">
                  Intelligence
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to={`/intelligence/${categorySlug}`} className="hover:text-orange-600">
                  {categoryInfo?.name}
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-900 font-medium truncate">{entry.title}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {entry.featured_image && (
              <img
                src={entry.featured_image}
                alt={entry.title}
                className="w-full h-96 object-cover"
              />
            )}

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  {entry.category}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-sm text-slate-600 capitalize">
                  {entry.source_type}
                </span>
                {entry.severity_level && (
                  <>
                    <span className="text-slate-300">•</span>
                    <SeverityBadge level={entry.severity_level} />
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {entry.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-8 pb-8 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(entry.publish_date)}</span>
                </div>

                {entry.geography && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{entry.geography}</span>
                  </div>
                )}

                <PageCounter variant="compact" />

                {entry.source_link && (
                  <a
                    href={entry.source_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Source
                  </a>
                )}
              </div>

              {entry.risk_tags && entry.risk_tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Risk Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {entry.risk_tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium bg-slate-100 text-slate-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose prose-slate max-w-none mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Summary</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {entry.short_summary}
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3">
                      SafetyWarden Insight
                    </h2>
                    <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {entry.safetywarden_insight}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  What Inspectors Typically Check
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Documentation and record-keeping compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Implementation of corrective actions from previous audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Training records and staff competency verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Physical controls and safety equipment functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Emergency response procedures and drill records</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  Book a Pilot Audit
                </a>
                <a
                  href="/resources"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-lg transition-colors"
                >
                  <Download className="h-5 w-5" />
                  Download Sample Checklist
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              to={`/intelligence/${categorySlug}`}
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {categoryInfo?.name}
            </Link>
          </div>
        </article>
      </div>
    </>
  );
};

export default IntelligenceDetail;
