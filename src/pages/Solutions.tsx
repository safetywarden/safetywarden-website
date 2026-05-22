import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardCheck, GraduationCap, Siren, Store, AlertTriangle, Users } from 'lucide-react';
import { solutions } from '../data/solutions';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateServiceSchema, seoPages } from '../utils/seo';

const iconMap = {
  ClipboardCheck,
  GraduationCap,
  Siren,
  Store,
  AlertTriangle,
  Users
};

const Solutions: React.FC = () => {
  const servicesSchema = solutions.map(solution => 
    generateServiceSchema({
      name: solution.title,
      description: solution.description,
      url: `https://safetywarden.com/solutions/${solution.id}`,
      price: solution.pricing,
      category: 'Safety Compliance Service'
    })
  );

  return (
    <div className="py-12">
      <SEOHead
        title={seoPages.solutions.title}
        description={seoPages.solutions.description}
        keywords={seoPages.solutions.keywords}
        canonicalUrl="https://safetywarden.com/solutions"
      />
      
      <StructuredData data={servicesSchema} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Safety Solutions Suite
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              From digital audits to warden training and incident management — 
              everything you need for comprehensive safety compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => {
              const IconComponent = iconMap[solution.icon as keyof typeof iconMap];
              
              return (
                <div key={solution.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">
                      {solution.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 line-clamp-3">
                      {solution.description}
                    </p>
                    
                    {solution.pricing && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                        <p className="text-sm font-medium text-orange-800">
                          {solution.pricing}
                        </p>
                      </div>
                    )}
                    
                    <div className="space-y-2 mb-6">
                      {solution.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-slate-600">{feature}</span>
                        </div>
                      ))}
                      {solution.features.length > 3 && (
                        <p className="text-sm text-slate-500 italic">
                          +{solution.features.length - 3} more features
                        </p>
                      )}
                    </div>
                    
                    <Link
                      to={`/solutions/${solution.id}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group/link"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Why Choose SafetyWarden Solutions?
            </h2>
            <p className="text-xl text-slate-600">
              Built for Indian and GCC compliance requirements with enterprise-grade security and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Compliance Ready</h3>
              <p className="text-sm text-slate-600">
                Built for NFPA, NBC, UAE Fire Code, and Saudi Building Code requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Enterprise Scale</h3>
              <p className="text-sm text-slate-600">
                Designed for organizations with thousands of employees across multiple sites
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Siren className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-slate-600">
                Live monitoring of drills, incidents, and compliance status across all locations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/3 copy copy.png" alt="Expert Support" className="h-8 w-auto" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Expert Support</h3>
              <p className="text-sm text-slate-600">
                Dedicated support team with fire safety and compliance expertise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose the solutions that fit your organization's needs or get a custom package
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Get Custom Quote
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;