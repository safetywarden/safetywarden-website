import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';
import { IntelligenceEntry, getCategorySlug } from '../../types/intelligence';
import SeverityBadge from './SeverityBadge';

interface IntelligenceCardProps {
  entry: IntelligenceEntry;
}

const IntelligenceCard: React.FC<IntelligenceCardProps> = ({ entry }) => {
  const categorySlug = getCategorySlug(entry.category);
  const detailUrl = `/intelligence/${categorySlug}/${entry.slug}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {entry.featured_image && (
        <img
          src={entry.featured_image}
          alt={entry.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            {entry.category}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 capitalize">
            {entry.source_type}
          </span>
          {entry.severity_level && (
            <>
              <span className="text-slate-300">•</span>
              <SeverityBadge level={entry.severity_level} />
            </>
          )}
        </div>

        <Link to={detailUrl}>
          <h3 className="text-xl font-bold text-slate-900 mb-3 hover:text-orange-600 transition-colors">
            {entry.title}
          </h3>
        </Link>

        <p className="text-slate-600 mb-4 line-clamp-3">
          {entry.short_summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(entry.publish_date)}</span>
          </div>

          {entry.geography && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{entry.geography}</span>
            </div>
          )}
        </div>

        {entry.risk_tags && entry.risk_tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {entry.risk_tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded"
              >
                {tag}
              </span>
            ))}
            {entry.risk_tags.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium text-slate-500">
                +{entry.risk_tags.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link
            to={detailUrl}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
          >
            Read Full Analysis →
          </Link>

          {entry.source_link && (
            <a
              href={entry.source_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntelligenceCard;
