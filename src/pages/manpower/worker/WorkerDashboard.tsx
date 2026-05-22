import React from 'react';
import { Calendar, Clock, FileText, DollarSign, User, MapPin, Phone, Mail } from 'lucide-react';
import { sampleCandidates, samplePlacements, sampleTimesheets, sampleJobOrders } from '../../../data/manpower/sampleData';

const WorkerDashboard: React.FC = () => {
  // Mock worker ID - in real app, this would come from auth context
  const workerId = 'candidate-1';
  const worker = sampleCandidates.find(c => c.id === workerId);
  
  const workerPlacements = samplePlacements.filter(placement => placement.candidate_id === workerId);
  const activePlacement = workerPlacements.find(p => p.status === 'Active');
  const activeJob = activePlacement ? sampleJobOrders.find(job => job.id === activePlacement.job_order_id) : null;
  
  const workerTimesheets = sampleTimesheets.filter(timesheet => {
    const placement = samplePlacements.find(p => p.id === timesheet.placement_id);
    return placement?.candidate_id === workerId;
  });

  const currentWeekTimesheet = workerTimesheets.find(t => t.status === 'Draft' || t.status === 'Submitted');

  const stats = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: 'Days Worked This Month',
      value: '22',
      subtitle: 'Out of 26 working days'
    },
    {
      icon: <Clock className="h-6 w-6 text-emerald-600" />,
      title: 'Total Hours This Week',
      value: currentWeekTimesheet ? currentWeekTimesheet.total_regular_hrs : '0',
      subtitle: `${currentWeekTimesheet?.ot_hrs || 0} overtime hours`
    },
    {
      icon: <FileText className="h-6 w-6 text-orange-600" />,
      title: 'Pending Timesheets',
      value: workerTimesheets.filter(t => t.status === 'Draft').length,
      subtitle: 'Submit by Friday 6 PM'
    },
    {
      icon: <DollarSign className="h-6 w-6 text-purple-600" />,
      title: 'Expected Earnings',
      value: '₹30,000',
      subtitle: 'This month (estimated)'
    }
  ];

  const upcomingShifts = [
    {
      date: 'Today',
      time: '8:00 AM - 5:00 PM',
      location: 'TechCorp Manufacturing - Plant 1',
      status: 'scheduled'
    },
    {
      date: 'Tomorrow',
      time: '8:00 AM - 5:00 PM',
      location: 'TechCorp Manufacturing - Plant 1',
      status: 'scheduled'
    },
    {
      date: 'Mar 28',
      time: '8:00 AM - 5:00 PM',
      location: 'TechCorp Manufacturing - Plant 1',
      status: 'scheduled'
    }
  ];

  const recentActivities = [
    {
      type: 'timesheet',
      message: 'Timesheet for week ending Mar 22 approved',
      time: '2 hours ago',
      status: 'success'
    },
    {
      type: 'shift',
      message: 'Shift reminder: Tomorrow 8:00 AM - 5:00 PM',
      time: '1 day ago',
      status: 'info'
    },
    {
      type: 'payslip',
      message: 'Payslip for March 2024 generated',
      time: '3 days ago',
      status: 'success'
    },
    {
      type: 'document',
      message: 'Medical certificate expires in 30 days',
      time: '1 week ago',
      status: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Worker Dashboard</h1>
              <p className="text-slate-600">Welcome back, {worker?.full_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Submit Timesheet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.subtitle}</div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-slate-700">{stat.title}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Assignment */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Current Assignment</h2>
              </div>
              <div className="p-6">
                {activePlacement && activeJob ? (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-navy-900">{activeJob.role_title}</h3>
                        <p className="text-slate-600">Worker Code: {activePlacement.worker_code}</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-slate-400" />
                        <span className="text-slate-700">{activeJob.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-slate-400" />
                        <span className="text-slate-700">
                          Started: {new Date(activePlacement.start_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-slate-400" />
                        <span className="text-slate-700">{activeJob.shift_type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-slate-400" />
                        <span className="text-slate-700">{activeJob.assignment_type} Assignment</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Assignment Details</h4>
                      <p className="text-blue-800 text-sm">{activeJob.job_type} position with focus on {activeJob.skills.slice(0, 3).join(', ')}.</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No Active Assignment</h3>
                    <p className="text-slate-600">You don't have any active assignments at the moment.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Shifts */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Upcoming Shifts</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingShifts.map((shift, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{shift.date}</div>
                        <div className="text-sm text-slate-600">{shift.time}</div>
                        <div className="text-sm text-slate-500">{shift.location}</div>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          Scheduled
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Profile</h2>
              </div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-navy-600" />
                  </div>
                  <h3 className="font-semibold text-navy-900">{worker?.full_name}</h3>
                  <p className="text-sm text-slate-600">{worker?.experience_years} years experience</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">{worker?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">{worker?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">{worker?.city}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {worker?.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Recent Activities</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.status === 'success' ? 'bg-emerald-500' :
                        activity.status === 'warning' ? 'bg-orange-500' :
                        activity.status === 'error' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-navy-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <Clock className="h-6 w-6 text-orange-600" />
                <span className="font-medium text-orange-900">Submit Timesheet</span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Calendar className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-blue-900">View Schedule</span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                <FileText className="h-6 w-6 text-emerald-600" />
                <span className="font-medium text-emerald-900">Download Payslips</span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <User className="h-6 w-6 text-purple-600" />
                <span className="font-medium text-purple-900">Update Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;