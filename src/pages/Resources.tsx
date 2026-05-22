import React from 'react';
import { Download, Calendar, FileText, Video, Users, TrendingUp } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateFAQSchema, seoPages } from '../utils/seo';

const Resources: React.FC = () => {
  const templates = [
    {
      title: 'Fire Safety Policy Template',
      description: 'Comprehensive policy template covering all statutory requirements',
      format: 'Google Doc / PDF',
      icon: <FileText className="h-6 w-6 text-navy-600" />
    },
    {
      title: 'Emergency Drill Log',
      description: 'Ready-to-use drill documentation and tracking template',
      format: 'Excel / PDF',
      icon: <FileText className="h-6 w-6 text-orange-600" />
    },
    {
      title: 'Incident Report Form',
      description: 'Standardized incident reporting form with root cause analysis',
      format: 'Google Doc / PDF', 
      icon: <FileText className="h-6 w-6 text-emerald-600" />
    },
    {
      title: 'Safety Warden Roster',
      description: 'Template for organizing and scheduling safety wardens',
      format: 'Excel / PDF',
      icon: <Users className="h-6 w-6 text-slate-600" />
    }
  ];

  const guides = [
    {
      title: 'NBC vs NFPA: What\'s Different for India',
      description: 'Complete guide to understanding Indian fire safety codes vs international standards',
      readTime: '15 min read'
    },
    {
      title: 'How to Pass Your Next Fire Safety Audit',
      description: 'Step-by-step preparation guide with checklists and common pitfalls to avoid',
      readTime: '12 min read'
    },
    {
      title: 'Designing an Annual Emergency Drill Calendar',
      description: 'Best practices for scheduling and conducting effective emergency drills throughout the year',
      readTime: '10 min read'
    },
    {
      title: 'Safety Warden Training: Complete Implementation Guide',
      description: 'How to set up, manage, and maintain an effective safety warden program',
      readTime: '20 min read'
    }
  ];

  const webinars = [
    {
      title: 'Fire Safety Compliance in IT Parks',
      date: 'February 15, 2024',
      time: '3:00 PM IST',
      status: 'upcoming'
    },
    {
      title: 'Emergency Drill Best Practices',
      date: 'January 18, 2024',
      time: '3:00 PM IST',
      status: 'completed'
    },
    {
      title: 'Incident Reporting & Analytics',
      date: 'December 21, 2023',
      time: '3:00 PM IST', 
      status: 'completed'
    }
  ];

  const caseStudies = [
    {
      title: 'Tech Park Achieves 100% Compliance',
      company: 'Leading IT Park, Bengaluru',
      metrics: '5,000+ employees, 70% faster evacuations, ₹2L annual savings',
      challenge: 'Managing complex multi-building evacuations',
      solution: 'Integrated drill management with real-time tracking'
    },
    {
      title: 'Hospital Implements 24/7 Safety Coverage',
      company: 'Multi-specialty Hospital, Mumbai',
      metrics: '500 beds, zero incidents, 100% audit compliance',
      challenge: 'Patient-safe evacuation procedures',
      solution: 'Professional warden outsourcing with medical protocols'
    },
    {
      title: 'Manufacturing Plant Goes Digital',
      company: 'Auto Manufacturing, Chennai',
      metrics: '3 facilities, 18 months zero incidents, 95% time savings',
      challenge: 'Multi-shift workforce training and compliance',
      solution: 'Digital training platform with multi-language support'
    }
  ];

  const faqData = [
    {
      question: "What fire safety templates are available for free download?",
      answer: "We provide free templates for fire safety policies, emergency drill logs, incident report forms, and safety warden rosters. All templates are compliant with Indian NBC and NFPA standards."
    },
    {
      question: "How often should emergency drills be conducted?",
      answer: "Emergency drills should be conducted quarterly for most facilities, with monthly drills recommended for high-risk environments like hospitals and manufacturing plants."
    },
    {
      question: "What is the difference between NBC and NFPA fire safety codes?",
      answer: "NBC (National Building Code) is India's building safety standard, while NFPA (National Fire Protection Association) provides international fire safety codes. Our platform helps you comply with both."
    }
  ];

  return (
    <div className="py-12">
      <SEOHead
        title={seoPages.resources.title}
        description={seoPages.resources.description}
        keywords={seoPages.resources.keywords}
        canonicalUrl="https://safetywarden.com/resources"
      />
      
      <StructuredData data={generateFAQSchema(faqData)} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Safety Resources & Learning Center
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Free templates, guides, webinars, and case studies to help you excel at 
              fire safety compliance and emergency preparedness.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Free Templates</h2>
            <p className="text-xl text-slate-600">
              Ready-to-use templates to jumpstart your safety compliance program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.map((template, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">{template.title}</h3>
                    <p className="text-slate-600 text-sm mb-3">{template.description}</p>
                    <p className="text-xs text-slate-500 mb-4">Available as: {template.format}</p>
                    <button className="bg-navy-900 hover:bg-navy-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download Template</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Implementation Guides</h2>
            <p className="text-xl text-slate-600">
              Detailed guides to help you implement best practices and achieve compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">{guide.title}</h3>
                    <p className="text-slate-600 text-sm mb-3">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{guide.readTime}</span>
                      <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                        Read Guide →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Monthly Webinars</h2>
            <p className="text-xl text-slate-600">
              Join our expert-led sessions on safety compliance and best practices
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {webinars.map((webinar, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Video className="h-5 w-5 text-navy-600" />
                        <h3 className="text-lg font-semibold text-navy-900">{webinar.title}</h3>
                        {webinar.status === 'upcoming' && (
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-medium">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{webinar.date}</span>
                        </span>
                        <span>{webinar.time}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      {webinar.status === 'upcoming' ? (
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                          Register Now
                        </button>
                      ) : (
                        <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors">
                          Watch Recording
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <div className="bg-navy-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Get Notified of Upcoming Webinars</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your work email"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Success Stories</h2>
            <p className="text-xl text-slate-600">
              See how organizations like yours achieved safety excellence with SafetyWarden.com
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-navy-900 mb-2">{study.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{study.company}</p>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-emerald-800">{study.metrics}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Challenge:</span>
                    <p className="text-slate-600">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Solution:</span>
                    <p className="text-slate-600">{study.solution}</p>
                  </div>
                </div>
                
                <button className="mt-4 text-navy-600 hover:text-navy-700 font-medium text-sm">
                  Read Full Case Study →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-navy-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Personalized Guidance?
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Our safety experts are ready to help you implement these best practices in your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              Book Expert Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              Download All Resources
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;