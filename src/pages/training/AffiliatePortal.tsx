import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  MousePointer, 
  Award,
  Copy,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Affiliate, AffiliateLink, AttributionEvent, Payout } from '../../types/training';
import { getAffiliateOnboardingData } from '../../utils/affiliateParser';

const AffiliatePortal: React.FC = () => {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [events, setEvents] = useState<AttributionEvent[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const onboardingData = getAffiliateOnboardingData();

  useEffect(() => {
    loadAffiliateData();
  }, []);

  const loadAffiliateData = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, get affiliate ID from auth context
      const affiliateId = 'affiliate-demo';
      
      // Load affiliate profile
      const { data: affiliateData } = await supabase
        .from('affiliates')
        .select('*')
        .eq('id', affiliateId)
        .single();

      if (affiliateData) {
        setAffiliate(affiliateData);

        // Load affiliate links
        const { data: linksData } = await supabase
          .from('affiliate_links')
          .select('*')
          .eq('affiliate_id', affiliateId)
          .eq('active', true);

        setLinks(linksData || []);

        // Load attribution events
        const { data: eventsData } = await supabase
          .from('attribution_events')
          .select('*')
          .eq('affiliate_id', affiliateId)
          .order('created_at', { ascending: false })
          .limit(50);

        setEvents(eventsData || []);

        // Load payouts
        const { data: payoutsData } = await supabase
          .from('payouts')
          .select('*')
          .eq('affiliate_id', affiliateId)
          .order('created_at', { ascending: false });

        setPayouts(payoutsData || []);
      }
    } catch (error) {
      console.error('Error loading affiliate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  const generateTrackingUrl = (linkCode: string) => {
    return `https://safetywarden.com/training?ref=${linkCode}`;
  };

  const calculateStats = () => {
    const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
    const totalConversions = links.reduce((sum, link) => sum + link.conversions, 0);
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
    const totalEarnings = payouts.reduce((sum, payout) => sum + payout.total_amount, 0);
    const pendingEarnings = payouts
      .filter(p => p.status === 'Pending')
      .reduce((sum, payout) => sum + payout.total_amount, 0);

    return {
      totalClicks,
      totalConversions,
      conversionRate,
      totalEarnings,
      pendingEarnings
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
              <h1 className="text-2xl font-bold text-navy-900">Affiliate Portal</h1>
              <p className="text-slate-600">
                Welcome back, {affiliate?.name || 'Affiliate Partner'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/training"
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Browse Training
              </Link>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Request Payout
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
                { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
                { id: 'links', name: 'Tracking Links', icon: MousePointer },
                { id: 'payouts', name: 'Payouts', icon: DollarSign },
                { id: 'resources', name: 'Resources', icon: Download }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Clicks</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalClicks.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Conversions</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalConversions}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.conversionRate.toFixed(1)}%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-slate-900">₹{stats.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pending Payout</p>
                    <p className="text-2xl font-bold text-slate-900">₹{stats.pendingEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Commission Structure */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Commission Structure</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">SaaS Subscriptions</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {affiliate?.commission_saas_percent || 12}%
                    </div>
                    <p className="text-sm text-blue-700">
                      Recurring for first 12 months
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-semibold text-emerald-900 mb-2">Training Sales</h3>
                    <div className="text-2xl font-bold text-emerald-600 mb-2">
                      {affiliate?.commission_training_percent || 18}%
                    </div>
                    <p className="text-sm text-emerald-700">
                      Per training seat sold
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-2">Lead Bounties</h3>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      ₹{affiliate?.lead_bounty_amount?.toLocaleString() || '750'}
                    </div>
                    <p className="text-sm text-orange-700">
                      Per qualified RFQ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                {events.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No activity yet</h3>
                    <p className="text-slate-600">Start promoting your tracking links to see activity here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.slice(0, 10).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900 capitalize">
                            {event.event_type.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-slate-600">
                            {new Date(event.created_at).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">
                            User: {event.user_identifier}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tracking Links Tab */}
        {activeTab === 'links' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy-900">Your Tracking Links</h2>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Create New Link
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {links.map((link) => (
                    <div key={link.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{link.link_code}</h3>
                          <p className="text-sm text-slate-600 capitalize">
                            {link.target_type} • {link.utm_campaign.replace('_', ' ')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {link.clicks} clicks
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm">
                            {link.conversions} conversions
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <code className="text-sm text-slate-700 font-mono">
                            {generateTrackingUrl(link.link_code)}
                          </code>
                          <button
                            onClick={() => copyToClipboard(generateTrackingUrl(link.link_code))}
                            className="text-orange-600 hover:text-orange-700 p-1"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Source:</span>
                          <span className="ml-1 text-slate-700">{link.utm_source}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Medium:</span>
                          <span className="ml-1 text-slate-700">{link.utm_medium}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Campaign:</span>
                          <span className="ml-1 text-slate-700">{link.utm_campaign}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payouts Tab */}
        {activeTab === 'payouts' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Payout History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        SaaS Commission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Training Commission
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Lead Bounties
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {payouts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-slate-900 mb-2">No payouts yet</h3>
                          <p className="text-slate-600">Your first payout will appear here once you earn commissions</p>
                        </td>
                      </tr>
                    ) : (
                      payouts.map((payout) => (
                        <tr key={payout.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">
                              {new Date(payout.period_start).toLocaleDateString('en-IN')} - {' '}
                              {new Date(payout.period_end).toLocaleDateString('en-IN')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">₹{payout.saas_commission.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">₹{payout.training_commission.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-900">₹{payout.lead_bounties.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">₹{payout.total_amount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              payout.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                              payout.status === 'Processed' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payout.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-navy-900">Marketing Resources</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Commission Structure Guide</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Detailed breakdown of commission rates and payout terms
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Download PDF
                    </button>
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Marketing Materials</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Banners, email templates, and social media content
                    </p>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Download Kit
                    </button>
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Course Catalog</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Complete training catalog with pricing and descriptions
                    </p>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Download Catalog
                    </button>
                  </div>
                  
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Affiliate Agreement</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Terms and conditions for affiliate partnership
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Agreement
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Overview */}
            <div className="bg-gradient-to-r from-navy-900 to-slate-800 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">{onboardingData.overview.title}</h2>
              <p className="text-slate-200 mb-6">{onboardingData.overview.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Program Benefits</h3>
                  <ul className="space-y-2">
                    {onboardingData.overview.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-orange-400" />
                        <span className="text-slate-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Payout Terms</h3>
                  <div className="space-y-2 text-sm text-slate-200">
                    <p><strong>Frequency:</strong> {onboardingData.payoutTerms.frequency}</p>
                    <p><strong>Minimum:</strong> {onboardingData.payoutTerms.minimumPayout}</p>
                    <p><strong>Timeline:</strong> {onboardingData.payoutTerms.timeline}</p>
                    <p><strong>Methods:</strong> {onboardingData.payoutTerms.paymentMethods.join(', ')}</p>
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

export default AffiliatePortal;