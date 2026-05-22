import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';
import { onboardingSteps, rentalIncludes } from '../../data/robots';
import SEOHead from '../../components/SEO/SEOHead';

const HowItWorks: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="How Robot Surveillance Works - Onboarding Process | SafetyWarden"
        description="Learn about our 6-step onboarding process from site survey to go-live. Complete robot surveillance deployment in 10-12 weeks."
        keywords="robot surveillance onboarding, security robot deployment, fire robot installation process"
        canonicalUrl="https://safetywarden.com/how-it-works"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              From site survey to full deployment — our proven 6-step process 
              gets your robot surveillance operational in 10-12 weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {onboardingSteps.map((step, index) => (
              <div key={step.step} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{step.duration}</span>
                    </span>
                  </div>
                  <p className="text-slate-600">{step.description}</p>
                </div>
                
                {index < onboardingSteps.length - 1 && (
                  <div className="absolute left-8 mt-16 w-0.5 h-12 bg-slate-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              What's Included with Every Rental
            </h2>
            <p className="text-xl text-slate-600">
              Complete service package — no hidden costs or surprise fees
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalIncludes.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Robot Deployment?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a custom quote and begin your site survey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-demo"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Get a Custom Quote
            </Link>
            <Link
              to="/book-demo"
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

export default HowItWorks;