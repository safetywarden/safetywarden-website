import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, CheckCircle, AlertTriangle } from 'lucide-react';
import { wardenFTechSpecs, wardenFFeatures, wardenFRoles, rentalIncludes } from '../../data/robots';
import SEOHead from '../../components/SEO/SEOHead';
import StructuredData from '../../components/SEO/StructuredData';

const WardenF: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Warden-F — Fire / Thermal Surveillance Robot (Rental)",
    "brand": {
      "@type": "Brand",
      "name": "SafetyWarden"
    },
    "description": "Thermal surveillance robot for fire prevention and hot-spot detection in industrial facilities",
    "image": "/assets/images/warden_fire_rover.png",
    "category": "Fire Safety Equipment",
    "manufacturer": {
      "@type": "Organization",
      "name": "SafetyWarden"
    }
  };

  return (
    <div>
      <SEOHead
        title="Warden-F Fire & Thermal Surveillance Robot | SafetyWarden"
        description="Find hot-spots before they become fires. Thermal rounds, hot-work watch, and alarm verification — on a robot that never tires."
        keywords="thermal surveillance robot, fire detection robot, hot-spot monitoring, industrial fire prevention"
        canonicalUrl="https://safetywarden.com/robots/warden-f"
      />
      
      <StructuredData data={productSchema} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/robots"
              className="inline-flex items-center space-x-2 text-orange-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Robots</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Flame className="h-10 w-10 text-orange-400" />
                <h1 className="text-4xl md:text-5xl font-bold">Warden-F</h1>
                <span className="bg-orange-600/30 text-orange-200 px-4 py-2 rounded-full text-lg font-medium">
                  Fire/Thermal
                </span>
              </div>
              
              <p className="text-xl text-orange-100 mb-8">
                Find hot-spots before they become fires. Thermal rounds, hot-work watch, 
                and alarm verification — on a robot that never tires.
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
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  See Plans
                </Link>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <img 
                src="/assets/images/warden_fire_rover.png" 
                alt="Warden-F Fire & Thermal Surveillance Robot with thermal imaging capabilities"
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
                {wardenFFeatures.map((feature, index) => (
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
                {wardenFRoles.map((role, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Flame className="h-6 w-6 text-orange-600 mt-0.5 flex-shrink-0" />
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
                {wardenFTechSpecs.map((spec, index) => (
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
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-2">Custom Pricing</h3>
                  <p className="text-orange-800 text-sm">
                    Pricing is custom per site. Share details to receive a quote within 1 business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Deploy Warden-F?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Get a custom quote and thermal assessment for your facility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-demo"
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Get a Custom Quote
            </Link>
            <Link
              to="/how-it-works"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book a Site Survey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WardenF;