import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateLocalBusinessSchema, seoPages } from '../utils/seo';
import { trackPhoneCall, trackWhatsAppClick } from '../utils/analytics';

const Contact: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    window.open('https://wa.me/918341339444?text=Hi, I want to learn more about SafetyWarden.com', '_blank');
  };

  const handleCalendlyClick = () => {
    // In a real implementation, this would open Calendly
    alert('Calendly integration would open here for booking a 20-minute demo call');
  };

  return (
    <div className="py-12">
      <SEOHead
        title={seoPages.contact.title}
        description={seoPages.contact.description}
        keywords={seoPages.contact.keywords}
        canonicalUrl="https://safetywarden.com/contact"
      />
      
      <StructuredData data={generateLocalBusinessSchema()} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Ready to transform your safety compliance? Our team is here to help you
              choose the right solutions for your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-600 text-sm mb-4">Speak with our experts</p>
              <a
                href="tel:+918341339444"
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={trackPhoneCall}
              >
                +91 83413 39444
              </a>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">WhatsApp</h3>
              <p className="text-slate-600 text-sm mb-4">Quick chat support</p>
              <button
                onClick={handleWhatsAppClick}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Chat Now
              </button>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Book a Call</h3>
              <p className="text-slate-600 text-sm mb-4">20-minute demo</p>
              <button
                onClick={handleCalendlyClick}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Schedule Now
              </button>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-600 text-sm mb-4">Detailed inquiries</p>
              <a
                href="mailto:hello@safetywarden.com"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                hello@safetywarden.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Office Info */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <LeadForm
                title="Send Us a Message"
                subtitle="Tell us about your safety requirements and we'll get back to you within 24 hours"
                ctaText="Send Message"
                showBookDemo={true}
              />
            </div>
            {/* Office Information */}
            <div className="space-y-8">
              {/* Offices */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Offices</h3>

                <div className="space-y-6">
                  {/* India Office */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">India Office</h4>
                        <p className="text-slate-600 mb-4">
                          Manipal County Road
                          <br />
                          Bangalore - 560068
                          <br />
                          Karnataka, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Mon–Fri: 9 AM – 6 PM IST</span>
                      </div>
                    </div>
                  </div>

                  {/* Singapore Office */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">Singapore Office</h4>
                        <p className="text-slate-600 mb-4">
                          BCONZ INTERNATIONAL PTE LTD
                          <br />
                          #06-53 Paya Lebar Square
                          <br />
                          60 Paya Lebar Road
                          <br />
                          Singapore 409051
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Mon–Fri: 9 AM – 6 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Coverage */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Service Coverage</h3>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">India</h4>
                      <ul className="space-y-1 text-slate-600">
                        <li>Bengaluru</li>
                        <li>Mumbai</li>
                        <li>Delhi NCR</li>
                        <li>Chennai</li>
                        <li>Hyderabad</li>
                        <li>Pune</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">GCC Region &amp; Singapore</h4>
                      <ul className="space-y-1 text-slate-600">
                        <li>UAE</li>
                        <li>Singapore</li>
                        <li>Riyadh, Saudi Arabia</li>
                        <li>Kuwait City</li>
                        <li>Doha, Qatar</li>
                        <li>Muscat, Oman</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Support Hours</h3>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email Support:</span>
                      <span className="text-slate-900 font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phone Support:</span>
                      <span className="text-slate-900 font-medium">9 AM – 6 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">WhatsApp: +91 83413 39444</span>
                      <span className="text-slate-900 font-medium">9 AM – 9 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Emergency Support:</span>
                      <span className="text-slate-900 font-medium">Enterprise only</span>
                    </div>
                  </div>
                </div>
              </div>
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
            Join hundreds of organizations that trust SafetyWarden for their safety compliance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              Start Free Trial
            </button>
            <button 
              onClick={handleCalendlyClick}
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Book Demo Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;