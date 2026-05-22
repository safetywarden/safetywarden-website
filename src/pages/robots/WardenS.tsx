import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { wardenSTechSpecs, wardenSFeatures, wardenSRoles, rentalIncludes } from '../../data/robots';
import SEOHead from '../../components/SEO/SEOHead';
import StructuredData from '../../components/SEO/StructuredData';

const WardenS: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Warden-S — Safety & PPE Surveillance Robot (Rental)",
    "brand": {
      "@type": "Brand",
      "name": "SafetyWarden"
    },
    "description": "Automated PPE compliance monitoring and safety surveillance robot for industrial facilities",
    "image": "/assets/images/warden_security_rover.png",
    "category": "Safety Equipment",
    "manufacturer": {
      "@type": "Organization",
      "name": "SafetyWarden"
    }
  };

  return (
    <div>
      <SEOHead
        title="Warden-S Safety & PPE Surveillance Robot | SafetyWarden"
        description="Automate PPE checks at gates and spot-check floors without friction. Prompt, notify, and log — privacy-first and policy-driven."
        keywords="PPE surveillance robot, safety compliance automation, gate screening robot, industrial safety monitoring"
        canonicalUrl="https://safetywarden.com/robots/warden-s"
      />
      
      <StructuredData data={productSchema} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/robots"
              className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Robots</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-10 w-10 text-blue-400" />
                <h1 className="text-4xl md:text-5xl font-bold">Warden-S</h1>
                <span className="bg-blue-600/30 text-blue-200 px-4 py-2 rounded-full text-lg font-medium">
                  Safety & PPE Surveillance
                </span>
              </div>
              
              <p className="text-xl text-blue-100 mb-8">
                Automate PPE checks at gates and spot-check floors without friction. 
                Prompt, notify, and log — privacy-first and policy-driven.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book-demo"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  Get a Custom Quote
                </Link>
                <Link
                  to="/plans"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  See Plans
                </Link>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <img 
                src="/assets/images/warden_security_rover.png" 
                alt="Warden-S Safety & PPE Surveillance Robot in industrial setting"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What It Does */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">What It Does</h2>
              <div className="space-y-4">
                {wardenSFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Roles & Responsibilities</h2>
              <div className="space-y-4">
                {wardenSRoles.map((role, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Technical Specifications</h2>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Component</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {wardenSTechSpecs.map((spec, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{spec.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{spec.specification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">What's Included (Rental)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {rentalIncludes.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Custom Pricing</h3>
                  <p className="text-blue-800 text-sm">
                    Pricing is custom per site. Share details to receive a quote within 1 business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Deploy Warden-S?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a custom quote and site assessment for your facility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-demo"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Get a Custom Quote
            </Link>
            <Link
              to="/how-it-works"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book a Site Survey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WardenS;