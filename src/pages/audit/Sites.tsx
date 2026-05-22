import React, { useState, useEffect } from 'react';
import { Plus, Edit, MapPin, Building2, Play } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Site } from '../../types/audit';
import { Link } from 'react-router-dom';

const Sites: React.FC = () => {
  const { currentOrganization, userRole } = useAuth();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    building_type: '',
    floors: 1,
    latitude: '',
    longitude: ''
  });

  const canEdit = userRole === 'OrgAdmin' || userRole === 'Auditor';

  useEffect(() => {
    if (currentOrganization) {
      loadSites();
    }
  }, [currentOrganization]);

  const loadSites = async () => {
    if (!currentOrganization) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('organization_id', currentOrganization.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading sites:', error);
    } else {
      setSites(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrganization) return;

    const siteData = {
      ...formData,
      organization_id: currentOrganization.id,
      floors: parseInt(formData.floors.toString()) || 1,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
    };

    let error;
    if (editingSite) {
      const { error: updateError } = await supabase
        .from('sites')
        .update(siteData)
        .eq('id', editingSite.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('sites')
        .insert([siteData]);
      error = insertError;
    }

    if (error) {
      console.error('Error saving site:', error);
      alert('Error saving site. Please try again.');
    } else {
      setShowForm(false);
      setEditingSite(null);
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        country: 'India',
        building_type: '',
        floors: 1,
        latitude: '',
        longitude: ''
      });
      loadSites();
    }
  };

  const handleEdit = (site: Site) => {
    setEditingSite(site);
    setFormData({
      name: site.name,
      address: site.address,
      city: site.city,
      state: site.state,
      country: site.country,
      building_type: site.building_type,
      floors: site.floors,
      latitude: site.latitude?.toString() || '',
      longitude: site.longitude?.toString() || ''
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSite(null);
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      building_type: '',
      floors: 1,
      latitude: '',
      longitude: ''
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sites</h1>
          <p className="text-slate-600">Manage your organization's sites and locations</p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Site</span>
          </button>
        )}
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div key={site.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{site.name}</h3>
                  <p className="text-sm text-slate-500">{site.building_type}</p>
                </div>
              </div>
              {canEdit && (
                <button
                  onClick={() => handleEdit(site)}
                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-600">
                  <p>{site.address}</p>
                  <p>{site.city}, {site.state}</p>
                  <p>{site.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <span>{site.floors} floors</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Link
                to={`/app/audit/audits/new?site=${site.id}`}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
              >
                <Play className="h-4 w-4" />
                <span>Run Audit</span>
              </Link>
              <Link
                to={`/app/audit/sites/${site.id}`}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}

        {sites.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Building2 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No sites yet</h3>
            <p className="text-slate-600 mb-4">Add your first site to start conducting audits</p>
            {canEdit && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add Site
              </button>
            )}
          </div>
        )}
      </div>

      {/* Site Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingSite ? 'Edit Site' : 'Add New Site'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Site Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., Main Office Building"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Building Type *
                  </label>
                  <select
                    required
                    value={formData.building_type}
                    onChange={(e) => setFormData({ ...formData, building_type: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select type</option>
                    <option value="Office">Office</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Retail">Retail</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Mixed Use">Mixed Use</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Address *
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Country *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="India">India</option>
                    <option value="UAE">UAE</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Oman">Oman</option>
                    <option value="Bahrain">Bahrain</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Number of Floors *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.floors}
                    onChange={(e) => setFormData({ ...formData, floors: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Latitude (Optional)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., 12.9716"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Longitude (Optional)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., 77.5946"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {editingSite ? 'Update Site' : 'Add Site'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sites;