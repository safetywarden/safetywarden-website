import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Upload, 
  Download, 
  Users, 
  BookOpen, 
  Award, 
  DollarSign,
  TrendingUp,
  Settings,
  FileText
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { Course, TrainingProvider, TrainingSession, Certificate } from '../../../types/training';
import { AffiliateParser } from '../../../utils/affiliateParser';

const TrainingAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState<Course[]>([]);
  const [providers, setProviders] = useState<TrainingProvider[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [importProgress, setImportProgress] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    
    try {
      // Load all training data for admin overview
      const [coursesRes, providersRes, sessionsRes, certificatesRes] = await Promise.all([
        supabase.from('courses').select('*, provider:training_providers(*)').order('title'),
        supabase.from('training_providers').select('*').order('brand_name'),
        supabase.from('training_sessions').select('*, course:courses(*), provider:training_providers(*)').order('start_date', { ascending: false }),
        supabase.from('certificates').select('*, enrollment:enrollments(*)').order('created_at', { ascending: false })
      ]);

      setCourses(coursesRes.data || []);
      setProviders(providersRes.data || []);
      setSessions(sessionsRes.data || []);
      setCertificates(certificatesRes.data || []);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAffiliateImport = async (file: File) => {
    setImportProgress('Parsing affiliate onboarding kit...');
    
    try {
      const { affiliates, links, coupons } = await AffiliateParser.parseExcelFile(file);
      
      setImportProgress(`Parsed ${affiliates.length} affiliates, ${links.length} links, ${coupons.length} coupons. Importing...`);
      
      // Import affiliates
      if (affiliates.length > 0) {
        const { error: affiliatesError } = await supabase
          .from('affiliates')
          .insert(affiliates);
        
        if (affiliatesError) throw affiliatesError;
      }
      
      // Import affiliate links
      if (links.length > 0) {
        const { error: linksError } = await supabase
          .from('affiliate_links')
          .insert(links);
        
        if (linksError) throw linksError;
      }
      
      // Import coupons
      if (coupons.length > 0) {
        const { error: couponsError } = await supabase
          .from('coupons')
          .insert(coupons);
        
        if (couponsError) throw couponsError;
      }
      
      setImportProgress('Import completed successfully!');
      setTimeout(() => {
        setImportProgress('');
        loadAdminData();
      }, 2000);
      
    } catch (error) {
      console.error('Error importing affiliate data:', error);
      setImportProgress(`Error: ${error}`);
    }
  };

  const calculateOverviewStats = () => {
    const totalCourses = courses.length;
    const activeSessions = sessions.filter(s => s.status === 'Published').length;
    const totalCertificates = certificates.length;
    const activeCertificates = certificates.filter(c => c.status === 'Issued').length;
    const approvedProviders = providers.filter(p => p.status === 'Approved').length;

    return {
      totalCourses,
      activeSessions,
      totalCertificates,
      activeCertificates,
      approvedProviders
    };
  };

  const stats = calculateOverviewStats();

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
              <h1 className="text-2xl font-bold text-navy-900">Training Administration</h1>
              <p className="text-slate-600">Manage courses, providers, and certification system</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors">
                Export Data
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Create Course
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
                { id: 'overview', name: 'Overview', icon: TrendingUp },
                { id: 'courses', name: 'Courses', icon: BookOpen },
                { id: 'providers', name: 'Providers', icon: Users },
                { id: 'certificates', name: 'Certificates', icon: Award },
                { id: 'affiliates', name: 'Affiliates', icon: DollarSign },
                { id: 'import', name: 'Import Data', icon: Upload }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Courses</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalCourses}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
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
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Certificates Issued</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.activeCertificates}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Approved Providers</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.approvedProviders}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Certificates</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalCertificates}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <span className="font-medium text-blue-900">Create Course</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                    <Users className="h-6 w-6 text-emerald-600" />
                    <span className="font-medium text-emerald-900">Approve Provider</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                    <Award className="h-6 w-6 text-orange-600" />
                    <span className="font-medium text-orange-900">Issue Certificate</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                    <span className="font-medium text-purple-900">Process Payouts</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Import Data Tab */}
        {activeTab === 'import' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Import Training Data</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Affiliate Onboarding Kit */}
                  <div className="border border-slate-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">
                      Affiliate Onboarding Kit
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Import affiliate partners, tracking links, and promotional coupons from Excel file
                    </p>
                    
                    {importProgress ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto mb-2"></div>
                        <p className="text-sm text-slate-600">{importProgress}</p>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 mb-2">
                          Upload SafetyWarden Training Affiliate Onboarding Kit
                        </p>
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleAffiliateImport(file);
                          }}
                          className="hidden"
                          id="affiliate-upload"
                        />
                        <label
                          htmlFor="affiliate-upload"
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors"
                        >
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>

                  {/* CSV Templates */}
                  <div className="border border-slate-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">
                      CSV Templates
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Download templates for bulk data import
                    </p>
                    
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <span className="text-slate-700">Training Providers</span>
                        <Download className="h-4 w-4 text-slate-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <span className="text-slate-700">Courses</span>
                        <Download className="h-4 w-4 text-slate-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <span className="text-slate-700">Training Sessions</span>
                        <Download className="h-4 w-4 text-slate-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                        <span className="text-slate-700">Enrollment Template</span>
                        <Download className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Import Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Import Instructions</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <p><strong>1. Affiliate Onboarding Kit:</strong> Contains affiliate partners, tracking links, and promotional coupons in a single Excel file.</p>
                <p><strong>2. Training Providers:</strong> Import approved training organizations with certifications and payout details.</p>
                <p><strong>3. Courses:</strong> Import course catalog with pricing, duration, and learning outcomes.</p>
                <p><strong>4. Training Sessions:</strong> Import scheduled training sessions with dates, locations, and capacity.</p>
                <p><strong>5. Enrollments:</strong> Bulk enroll students using the enrollment template.</p>
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
                  <h2 className="text-lg font-semibold text-navy-900">Course Management</h2>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Course</span>
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
                        Provider
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Price
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
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{course.title}</div>
                          <div className="text-sm text-slate-500">{course.course_code}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{course.provider?.brand_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{course.category}</div>
                          <div className="text-sm text-slate-500">{course.level}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{course.duration_hours}h</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">₹{course.price_per_seat.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            course.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {course.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-orange-600 hover:text-orange-900">Edit</button>
                            <button className="text-blue-600 hover:text-blue-900">View</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy-900">Training Providers</h2>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Provider</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {providers.map((provider) => (
                    <div key={provider.id} className="border border-slate-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">{provider.brand_name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          provider.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          provider.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {provider.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{provider.legal_name}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-slate-500">Location:</span>
                          <span className="ml-1 text-slate-700">{provider.city}, {provider.country}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Contact:</span>
                          <span className="ml-1 text-slate-700">{provider.contact_name}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Courses:</span>
                          <span className="ml-1 text-slate-700">
                            {courses.filter(c => c.provider_id === provider.id).length}
                          </span>
                        </div>
                      </div>
                      
                      {provider.certifications.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex flex-wrap gap-1">
                            {provider.certifications.slice(0, 3).map((cert, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {cert}
                              </span>
                            ))}
                            {provider.certifications.length > 3 && (
                              <span className="text-xs text-slate-500">
                                +{provider.certifications.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingAdmin;