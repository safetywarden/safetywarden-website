import React from 'react';
import { Users, Clock, FileText, DollarSign, TrendingUp, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { sampleJobOrders, samplePlacements, sampleTimesheets, sampleInvoices, getClientById } from '../../../data/manpower/sampleData';

const ClientDashboard: React.FC = () => {
  // Mock client ID - in real app, this would come from auth context
  const clientId = 'client-1';
  const client = getClientById(clientId);
  
  const clientJobOrders = sampleJobOrders.filter(job => job.client_id === clientId);
  const clientPlacements = samplePlacements.filter(placement => {
    const jobOrder = sampleJobOrders.find(job => job.id === placement.job_order_id);
    return jobOrder?.client_id === clientId;
  });
  const clientTimesheets = sampleTimesheets.filter(timesheet => {
    const placement = samplePlacements.find(p => p.id === timesheet.placement_id);
    const jobOrder = placement ? sampleJobOrders.find(job => job.id === placement.job_order_id) : null;
    return jobOrder?.client_id === clientId;
  });
  const clientInvoices = sampleInvoices.filter(invoice => invoice.client_id === clientId);

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Active Placements',
      value: clientPlacements.filter(p => p.status === 'Active').length,
      change: '+2 this month',
      changeType: 'positive'
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: 'Pending Timesheets',
      value: clientTimesheets.filter(t => t.status === 'Submitted').length,
      change: 'Awaiting approval',
      changeType: 'neutral'
    },
    {
      icon: <FileText className="h-8 w-8 text-emerald-600" />,
      title: 'Open Job Orders',
      value: clientJobOrders.filter(j => j.status === 'Active').length,
      change: '2 filled this week',
      changeType: 'positive'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-purple-600" />,
      title: 'Outstanding Invoices',
      value: clientInvoices.filter(i => i.status === 'Sent').length,
      change: `₹${clientInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}`,
      changeType: 'neutral'
    }
  ];

  const recentActivities = [
    {
      type: 'placement',
      message: 'New placement: Rajesh Kumar started as Safety Officer',
      time: '2 hours ago',
      icon: <Users className="h-5 w-5 text-blue-600" />
    },
    {
      type: 'timesheet',
      message: 'Timesheet submitted by Priya Sharma for week ending Mar 22',
      time: '4 hours ago',
      icon: <Clock className="h-5 w-5 text-orange-600" />
    },
    {
      type: 'invoice',
      message: 'Invoice INV-2024-001 generated for ₹45,000',
      time: '1 day ago',
      icon: <FileText className="h-5 w-5 text-emerald-600" />
    },
    {
      type: 'application',
      message: '3 new applications received for Fire Warden position',
      time: '2 days ago',
      icon: <AlertCircle className="h-5 w-5 text-purple-600" />
    }
  ];

  const upcomingTasks = [
    {
      task: 'Review timesheet for Rajesh Kumar',
      due: 'Today',
      priority: 'high',
      type: 'timesheet'
    },
    {
      task: 'Interview candidates for HSE Supervisor role',
      due: 'Tomorrow',
      priority: 'medium',
      type: 'interview'
    },
    {
      task: 'Approve invoice payment for March',
      due: 'Mar 30',
      priority: 'medium',
      type: 'payment'
    },
    {
      task: 'Renew contract for temporary staff',
      due: 'Apr 5',
      priority: 'low',
      type: 'contract'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Client Dashboard</h1>
              <p className="text-slate-600">Welcome back, {client?.org_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Request Staff
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
                  <div className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-emerald-600' :
                    stat.changeType === 'negative' ? 'text-red-600' :
                    'text-slate-600'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-slate-700">{stat.title}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Recent Activities</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.icon}
                      </div>
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

          {/* Upcoming Tasks */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Upcoming Tasks</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{task.task}</p>
                        <p className="text-xs text-slate-500 mt-1">Due: {task.due}</p>
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
              <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-blue-900">Create Job Order</span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <Clock className="h-6 w-6 text-orange-600" />
                <span className="font-medium text-orange-900">Review Timesheets</span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                <FileText className="h-6 w-6 text-emerald-600" />
                <span className="font-medium text-emerald-900">View Invoices</span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <span className="font-medium text-purple-900">View Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Current Placements Summary */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-navy-900">Current Placements</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Worker
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Start Date
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
                  {clientPlacements.slice(0, 5).map((placement, index) => {
                    const jobOrder = sampleJobOrders.find(job => job.id === placement.job_order_id);
                    return (
                      <tr key={placement.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            Worker #{placement.worker_code}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{jobOrder?.role_title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {new Date(placement.start_date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            placement.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                            placement.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {placement.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-orange-600 hover:text-orange-900">
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;