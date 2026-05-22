import React from 'react';
import { Link } from 'react-router-dom';
import { robotFAQs } from '../../data/robots';
import SEOHead from '../../components/SEO/SEOHead';
import StructuredData from '../../components/SEO/StructuredData';

const FAQ: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Will it replace my guards?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. It amplifies coverage and provides verifiable evidence; humans still decide."
        }
      },
      {
        "@type": "Question",
        "name": "Why no prices online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sites vary; we send accurate quotes in 1 business day."
        }
      },
      {
        "@type": "Question",
        "name": "How do you integrate with existing systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ONVIF/RTSP to VMS, webhooks to Teams/Slack/WhatsApp; read-only FACP/BMS (Warden-F)."
        }
      }
    ]
  };

  const categorizedFAQs = {
    general: robotFAQs.filter(faq => faq.category === 'general'),
    pricing: robotFAQs.filter(faq => faq.category === 'pricing'),
    privacy: robotFAQs.filter(faq => faq.category === 'privacy')
  };

  return (
    <div>
      <SEOHead
        title="Robot Surveillance FAQ - Common Questions | SafetyWarden"
        description="Get answers to common questions about robot surveillance, pricing, integration, and privacy. Learn how our robots work with your existing systems."
        keywords="robot surveillance FAQ, security robot questions, fire robot integration, surveillance robot privacy"
        canonicalUrl="https://safetywarden.com/faq"
      />
      
      <StructuredData data={faqSchema} />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Common questions about robot surveillance deployment, integration, and service
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* General Questions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">General Questions</h2>
            <div className="space-y-6">
              {categorizedFAQs.general.map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Questions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Pricing & Quotes</h2>
            <div className="space-y-6">
              {categorizedFAQs.pricing.map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Questions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Privacy & Data</h2>
            <div className="space-y-6">
              {categorizedFAQs.privacy.map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get personalized answers and a custom quote for your facility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-demo"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Get a Custom Quote
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;