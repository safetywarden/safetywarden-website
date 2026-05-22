import React, { useState, useEffect } from 'react';
import { Rss, Plus, Edit2, Trash2, CheckCircle, XCircle, Save, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedAdminRoute from '../../components/admin/ProtectedAdminRoute';
import { supabase } from '../../lib/supabase';

interface NewsSource {
  id: string;
  source_name: string;
  rss_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_fetched_at: string | null;
  fetch_count: number;
  notes: string | null;
}

function NewsSourcesManager() {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    source_name: '',
    rss_url: '',
    is_active: true,
    notes: ''
  });

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSources(data || []);
    } catch (error) {
      console.error('Error loading sources:', error);
      alert('Failed to load news sources');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.source_name || !formData.rss_url) {
      alert('Please fill in source name and RSS URL');
      return;
    }

    try {
      const { error } = await supabase
        .from('news_sources')
        .insert([{
          source_name: formData.source_name,
          rss_url: formData.rss_url,
          is_active: formData.is_active,
          notes: formData.notes || null
        }]);

      if (error) throw error;

      setFormData({ source_name: '', rss_url: '', is_active: true, notes: '' });
      setShowAddForm(false);
      loadSources();
    } catch (error) {
      console.error('Error adding source:', error);
      alert('Failed to add news source');
    }
  };

  const handleUpdate = async (id: string, updates: Partial<NewsSource>) => {
    try {
      const { error } = await supabase
        .from('news_sources')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      loadSources();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating source:', error);
      alert('Failed to update news source');
    }
  };

  const handleDelete = async (id: string, sourceName: string) => {
    if (!confirm(`Are you sure you want to delete "${sourceName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('news_sources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadSources();
    } catch (error) {
      console.error('Error deleting source:', error);
      alert('Failed to delete news source');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await handleUpdate(id, { is_active: !currentStatus });
  };

  if (loading) {
    return (
      <ProtectedAdminRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading news sources...</div>
          </div>
        </AdminLayout>
      </ProtectedAdminRoute>
    );
  }

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">News Sources Manager</h1>
              <p className="mt-2 text-gray-600">
                Manage RSS feed sources for Intelligence Hub content
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {showAddForm ? 'Cancel' : 'Add Source'}
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New RSS Source</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source Name *
                  </label>
                  <input
                    type="text"
                    value={formData.source_name}
                    onChange={(e) => setFormData({ ...formData, source_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., The Hindu – Industry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RSS URL *
                  </label>
                  <input
                    type="url"
                    value={formData.rss_url}
                    onChange={(e) => setFormData({ ...formData, rss_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/feed.rss"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Optional notes about this source..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="text-sm text-gray-700">
                    Active (will be fetched)
                  </label>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Add Source
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RSS URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fetch Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Fetched
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sources.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <Rss className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No news sources configured</p>
                      </td>
                    </tr>
                  ) : (
                    sources.map((source) => (
                      <tr key={source.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleActive(source.id, source.is_active)}
                            className="flex items-center gap-1"
                          >
                            {source.is_active ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          {editingId === source.id ? (
                            <input
                              type="text"
                              defaultValue={source.source_name}
                              onBlur={(e) => handleUpdate(source.id, { source_name: e.target.value })}
                              className="px-2 py-1 border border-gray-300 rounded"
                              autoFocus
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{source.source_name}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-md truncate">
                            <a
                              href={source.rss_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-600"
                            >
                              {source.rss_url}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{source.fetch_count}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {source.last_fetched_at
                              ? new Date(source.last_fetched_at).toLocaleDateString()
                              : 'Never'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingId(editingId === source.id ? null : source.id)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(source.id, source.source_name)}
                              className="p-1 text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">How It Works</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Add RSS feed URLs from safety and industry news sources</li>
              <li>Toggle sources active/inactive to control which feeds are fetched</li>
              <li>Fetch count tracks how many times each source has been successfully retrieved</li>
              <li>Use automation tools to schedule regular RSS fetching and conversion</li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}

export default NewsSourcesManager;
