import React from 'react';
import { Eye, Users } from 'lucide-react';
import { usePageStats } from '../hooks/usePageTracking';

interface PageCounterProps {
  pagePath?: string;
  variant?: 'default' | 'compact' | 'badge';
  className?: string;
}

const PageCounter: React.FC<PageCounterProps> = ({
  pagePath,
  variant = 'default',
  className = '',
}) => {
  const { stats, loading } = usePageStats(pagePath);

  if (loading || !stats) {
    return null;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600 ${className}`}>
        <Eye className="h-3 w-3" />
        <span>{stats.total_views.toLocaleString()} views</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 text-sm text-slate-600 ${className}`}>
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{stats.total_views.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{stats.unique_visitors.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Eye className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {stats.total_views.toLocaleString()}
            </p>
            <p className="text-sm text-slate-600">Total Views</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {stats.unique_visitors.toLocaleString()}
            </p>
            <p className="text-sm text-slate-600">Unique Visitors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCounter;
