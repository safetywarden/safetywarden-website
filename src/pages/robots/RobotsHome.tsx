import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Flame, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import SEOHead from '../../components/SEO/SEOHead';
import StructuredData from '../../components/SEO/StructuredData';

const RobotsHome: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SafetyWarden",
    "url": "https://safetywarden.com",
    "logo": "/assets/images/icon.png"
  };

  return (
    <div>
      <SEOHead
        title="Safety & Fire Robots - Monthly Rental, Zero Capex | SafetyWarden"
        description="Deploy Warden-S for safety & PPE surveillance, or Warden-F for thermal fire surveillance. Monthly rental with full service included."
        keywords="safety robots, fire surveillance robots, PPE compliance automation, thermal monitoring, security robots rental"
        canonicalUrl="https://safetywarden.com/robots"
      />
      
      <StructuredData data={organizationSchema} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Safety & Fire Robots.{' '}
              <span className="text-orange-400">Monthly Rental.</span>{' '}
              Zero Capex.
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              Deploy Warden-S for safety & PPE surveillance, or Warden-F for thermal fire surveillance. 
              We handle hardware, mapping, updates, and service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/book-demo"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get a Custom Quote
              </Link>
              <Link
                to="/how-it-works"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                See How It Works
              </Link>
              <Link
                to="/plans"
                className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Plans (No Pricing)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Warden-S Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="w-full h-64 bg-slate-100 rounded-xl mb-6 flex items-center justify-center">
                  <img 
                    src="/assets/images/warden_security_rover.png" 
                    alt="Warden-S Safety & PPE Surveillance Robot"
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Warden-S</h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Safety & PPE
                  </span>
                </div>
                
                <p className="text-lg text-slate-600 mb-6">
                  PPE gate checks, floor spot-checks, safety surveillance with talk-down.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg text-sm font-medium">
                    +15–25% PPE compliance
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-2 rounded-lg text-sm font-medium">
                    Time-to-correct ↓ ≥30%
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium">
                    False positives ≤10%
                  </span>
                </div>
                
                <Link
                  to="/robots/warden-s"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-center transition-colors"
                >
                  Learn More About Warden-S
                </Link>
              </div>
            </div>

            {/* Warden-F Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-8">
                <div className="w-full h-64 bg-slate-100 rounded-xl mb-6 flex items-center justify-center">
                  <img 
                    src="/assets/images/warden_fire_rover.png" 
                    alt="Warden-F Fire & Thermal Surveillance Robot"
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <Flame className="h-8 w-8 text-orange-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Warden-F</h2>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    Fire/Thermal
                  </span>
                </div>
                
                <p className="text-lg text-slate-600 mb-6">
                  Thermal hot-spot detection, hot-work watch, alarm verification.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg text-sm font-medium">
                    &gt;80% human-confirm
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                    Faster repair lead time
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium">
                    Better drill metrics
                  </span>
                </div>
                
                <Link
                  to="/robots/warden-f"
                  className="block w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-semibold text-center transition-colors"
                >
                  Learn More About Warden-F
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Robot Surveillance?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Consistent monitoring, verifiable evidence, and reduced human workload
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Consistent Coverage</h3>
              <p className="text-slate-600">
                24/7 monitoring without fatigue, breaks, or human error. Reliable patrol schedules.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Verifiable Evidence</h3>
              <p className="text-slate-600">
                Timestamped video evidence with GPS coordinates for compliance and incident investigation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reduced Workload</h3>
              <p className="text-slate-600">
                Free up human resources for higher-value tasks while maintaining safety standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Deploy Robot Surveillance?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a custom quote tailored to your site requirements and coverage needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-demo"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Get a Custom Quote
            </Link>
            <Link
              to="/plans"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RobotsHome;