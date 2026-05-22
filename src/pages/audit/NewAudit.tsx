import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, User, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Site, User as UserType, AuditFormData } from '../../types/audit';
import { format, addDays } from 'date-fns';

const NewAudit: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentOrganization, user } = useAuth();
  const [sites, setSites] = useState<Site[]>([]);
  const [auditors, setAuditors] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<AuditFormData>({
    site_id: searchParams.get('site') || '',
    scheduled_at: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
    auditor_id: user?.id || '',
    notes: ''
  });

  useEffect(() => {
    if (currentOrganization) {
      loadData();
    }
  }, [currentOrganization]);

  const loadData = async () => {
    if (!currentOrganization) return;

    setLoading(true);
    
    try {
      // Load sites
      const { data: sitesData } = await supabase
        .from('sites')
        .select('*')
        .eq('organization_id', currentOrganization.id)
        .order('name');

      setSites(sitesData || []);

      // Load auditors (users with Auditor or OrgAdmin role)
      const { data: auditorsData } = await supabase
        .from('memberships')
        .select(`
          user:users(*)
        `)
        .eq('organization_id', currentOrganization.id)
        .in('role', ['OrgAdmin', 'Auditor']);

      const auditorUsers = auditorsData?.map(m => m.user).filter(Boolean) || [];
      setAuditors(auditorUsers as UserType[]);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrganization) return;

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('audits')
        .insert([{
          ...formData,
          organization_id: currentOrganization.id,
          status: 'Scheduled'
        }])
        .select()
        .single();

      if (error) throw error;

      // Navigate to the audit detail page
      navigate(`/app/audit/audits/${data.id}`);
    } catch (error) {
      console.error('Error creating audit:', error);
      alert('Error creating audit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedSite = sites.find(s => s.id === formData.site_id);
  const selectedAuditor = auditors.find(a => a.id === formData.auditor_id);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Schedule New Audit</h1>
          <p className="text-slate-600">Create a new safety audit for one of your sites</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Site Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Site *
              </label>
              <select
                required
                value={formData.site_id}
                onChange={(e) => setFormData({ ...formData, site_id: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Choose a site</option>
                {sites.map(site => (
                  <option key={site.id} value={site.id}>
                    {site.name} - {site.city}, {site.state}
                  </option>
                ))}
              </select>
              
              {selectedSite && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">{selectedSite.name}</p>
                      <p className="text-sm text-slate-600">{selectedSite.building_type} • {selectedSite.floors} floors</p>
                      <p className="text-sm text-slate-600">{selectedSite.address}</p>
                      <p className="text-sm text-slate-600">{selectedSite.city}, {selectedSite.state}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auditor Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Assign Auditor *
              </label>
              <select
                required
                value={formData.auditor_id}
                onChange={(e) => setFormData({ ...formData, auditor_id: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Choose an auditor</option>
                {auditors.map(auditor => (
                  <option key={auditor.id} value={auditor.id}>
                    {auditor.full_name} ({auditor.email})
                  </option>
                ))}
              </select>
              
              {selectedAuditor && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-900">{selectedAuditor.full_name}</p>
                      <p className="text-sm text-slate-600">{selectedAuditor.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Schedule Date & Time */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Scheduled Date & Time *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.scheduled_at}
                onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Scheduled for: {format(new Date(formData.scheduled_at), 'PPP p')}
              </p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Any special instructions or notes for this audit..."
              />
            </div>

            {/* Summary */}
            {formData.site_id && formData.auditor_id && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Audit Summary</h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>Site:</strong> {selectedSite?.name}</p>
                  <p><strong>Auditor:</strong> {selectedAuditor?.full_name}</p>
                  <p><strong>Scheduled:</strong> {format(new Date(formData.scheduled_at), 'PPP p')}</p>
                  <p><strong>Building Type:</strong> {selectedSite?.building_type}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/app/audit/audits')}
                className="flex-1 border border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Schedule Audit</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-slate-50 rounded-xl p-6">
          <h3 className="font-medium text-slate-900 mb-3">What happens next?</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">1</div>
              <span>Audit will be scheduled and assigned auditor will be notified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">2</div>
              <span>Auditor can start the audit and complete checklist items</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">3</div>
              <span>System will calculate risk scores and generate corrective actions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">4</div>
              <span>Final audit report will be generated with findings and recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAudit;