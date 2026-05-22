import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Calendar, 
  Users, 
  DollarSign, 
  BookOpen, 
  TrendingUp,
  Edit,
  Eye,
  Settings
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TrainingProvider, Course, TrainingSession, Enrollment } from '../../types/training';

const ProviderPortal: React.FC = () => {
  const [provider, setProvider] = useState<TrainingProvider | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    loadProviderData();
  }, []);

  const loadProviderData = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, get provider ID from auth context
      const providerId = 'provider-demo';
      
      // Load provider profile
      const { data: providerData } = await supabase
        .from('training_providers')
        .select('*')
        .eq('id', providerId)
        .single();

      if (providerData) {
        setProvider(providerData);

        // Load provider courses
        const { data: coursesData } = await supabase
          .from('courses')
          .select('*')
          .eq('provider_id', providerId)
          .order('title');

        setCourses(coursesData || []);

        // Load provider sessions
        const { data: sessionsData } = await supabase
          .from('training_sessions')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('provider_id', providerId)
          .order('start_date', { ascending: false });

        setSessions(sessionsData || []);

        // Load enrollments for provider sessions
        const sessionIds = sessionsData?.map(s => s.id) || [];
        if (sessionIds.length > 0) {
          const { data: enrollmentsData } = await supabase
            .from('enrollments')
            .select(`
              *,
              session:training_sessions(
                *,
                course:courses(*)
              )
            `)
            .in('session_id', sessionIds)
            .order('enrolled_at', { ascending: false });

          setEnrollments(enrollmentsData || []);
        }
      }
    } catch (error) {
      console.error('Error loading provider data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalSessions = sessions.length;
    const activeSessions = sessions.filter(s => s.status === 'Published').length;
    const totalEnrollments = enrollments.length;
    const totalRevenue = enrollments
      .filter(e => e.payment_status === 'Paid')
      .reduce((sum, e) => sum + e.amount_paid, 0);
    const avgRating = 4.8; // Mock data
    const completionRate = enrollments.length > 0 
      ? (enrollments.filter(e => e.overall_status === 'Passed').length / enrollments.length) * 100 
      : 0;

    return {
      totalSessions,
      activeSessions,
      totalEnrollments,
      totalRevenue,
      avgRating,
      completionRate
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Provider Portal</h1>
              <p className="text-slate-600">
                Welcome back, {provider?.brand_name || 'Training Provider'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/training"
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                View Public Catalog
              </Link>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Create Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
                { id: 'courses', name: 'Courses', icon: BookOpen },
                { id: 'sessions', name: 'Sessions', icon: Calendar },
                { id: 'enrollments', name: 'Enrollments', icon: Users },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalSessions}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Sessions</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.activeSessions}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Enrollments</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalEnrollments}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Revenue</p>
                    <p className="text-2xl font-bold text-slate-900">₹{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.avgRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.completionRate.toFixed(1)}%</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy-900">Recent Sessions</h2>
                  <Link
                    to="#"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {sessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No sessions yet</h3>
                    <p className="text-slate-600 mb-4">Create your first training session to get started</p>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Create Session
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.slice(0, 5).map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">{session.course?.title}</h3>
                          <p className="text-sm text-slate-600">
                            {new Date(session.start_date).toLocaleDateString('en-IN')} • {session.city}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-slate-500">
                              {session.available_seats}/{session.max_seats} seats available
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              session.status === 'Published' ? 'bg-emerald-100 text-emerald-800' :
                              session.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {session.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy-900">Your Courses</h2>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Create Course</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-slate-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {course.level}
                        </span>
                        <span className="text-sm text-slate-500">{course.duration_hours}h</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                        {course.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-bold text-navy-900">
                          ₹{course.price_per_seat.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500">
                          Max {course.max_participants} students
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                          Create Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy-900">Training Sessions</h2>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Schedule Session</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Enrollment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {sessions.map((session) => {
                      const sessionEnrollments = enrollments.filter(e => e.session_id === session.id);
                      return (
                        <tr key={session.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">
                              {session.course?.title}
                            </div>
                            <div className="text-sm text-slate-500">
                              {session.session_code}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">
                              {new Date(session.start_date).toLocaleDateString('en-IN')}
                            </div>
                            <div className="text-sm text-slate-500">
                              {session.start_time} - {session.end_time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">{session.city}</div>
                            <div className="text-sm text-slate-500">{session.mode}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">
                              {sessionEnrollments.length}/{session.max_seats}
                            </div>
                            <div className="text-sm text-slate-500">
                              {session.available_seats} available
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              session.status === 'Published' ? 'bg-emerald-100 text-emerald-800' :
                              session.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                              session.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {session.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-orange-600 hover:text-orange-900">
                                Edit
                              </button>
                              <button className="text-blue-600 hover:text-blue-900">
                                View
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Provider Info */}
        {activeTab === 'settings' && provider && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Provider Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-slate-900 mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Legal Name</label>
                        <p className="text-slate-900">{provider.legal_name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Brand Name</label>
                        <p className="text-slate-900">{provider.brand_name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Contact Person</label>
                        <p className="text-slate-900">{provider.contact_name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <p className="text-slate-900">{provider.contact_email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Phone</label>
                        <p className="text-slate-900">{provider.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-slate-900 mb-4">Business Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Address</label>
                        <p className="text-slate-900">
                          {provider.address}<br />
                          {provider.city}, {provider.state}<br />
                          {provider.country}
                        </p>
                      </div>
                      {provider.gstin && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700">GSTIN</label>
                          <p className="text-slate-900">{provider.gstin}</p>
                        </div>
                      )}
                      {provider.website && (
                        <div>
                          <label className="block text-sm font-medium text-slate-700">Website</label>
                          <a 
                            href={provider.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700"
                          >
                            {provider.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                {provider.certifications.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h3 className="font-medium text-slate-900 mb-3">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.certifications.map((cert, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payout Information */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-medium text-slate-900 mb-3">Payout Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Payout Method</label>
                      <p className="text-slate-900">{provider.payout_method}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Payment Terms</label>
                      <p className="text-slate-900">NET-{provider.payout_terms_days} days</p>
                    </div>
                    {provider.bank_details && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Bank Details</label>
                        <p className="text-slate-900">{provider.bank_details}</p>
                      </div>
                    )}
                    {provider.upi_id && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700">UPI ID</label>
                        <p className="text-slate-900">{provider.upi_id}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderPortal;