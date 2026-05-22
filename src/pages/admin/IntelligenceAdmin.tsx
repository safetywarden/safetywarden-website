import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Search, Filter } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedAdminRoute from '../../components/admin/ProtectedAdminRoute';
import SeverityBadge from '../../components/intelligence/SeverityBadge';
import { supabase } from '../../lib/supabase';
import { IntelligenceEntry, INTELLIGENCE_CATEGORIES } from '../../types/intelligence';

const IntelligenceAdmin = () => {
  const [entries, setEntries] = useState<IntelligenceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    let query = supabase
      .from('intelligence_entries')
      .select('*')
      .order('publish_date', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error loading entries:', error);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('intelligence_entries')
      .update({ is_published: !currentStatus })
      .eq('id', id);

    if (!error) {
      loadEntries();
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('intelligence_entries')
      .update({ is_featured: !currentStatus })
      .eq('id', id);

    if (!error) {
      loadEntries();
    }
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    const { error } = await supabase
      .from('intelligence_entries')
      .delete()
      .eq('id', id);

    if (!error) {
      loadEntries();
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.short_summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || entry.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && entry.is_published) ||
      (filterStatus === 'draft' && !entry.is_published);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Intelligence Entries</h1>
              <p className="text-slate-600 mt-1">Manage your intelligence hub content</p>
            </div>
            <Link
              to="/admin/intelligence/new"
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              New Entry
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {INTELLIGENCE_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-300 border-t-orange-600"></div>
                <p className="mt-4 text-slate-600">Loading entries...</p>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No entries found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                        Severity
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                        Date
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {entry.is_featured && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                            <div>
                              <p className="font-medium text-slate-900">{entry.title}</p>
                              <p className="text-sm text-slate-500">{entry.geography}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {entry.category}
                        </td>
                        <td className="px-4 py-3">
                          <SeverityBadge severity={entry.severity_level} />
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {new Date(entry.publish_date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              entry.is_published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {entry.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => togglePublished(entry.id, entry.is_published)}
                              className="p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title={entry.is_published ? 'Unpublish' : 'Publish'}
                            >
                              {entry.is_published ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => toggleFeatured(entry.id, entry.is_featured)}
                              className={`p-2 rounded-lg transition-colors ${
                                entry.is_featured
                                  ? 'text-yellow-600 hover:bg-yellow-50'
                                  : 'text-slate-600 hover:text-yellow-600 hover:bg-slate-100'
                              }`}
                              title={entry.is_featured ? 'Unfeature' : 'Feature'}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  entry.is_featured ? 'fill-yellow-600' : ''
                                }`}
                              />
                            </button>
                            <Link
                              to={`/admin/intelligence/edit/${entry.id}`}
                              className="p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
              <p>
                Showing <span className="font-semibold">{filteredEntries.length}</span> of{' '}
                <span className="font-semibold">{entries.length}</span> entries
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
};

export default IntelligenceAdmin;
