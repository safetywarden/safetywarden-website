import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rss, TrendingUp, Shield, Flame, Leaf, Droplet, Cloud } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import IntelligenceCard from '../components/intelligence/IntelligenceCard';
import IntelligenceFilters from '../components/intelligence/IntelligenceFilters';
import { IntelligenceEntry, INTELLIGENCE_CATEGORIES, IntelligenceCategory } from '../types/intelligence';
import { getPublishedIntelligence } from '../lib/intelligence';

const iconMap: Record<string, any> = {
  Flame,
  Shield,
  Leaf,
  Droplet,
  Cloud
};

const IntelligenceHub = () => {
  const [entries, setEntries] = useState<IntelligenceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');
  const [selectedGeography, setSelectedGeography] = useState<string>('');

  useEffect(() => {
    loadIntelligence();
  }, [selectedCategory, selectedSeverity, selectedGeography]);

  const loadIntelligence = async () => {
    setLoading(true);
    const filters: any = {};

    if (selectedCategory) filters.category = selectedCategory as IntelligenceCategory;
    if (selectedSeverity) filters.severity = selectedSeverity;
    if (selectedGeography) filters.geography = selectedGeography;

    const data = await getPublishedIntelligence(filters);
    setEntries(data);
    setLoading(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedSeverity('');
    setSelectedGeography('');
  };

  return (
    <>
      <SEOHead
        title="SafetyWarden Intelligence Hub - Safety, EHS, ESG & Compliance Insights"
        description="Actionable insights from incidents, regulations, and enforcement signals across safety, EHS, ESG, pollution control, and climate risk. Stay ahead of compliance requirements."
        keywords="safety intelligence, EHS compliance, ESG monitoring, pollution control enforcement, CPCB violations, climate risk, fire safety incidents, occupational safety, regulatory intelligence"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <TrendingUp className="h-12 w-12 text-orange-500" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  Intelligence Hub
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Actionable insights from incidents, regulations, and enforcement signals
              </p>

              <div className="flex items-center justify-center gap-4">
                <a
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold"
                >
                  <Rss className="h-5 w-5" />
                  Subscribe to Intelligence Feed
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
              {INTELLIGENCE_CATEGORIES.map((cat) => {
                const Icon = iconMap[cat.icon];
                return (
                  <Link
                    key={cat.slug}
                    to={`/intelligence/${cat.slug}`}
                    className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg p-4 text-center transition-all"
                  >
                    <Icon className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <h3 className="text-sm font-semibold text-white">
                      {cat.name}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <IntelligenceFilters
            selectedCategory={selectedCategory}
            selectedSeverity={selectedSeverity}
            selectedGeography={selectedGeography}
            onCategoryChange={setSelectedCategory}
            onSeverityChange={setSelectedSeverity}
            onGeographyChange={setSelectedGeography}
            onClearFilters={handleClearFilters}
          />

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-orange-600"></div>
              <p className="mt-4 text-slate-600">Loading intelligence...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-20">
              <TrendingUp className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Intelligence Found
              </h3>
              <p className="text-slate-600 mb-6">
                No entries match your current filters. Try adjusting your selection.
              </p>
              <button
                onClick={handleClearFilters}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-slate-600">
                  Showing <span className="font-semibold text-slate-900">{entries.length}</span>{' '}
                  {entries.length === 1 ? 'entry' : 'entries'}
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
              Turn Intelligence into Action
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Book a pilot audit to see how SafetyWarden helps you stay compliant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-orange-600 font-semibold rounded-lg transition-colors"
              >
                Book a Pilot Audit
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

export default IntelligenceHub;
