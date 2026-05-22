import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, User, Filter, Search, Play, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Audit } from '../../types/audit';
import { format, isAfter, isBefore, addDays } from 'date-fns';

const Audits: React.FC = () => {
  const { currentOrganization, userRole } = useAuth();
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const canCreate = userRole === 'OrgAdmin' || userRole === 'Auditor';

  useEffect(() => {
    if (currentOrganization) {
      loadAudits();
    }
  }, [currentOrganization]);

  const loadAudits = async () => {
    if (!currentOrganization) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('audits')
      .select(`
        *,
        site:sites(*),
        auditor:users(*)
      `)
      .eq('organization_id', currentOrganization.id)
      .order('scheduled_at', { ascending: false });

    if (error) {
      console.error('Error loading audits:', error);
    } else {
      setAudits(data || []);
    }
    setLoading(false);
  };

  const filteredAudits = audits.filter(audit => {
    const matchesStatus = !statusFilter || audit.status === statusFilter;
    const matchesSearch = !searchQuery || 
      audit.site?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.auditor?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In-Progress': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 15) return 'text-red-600 bg-red-100';
    if (riskScore >= 9) return 'text-orange-600 bg-orange-100';
    if (riskScore >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getPassFailColor = (passFail: string | null) => {
    switch (passFail) {
      case 'Pass': return 'bg-green-100 text-green-800';
      case 'Conditional Pass': return 'bg-yellow-100 text-yellow-800';
      case 'Fail': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const isOverdue = (scheduledAt: string, status: string) => {
    return status === 'Scheduled' && isAfter(new Date(), new Date(scheduledAt));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
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
          <h1 className="text-2xl font-bold text-slate-900">Audits</h1>
          <p className="text-slate-600">Manage safety audits and compliance assessments</p>
        </div>
        {canCreate && (
          <Link
            to="/app/audit/audits/new"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Audit</span>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search audits by site, auditor, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-2xl font-bold text-blue-600">
            {audits.filter(a => a.status === 'Scheduled').length}
          </div>
          <div className="text-sm text-slate-600">Scheduled</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-2xl font-bold text-orange-600">
            {audits.filter(a => a.status === 'In-Progress').length}
          </div>
          <div className="text-sm text-slate-600">In Progress</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-2xl font-bold text-green-600">
            {audits.filter(a => a.status === 'Completed').length}
          </div>
          <div className="text-sm text-slate-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-2xl font-bold text-red-600">
            {audits.filter(a => isOverdue(a.scheduled_at, a.status)).length}
          </div>
          <div className="text-sm text-slate-600">Overdue</div>
        </div>
      </div>

      {/* Audits List */}
      <div className="space-y-4">
        {filteredAudits.map((audit) => (
          <div key={audit.id} className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
            isOverdue(audit.scheduled_at, audit.status) ? 'border-red-300 bg-red-50' : 'border-slate-200'
          }`}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {audit.site?.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(audit.status)}`}>
                      {audit.status}
                    </span>
                    {audit.pass_fail && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPassFailColor(audit.pass_fail)}`}>
                        {audit.pass_fail}
                      </span>
                    )}
                    {isOverdue(audit.scheduled_at, audit.status) && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Overdue
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">{audit.site?.building_type}</p>
                        <p className="text-xs text-slate-500">{audit.site?.city}, {audit.site?.state}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">{audit.auditor?.full_name}</p>
                        <p className="text-xs text-slate-500">Auditor</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">
                          {format(new Date(audit.scheduled_at), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-slate-500">
                          {format(new Date(audit.scheduled_at), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {audit.status === 'Completed' && (
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(audit.overall_risk)}`}>
                        Risk Score: {audit.overall_risk.toFixed(1)}/25
                      </div>
                      {audit.completed_at && (
                        <div className="text-sm text-slate-600">
                          Completed: {format(new Date(audit.completed_at), 'MMM dd, yyyy')}
                        </div>
                      )}
                    </div>
                  )}

                  {audit.notes && (
                    <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                      {audit.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {audit.status === 'Scheduled' && canCreate && (
                    <Link
                      to={`/app/audit/audits/${audit.id}/run`}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start Audit</span>
                    </Link>
                  )}
                  
                  {audit.status === 'In-Progress' && canCreate && (
                    <Link
                      to={`/app/audit/audits/${audit.id}/run`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <Play className="h-4 w-4" />
                      <span>Continue</span>
                    </Link>
                  )}
                  
                  <Link
                    to={`/app/audit/audits/${audit.id}`}
                    className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                  >
                    View Details
                  </Link>
                  
                  {audit.status === 'Completed' && (
                    <button className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>Report</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAudits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {searchQuery || statusFilter ? 'No audits found' : 'No audits yet'}
            </h3>
            <p className="text-slate-600 mb-4">
              {searchQuery || statusFilter 
                ? 'Try adjusting your search criteria' 
                : 'Schedule your first audit to get started'
              }
            </p>
            {canCreate && !searchQuery && !statusFilter && (
              <Link
                to="/app/audit/audits/new"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Schedule Audit</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Audits;