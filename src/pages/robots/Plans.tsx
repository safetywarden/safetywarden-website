import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Plus } from 'lucide-react';
import { robotPlans } from '../../data/robots';
import SEOHead from '../../components/SEO/SEOHead';

const Plans: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Robot Surveillance Plans & Features | SafetyWarden"
        description="Choose Starter or Pro robot surveillance plans. Add optional modules to fit your site. All plans are rental (RaaS) with service included."
        keywords="robot surveillance plans, security robot rental, fire robot service plans"
        canonicalUrl="https://safetywarden.com/plans"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Plans & What's Included
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Choose Starter or Pro. Add optional modules to fit your site. 
              All plans are rental (RaaS) with service included.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {robotPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                plan.name === 'Pro' ? 'ring-2 ring-blue-500 scale-105' : 'border border-slate-200'
              }`}>
                {plan.name === 'Pro' && (
                  <div className="bg-blue-500 text-white text-center py-3 font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      Custom Quote
                    </div>
                    <p className="text-slate-500 text-sm">Pricing depends on site requirements</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.addOns && (
                    <div className="mb-8 pt-6 border-t border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Available Add-ons</span>
                      </h4>
                      <ul className="space-y-2">
                        {plan.addOns.map((addon, addonIndex) => (
                          <li key={addonIndex} className="text-sm text-slate-600">
                            • {addon}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Link
                    to="/book-demo"
                    className={`block w-full py-3 px-4 rounded-xl font-semibold text-center transition-colors ${
                      plan.name === 'Pro'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    Get a Custom Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Custom Pricing Notice</h3>
            <p className="text-blue-800 mb-6">
              Pricing depends on coverage, patrol hours, workflows, integrations, SLA, and retention.
            </p>
            <Link
              to="/book-demo"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;