import React, { useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { QuoteFormData } from '../../types/robots';
import SEOHead from '../../components/SEO/SEOHead';

const BookDemo: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    company: '',
    city: '',
    siteType: '',
    areaToCover: '',
    patrolHours: '',
    primaryGoal: '',
    existingSystems: '',
    timeline: '',
    contactName: '',
    email: '',
    whatsappNumber: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Quote Request Submitted!</h1>
          <p className="text-slate-600 mb-6">
            Thank you for your interest in robot surveillance. We'll send you a tailored quote within 1 business day.
          </p>
          <p className="text-sm text-slate-500">
            Check your email for confirmation and next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEOHead
        title="Get a Custom Quote - Robot Surveillance | SafetyWarden"
        description="Tell us about your site and get a tailored robot surveillance quote within 1 business day. Custom pricing for Warden-S and Warden-F robots."
        keywords="robot surveillance quote, security robot pricing, fire robot quote, custom surveillance solution"
        canonicalUrl="https://safetywarden.com/book-demo"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get a Custom Quote
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Tell us about your site. We'll send a tailored quote within 1 business day.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Site Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="siteType" className="block text-sm font-medium text-slate-700 mb-2">
                    Site Type *
                  </label>
                  <select
                    id="siteType"
                    name="siteType"
                    required
                    value={formData.siteType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select site type</option>
                    <option value="Factory">Factory</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Campus">Campus</option>
                    <option value="Mall">Mall</option>
                    <option value="Data center">Data Center</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="areaToCover" className="block text-sm font-medium text-slate-700 mb-2">
                    Area to Cover *
                  </label>
                  <input
                    type="text"
                    id="areaToCover"
                    name="areaToCover"
                    required
                    value={formData.areaToCover}
                    onChange={handleChange}
                    placeholder="e.g., 5 acres or 50,000 sq ft"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="patrolHours" className="block text-sm font-medium text-slate-700 mb-2">
                    Patrol Hours *
                  </label>
                  <select
                    id="patrolHours"
                    name="patrolHours"
                    required
                    value={formData.patrolHours}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select patrol hours</option>
                    <option value="8×5">8×5 (Business hours)</option>
                    <option value="16×6">16×6 (Extended hours)</option>
                    <option value="24×7">24×7 (Round the clock)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="primaryGoal" className="block text-sm font-medium text-slate-700 mb-2">
                    Primary Goal *
                  </label>
                  <select
                    id="primaryGoal"
                    name="primaryGoal"
                    required
                    value={formData.primaryGoal}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select primary goal</option>
                    <option value="Safety & PPE — Warden-S">Safety & PPE — Warden-S</option>
                    <option value="Fire/Thermal — Warden-F">Fire/Thermal — Warden-F</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="existingSystems" className="block text-sm font-medium text-slate-700 mb-2">
                  Existing Systems (Optional)
                </label>
                <input
                  type="text"
                  id="existingSystems"
                  name="existingSystems"
                  value={formData.existingSystems}
                  onChange={handleChange}
                  placeholder="VMS type; BMS/FACP brand"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-slate-700 mb-2">
                  Timeline *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  required
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select timeline</option>
                  <option value="Now">Now</option>
                  <option value="1–3 months">1–3 months</option>
                  <option value="3–6 months">3–6 months</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-slate-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="whatsappNumber" className="block text-sm font-medium text-slate-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    required
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="consent" className="text-sm text-slate-600">
                  I agree to the Terms & Conditions and Privacy Policy. I consent to receive communications about SafetyWarden robot surveillance services. *
                </label>
              </div>

              {/* Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-blue-800 text-sm">
                    <strong>Pricing is custom per site.</strong> We'll reply within 1 business day with a detailed quote based on your requirements.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Quote Request...' : 'Get My Custom Quote'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDemo;