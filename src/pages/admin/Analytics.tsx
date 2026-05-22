import React, { useState, useEffect } from 'react';
import { TrendingUp, Eye, Users, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedAdminRoute from '../../components/admin/ProtectedAdminRoute';
import { supabase } from '../../lib/supabase';

interface PageStat {
  page_path: string;
  total_views: number;
  unique_visitors: number;
  last_viewed_at: string;
}

const Analytics = () => {
  const [stats, setStats] = useState<PageStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);

    const { data: pageStats } = await supabase
      .from('page_stats')
      .select('*')
      .order('total_views', { ascending: false })
      .limit(20);

    if (pageStats) {
      setStats(pageStats);
      const views = pageStats.reduce((sum, stat) => sum + stat.total_views, 0);
      setTotalViews(views);

      const { count } = await supabase
        .from('page_views')
        .select('session_id', { count: 'exact', head: true });

      setTotalVisitors(count || 0);
    }

    setLoading(false);
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
            <p className="text-slate-600 mt-1">Page views and visitor statistics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">
                    {totalViews.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600">Total Page Views</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">
                    {totalVisitors.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600">Total Sessions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.length}
                  </p>
                  <p className="text-sm text-slate-600">Tracked Pages</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Top Pages</h2>
              <p className="text-slate-600 text-sm mt-1">Most viewed pages on your site</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-orange-600"></div>
                <p className="mt-4 text-slate-600">Loading analytics...</p>
              </div>
            ) : stats.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No page views tracked yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Page Path
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                        Total Views
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                        Unique Visitors
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                        Last Viewed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {stats.map((stat, index) => (
                      <tr key={stat.page_path} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-400">
                              #{index + 1}
                            </span>
                            <span className="font-mono text-sm text-slate-900">
                              {stat.page_path}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold text-slate-900">
                              {stat.total_views.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Users className="h-4 w-4 text-green-500" />
                            <span className="font-semibold text-slate-900">
                              {stat.unique_visitors.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-slate-600">
                          <div className="flex items-center justify-end gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(stat.last_viewed_at).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
};

export default Analytics;
