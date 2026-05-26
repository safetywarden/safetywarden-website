import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Factory, Warehouse, Heart, GraduationCap, ShoppingCart, Hotel, Building } from 'lucide-react';
import { industries } from '../data/industries';
import LeadForm from '../components/LeadForm';
import SEOHead from '../components/SEO/SEOHead';
import { seoPages } from '../utils/seo';

const iconMap = {
  'it-parks': Building2,
  'manufacturing': Factory,
  'warehousing': Warehouse,
  'healthcare': Heart,
  'education': GraduationCap,
  'retail-malls': ShoppingCart,
  'hospitality': Hotel,
  'high-rises': Building
};

const Industries: React.FC = () => {
  return (
    <div className="py-12">
      <SEOHead
        title={seoPages.industries.title}
        description={seoPages.industries.description}
        keywords={seoPages.industries.keywords}
        canonicalUrl="https://www.safetywarden.com/industries"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Industry-Specific Safety Solutions
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Tailored compliance solutions that understand your industry's unique challenges, 
              regulations, and operational requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry) => {
              const IconComponent = iconMap[industry.id as keyof typeof iconMap];
              
              return (
                <div key={industry.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-navy-100 to-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-navy-600" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-navy-900 mb-3">
                      {industry.name}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                      {industry.description}
                    </p>
                    
                    <div className="text-xs text-slate-500 mb-4">
                      <strong>Key Challenges:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {industry.painPoints.slice(0, 2).map((point, index) => (
                          <li key={index} className="line-clamp-1">{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Get Industry Brief
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Industry Sections */}
      {industries.map((industry, index) => {
        const IconComponent = iconMap[industry.id as keyof typeof iconMap];
        
        return (
          <section key={industry.id} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-navy-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy-900">{industry.name}</h2>
                  </div>
                  
                  <p className="text-slate-600 mb-6">{industry.description}</p>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">{industry.caseStudy.title}</h4>
                    <p className="text-sm text-orange-700">{industry.caseStudy.metrics}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">Pain Points We Address</h3>
                  <ul className="space-y-2">
                    {industry.painPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">Tailored Features</h3>
                  <ul className="space-y-2 mb-6">
                    {industry.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full">
                    Get Industry Brief (PDF)
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See How We Serve Your Industry?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get a customized demo focused on your industry's specific requirements and challenges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Request Industry Demo
            </Link>
            <Link
              to="/solutions"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Explore All Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadForm
            title="Get Your Industry-Specific Brief"
            subtitle="Tell us about your industry requirements and we'll send you a customized brief with relevant case studies"
            ctaText="Send Industry Brief"
            showBookDemo={true}
          />
        </div>
      </section>
    </div>
  );
};

export default Industries;
