import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, ArrowRight, CheckCircle, Building2 } from 'lucide-react';
import HireNowModal from '../../components/manpower/HireNowModal';
import SEOHead from '../../components/SEO/SEOHead';
import { seoPages } from '../../utils/seo';

const ManpowerHome: React.FC = () => {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  const services = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Temporary Staffing',
      description: 'Flexible workforce solutions for short-term projects and seasonal demands',
      features: ['Quick deployment', 'Skilled professionals', 'Flexible duration', 'Cost-effective']
    },
    {
      icon: <Building2 className="h-8 w-8 text-emerald-600" />,
      title: 'Contract-to-Hire',
      description: 'Evaluate candidates before permanent hiring with our C2H model',
      features: ['Risk-free evaluation', 'Seamless conversion', 'Reduced hiring costs', 'Quality assurance']
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: 'Permanent Placement',
      description: 'Find the right talent for long-term organizational growth',
      features: ['Thorough screening', 'Cultural fit assessment', 'Replacement guarantee', 'Post-hire support']
    }
  ];

  const sectors = [
    'Manufacturing & Industrial',
    'Healthcare & Hospitals',
    'IT Parks & Offices',
    'Logistics & Warehousing',
    'Construction & Infrastructure',
    'Retail & Hospitality'
  ];

  const roles = [
    { title: 'Safety Officers', rate: '₹25,000 - ₹45,000/month', demand: 'High' },
    { title: 'Fire Wardens', rate: '₹18,000 - ₹28,000/month', demand: 'Very High' },
    { title: 'HSE Supervisors', rate: '₹35,000 - ₹60,000/month', demand: 'High' },
    { title: 'Security Guards', rate: '₹15,000 - ₹22,000/month', demand: 'High' },
    { title: 'Housekeeping Staff', rate: '₹12,000 - ₹18,000/month', demand: 'Very High' },
    { title: 'Technical Support', rate: '₹20,000 - ₹35,000/month', demand: 'Medium' }
  ];

  const deliveryControls = [
    'Role-based screening',
    'Document verification',
    'Deployment coordination',
    'Payroll and compliance support'
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title={seoPages.manpower.title}
        description={seoPages.manpower.description}
        keywords={seoPages.manpower.keywords}
        canonicalUrl="https://safetywarden.com/manpower"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Trusted{' '}
              <span className="text-orange-400">Manpower Partner</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              Complete staffing solutions for temporary, contract-to-hire, and permanent roles. 
              From recruitment to payroll - we handle it all.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => setIsHireModalOpen(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Hire Staff Now
              </button>
              <Link
                to="/manpower/roles"
                className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Browse Roles
              </Link>
            </div>
            
            {/* Delivery Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {deliveryControls.map((control, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-semibold text-orange-300 mb-2">0{index + 1}</div>
                  <div className="text-slate-300">{control}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Complete Staffing Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From temporary assignments to permanent placements, we provide end-to-end workforce solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Roles Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Popular Roles & Rates
            </h2>
            <p className="text-xl text-slate-600">
              Competitive rates for in-demand safety and support roles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-navy-900">{role.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    role.demand === 'Very High' ? 'bg-red-100 text-red-800' :
                    role.demand === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {role.demand} Demand
                  </span>
                </div>
                <p className="text-2xl font-bold text-emerald-600 mb-4">{role.rate}</p>
                <button
                  onClick={() => setIsHireModalOpen(true)}
                  className="w-full bg-navy-900 hover:bg-navy-800 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Request Staff
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Served */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-slate-600">
              Specialized workforce solutions across diverse sectors
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-navy-600" />
                </div>
                <h3 className="font-semibold text-navy-900">{sector}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workforce Governance */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Workforce Governance
            </h2>
            <p className="text-xl text-slate-600">
              Staffing workflows designed for documentation, compliance and operational continuity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Candidate records and verification status',
              'Role requirements and deployment terms',
              'Attendance, payroll and compliance coordination',
              'Replacement and escalation workflows'
            ].map((item) => (
              <div key={item} className="bg-white rounded-xl p-8 shadow-sm">
                <CheckCircle className="h-6 w-6 text-orange-600 mb-4" />
                <p className="font-semibold text-navy-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple, transparent process from requirement to deployment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Share Requirements</h3>
              <p className="text-slate-600">
                Tell us your staffing needs - roles, skills, duration, and location
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Candidate Screening</h3>
              <p className="text-slate-600">
                We source, screen, and shortlist qualified candidates for your review
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Quick Deployment</h3>
              <p className="text-slate-600">
                Selected candidates are onboarded and deployed to your location
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">Ongoing Support</h3>
              <p className="text-slate-600">
                We handle payroll, compliance, and provide continuous support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Scale Your Team?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Share your workforce requirements and align deployment, documentation and compliance support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsHireModalOpen(true)}
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Hiring Today
            </button>
            <Link
              to="/manpower/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Speak to Expert
            </Link>
          </div>
        </div>
      </section>

      <HireNowModal isOpen={isHireModalOpen} onClose={() => setIsHireModalOpen(false)} />
    </div>
  );
};

export default ManpowerHome;
