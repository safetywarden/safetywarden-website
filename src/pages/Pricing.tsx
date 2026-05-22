import React, { useState } from 'react';
import { Check, IndianRupee, DollarSign, Star } from 'lucide-react';
import { pricingTiers, trainingPacks, outsourcingPricing } from '../data/pricing';
import SEOHead from '../components/SEO/SEOHead';
import { seoPages } from '../utils/seo';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const formatPrice = (price: number) => {
    if (price === 0) return 'Custom';
    
    const finalPrice = isAnnual ? Math.floor(price * 10) : price; // 17% discount for annual
    
    if (currency === 'INR') {
      return `₹${finalPrice.toLocaleString()}`;
    } else {
      const usdPrice = Math.floor(finalPrice / 80); // Rough conversion
      return `$${usdPrice.toLocaleString()}`;
    }
  };

  const formatTrainingPrice = (priceINR: number, priceUSD: number) => {
    const price = currency === 'INR' ? priceINR : priceUSD;
    const symbol = currency === 'INR' ? '₹' : '$';
    return `${symbol}${price.toLocaleString()}`;
  };

  return (
    <div className="py-12">
      <SEOHead
        title={seoPages.pricing.title}
        description={seoPages.pricing.description}
        keywords={seoPages.pricing.keywords}
        canonicalUrl="https://safetywarden.com/pricing"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Choose the plan that fits your organization's size and requirements. 
              All plans include comprehensive support and regular updates.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Toggle Controls */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            {/* Currency Toggle */}
            <div className="flex items-center space-x-3">
              <span className="text-slate-700 font-medium">Region:</span>
              <div className="flex bg-white rounded-lg p-1 border shadow-sm">
                <button
                  onClick={() => setCurrency('INR')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currency === 'INR'
                      ? 'bg-navy-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IndianRupee className="h-4 w-4" />
                  <span>India</span>
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currency === 'USD'
                      ? 'bg-navy-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <DollarSign className="h-4 w-4" />
                  <span>GCC</span>
                </button>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center space-x-4">
              <span className="text-slate-700 font-medium">Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-orange-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-slate-700 font-medium">
                Annual
                <span className="ml-1 text-sm text-emerald-600 font-semibold">
                  (Save 17%)
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  tier.popular ? 'ring-2 ring-orange-500 scale-105' : 'border border-slate-200'
                }`}
              >
                {tier.popular && (
                  <div className="bg-orange-500 text-white text-center py-3 font-semibold flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">{tier.name}</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-navy-900">
                        {formatPrice(tier.price)}
                      </span>
                      {tier.price > 0 && (
                        <span className="text-slate-500 ml-2">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {tier.price === 0 && (
                      <p className="text-slate-500 text-sm mt-1">Contact us for custom pricing</p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-center transition-colors ${
                      tier.popular
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Packs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Training Packs (Add-on)</h2>
            <p className="text-xl text-slate-600">
              Professional warden training with certificates - volume discounts available
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingPacks.map((pack, index) => (
              <div key={index} className={`text-center p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                pack.popular ? 'border-2 border-orange-500 bg-orange-50' : 'border-slate-200 bg-slate-50'
              }`}>
                {pack.popular && (
                  <div className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-navy-900 mb-2">{pack.name}</h3>
                <div className={`text-3xl font-bold mb-2 ${pack.popular ? 'text-orange-600' : 'text-navy-600'}`}>
                  {formatTrainingPrice(pack.priceINR, pack.priceUSD)}
                </div>
                <p className="text-slate-500 text-sm mb-2">{pack.trainees} trainees included</p>
                <p className="text-slate-600 text-sm mb-6">
                  {currency === 'INR' ? `₹${pack.perTraineeINR}` : `$${pack.perTraineeUSD}`} per trainee
                </p>
                
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  pack.popular 
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-navy-900 text-white hover:bg-navy-800'
                }`}>
                  Enroll Team
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outsourcing Pricing */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Safety Warden Outsourcing
            </h2>
            <p className="text-xl text-slate-600">
              Professional warden services with flexible coverage options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outsourcingPricing.map((service, index) => (
              <div key={index} className={`bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-lg ${
                service.popular ? 'border-2 border-orange-500' : 'border border-slate-200'
              }`}>
                {service.popular && (
                  <div className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    RECOMMENDED
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-navy-900 mb-2">{service.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                
                <div className={`text-3xl font-bold mb-4 ${service.popular ? 'text-orange-600' : 'text-navy-600'}`}>
                  {service.priceINR === 0 ? 'Custom' : formatTrainingPrice(service.priceINR, service.priceUSD)}
                  <span className="text-lg font-normal text-slate-500 block">{service.period}</span>
                </div>
                
                <ul className="space-y-2 text-sm text-slate-600 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <span className="text-emerald-600">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  service.popular 
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                }`}>
                  {service.priceINR === 0 ? 'Request Quote' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">
            Pricing FAQ
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                Can we switch between monthly and annual billing?
              </h3>
              <p className="text-slate-600">
                Yes, you can upgrade to annual billing at any time to get the 17% discount. 
                Downgrades will take effect at your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                What happens if we exceed our user limits?
              </h3>
              <p className="text-slate-600">
                We'll notify you when you approach 80% of your limit. Additional users can be 
                added at pro-rated rates, or you can upgrade to the next tier.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                Is there a setup fee?
              </h3>
              <p className="text-slate-600">
                No setup fees for Starter and Growth plans. Enterprise implementations may 
                include one-time setup costs for custom integrations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                Do you offer discounts for multi-year contracts?
              </h3>
              <p className="text-slate-600">
                Yes, we offer additional discounts for 2-year and 3-year commitments. 
                Contact our sales team for custom pricing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600">
                For training packs: UPI, Net Banking, and credit cards. For subscriptions and outsourcing: 
                Invoice-based billing with NET-30 payment terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Try SafetyWarden risk-free with our 30-day money-back guarantee
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;