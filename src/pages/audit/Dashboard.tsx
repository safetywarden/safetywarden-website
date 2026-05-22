import React, { useState, useEffect } from 'react';
import { Calendar, AlertTriangle, TrendingUp, Building2, Plus, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { DashboardStats, Audit, Action, Site } from '../../types/audit';
import { Link } from 'react-router-dom';
import { format, addDays, isAfter, isBefore } from 'date-fns';

const Dashboard: React.FC = () => {
  const { currentOrganization } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    upcoming_audits: 0,
    open_actions: 0,
    sites_at_risk: 0,
    avg_risk_score: 0
  });
  const [upcomingAudits, setUpcomingAudits] = useState<Audit[]>([]);
  const [openActions, setOpenActions] = useState<Action[]>([]);
  const [sitesAtRisk, setSitesAtRisk] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrganization) {
      loadDashboardData();
    }
  }, [currentOrganization]);

  const loadDashboardData = async () => {
    if (!currentOrganization) return;

    setLoading(true);
    
    try {
      // Load upcoming audits (next 14 days)
      const fourteenDaysFromNow = addDays(new Date(), 14);
      const { data: audits } = await supabase
        .from('audits')
        .select(`
          *,
          site:sites(*),
          auditor:users(*)
        `)
        .eq('organization_id', currentOrganization.id)
        .gte('scheduled_at', new Date().toISOString())
        .lte('scheduled_at', fourteenDaysFromNow.toISOString())
        .order('scheduled_at', { ascending: true });

      setUpcomingAudits(audits || []);

      // Load open actions
      const { data: actions } = await supabase
        .from('actions')
        .select(`
          *,
          checklist_item:checklist_items(*),
          audit:audits(*)
        `)
        .eq('status', 'Open')
        .order('due_date', { ascending: true })
        .limit(10);

      setOpenActions(actions || []);

      // Load sites at risk (completed audits with high risk scores)
      const { data: riskySites } = await supabase
        .from('audits')
        .select(`
          site_id,
          overall_risk,
          site:sites(*)
        `)
        .eq('organization_id', currentOrganization.id)
        .eq('status', 'Completed')
        .gte('overall_risk', 15)
        .order('overall_risk', { ascending: false })
        .limit(5);

      const uniqueSites = riskySites?.reduce((acc: any[], curr) => {
        if (!acc.find(site => site.id === curr.site?.id)) {
          acc.push({ ...curr.site, risk_score: curr.overall_risk });
        }
        return acc;
      }, []) || [];

      setSitesAtRisk(uniqueSites);

      // Calculate stats
      const { data: allAudits } = await supabase
        .from('audits')
        .select('overall_risk')
        .eq('organization_id', currentOrganization.id)
        .eq('status', 'Completed');

      const avgRisk = allAudits?.length 
        ? allAudits.reduce((sum, audit) => sum + audit.overall_risk, 0) / allAudits.length
        : 0;

      setStats({
        upcoming_audits: audits?.length || 0,
        open_actions: actions?.length || 0,
        sites_at_risk: uniqueSites.length,
        avg_risk_score: avgRisk
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 20) return 'text-red-600 bg-red-100';
    if (riskScore >= 15) return 'text-orange-600 bg-orange-100';
    if (riskScore >= 10) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In-Progress': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const isOverdue = (dueDate: string) => {
    return isAfter(new Date(), new Date(dueDate));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
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
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Overview of your safety compliance status</p>
        </div>
        <Link
          to="/app/audit/audits/new"
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Audit</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Upcoming Audits</p>
              <p className="text-2xl font-bold text-slate-900">{stats.upcoming_audits}</p>
              <p className="text-xs text-slate-500">Next 14 days</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Open Actions</p>
              <p className="text-2xl font-bold text-slate-900">{stats.open_actions}</p>
              <p className="text-xs text-slate-500">Require attention</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Sites at Risk</p>
              <p className="text-2xl font-bold text-slate-900">{stats.sites_at_risk}</p>
              <p className="text-xs text-slate-500">High risk score</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Risk Score</p>
              <p className="text-2xl font-bold text-slate-900">{stats.avg_risk_score.toFixed(1)}</p>
              <p className="text-xs text-slate-500">Last 6 audits</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Audits */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Upcoming Audits</h2>
              <Link
                to="/app/audit/audits"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {upcomingAudits.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No upcoming audits scheduled</p>
                <Link
                  to="/app/audit/audits/new"
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-2 inline-block"
                >
                  Schedule an audit
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAudits.slice(0, 5).map((audit) => (
                  <div key={audit.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{audit.site?.name}</p>
                      <p className="text-sm text-slate-600">
                        {format(new Date(audit.scheduled_at), 'MMM dd, yyyy')} at{' '}
                        {format(new Date(audit.scheduled_at), 'h:mm a')}
                      </p>
                      <p className="text-xs text-slate-500">Auditor: {audit.auditor?.full_name}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(audit.status)}`}>
                      {audit.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Open Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Open Actions</h2>
              <Link
                to="/app/audit/actions"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {openActions.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No open actions</p>
                <p className="text-sm text-slate-500 mt-1">Great job on compliance!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {openActions.slice(0, 5).map((action) => (
                  <div key={action.id} className={`p-3 rounded-lg border-l-4 ${
                    isOverdue(action.due_date) ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{action.title}</p>
                        <p className="text-sm text-slate-600 mt-1">
                          Owner: {action.owner_name}
                        </p>
                        <p className={`text-xs mt-1 ${
                          isOverdue(action.due_date) ? 'text-red-600 font-medium' : 'text-slate-500'
                        }`}>
                          Due: {format(new Date(action.due_date), 'MMM dd, yyyy')}
                          {isOverdue(action.due_date) && ' (Overdue)'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sites at Risk */}
      {sitesAtRisk.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Sites at Risk</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sitesAtRisk.map((site: any) => (
                <div key={site.id} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-900">{site.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(site.risk_score)}`}>
                      Risk: {site.risk_score.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{site.address}</p>
                  <p className="text-xs text-slate-500 mt-1">{site.city}, {site.state}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;