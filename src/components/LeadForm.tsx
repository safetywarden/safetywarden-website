import React, { useState } from 'react';
import { FormData } from '../types';
import { trackFormSubmission } from '../utils/analytics';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  showBookDemo?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({
  title = 'Get Started Today',
  subtitle = 'Contact us to learn more about this solution',
  ctaText = 'Send Message',
  showBookDemo = true
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    employees: '',
    message: '',
    bookDemo: false,
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validateIndianPhone = (phone: string) => {
    const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s|-/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validateIndianPhone(formData.phone)) {
      setPhoneError('Please enter a valid Indian phone number');
      return;
    }
    setPhoneError('');
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Track form submission
    trackFormSubmission('lead_form');
    
    alert('Thank you for your interest! We\'ll contact you within 24 hours.');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      city: '',
      employees: '',
      message: '',
      bookDemo: false,
      consent: false
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear phone error when user types
    if (name === 'phone' && phoneError) {
      setPhoneError('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-navy-900 mb-2">{title}</h3>
        <p className="text-slate-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Work Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
              Phone / WhatsApp *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                phoneError ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {phoneError && (
              <p className="text-red-600 text-xs mt-1">{phoneError}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="employees" className="block text-sm font-medium text-slate-700 mb-1">
              Number of Employees
            </label>
            <select
              id="employees"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            >
              <option value="">Select range</option>
              <option value="1-50">1-50</option>
              <option value="51-200">51-200</option>
              <option value="201-1000">201-1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your safety requirements..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>
        
        {showBookDemo && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="bookDemo"
              name="bookDemo"
              checked={formData.bookDemo}
              onChange={handleChange}
              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="bookDemo" className="text-sm text-slate-700">
              Book a demo call
            </label>
          </div>
        )}
        
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
          />
          <label htmlFor="consent" className="text-sm text-slate-600">
            I agree to the Terms & Conditions and Privacy Policy. I consent to receive communications about SafetyWarden.com services. *
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? 'Sending...' : ctaText}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;