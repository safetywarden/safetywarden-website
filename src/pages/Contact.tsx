import React from 'react';
import { Calendar, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateLocalBusinessSchema, seoPages } from '../utils/seo';
import { trackPhoneCall, trackWhatsAppClick } from '../utils/analytics';
import { emailLink, meetLink, whatsappLink } from '../utils/directOutreach';

const contactCards = [
  {
    title: 'Schedule a Founder-Led Demo',
    description: 'Book a focused discussion to review your audit, ESG/BRSR, CAPA or inspection-readiness workflows.',
    href: meetLink,
    cta: 'Schedule Google Meet',
    icon: Calendar,
    tone: 'border-orange-200 bg-orange-50 text-orange-700',
  },
  {
    title: 'Speak Directly',
    description: 'For quick pilot discussions, WhatsApp is available for direct coordination.',
    href: whatsappLink,
    cta: 'Continue on WhatsApp',
    icon: MessageCircle,
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    onClick: trackWhatsAppClick,
  },
  {
    title: 'Email SafetyWarden',
    description: 'Send your requirement, pilot interest or compliance digitization query.',
    href: emailLink,
    cta: 'Email hello@safetywarden.com',
    icon: Mail,
    tone: 'border-blue-200 bg-blue-50 text-blue-700',
  },
];

const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOHead
        title={seoPages.contact.title}
        description={seoPages.contact.description}
        keywords={seoPages.contact.keywords}
        canonicalUrl="https://safetywarden.com/contact"
      />

      <StructuredData data={generateLocalBusinessSchema()} />

      <section className="bg-slate-950 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300 mb-4">
              Founder-led pilot discussion
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Let&apos;s Discuss Your Compliance Operations.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl">
              Connect with SafetyWarden to explore audit digitization, ESG/BRSR governance, inspection readiness and operational compliance workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="flex h-full flex-col border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className={`mb-6 flex h-11 w-11 items-center justify-center border ${card.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-950 mb-3">{card.title}</h2>
                  <p className="text-slate-600 mb-7 leading-relaxed">{card.description}</p>
                  <a
                    href={card.href}
                    onClick={card.onClick}
                    target={card.href.startsWith('https://') ? '_blank' : undefined}
                    rel={card.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                    className="mt-auto inline-flex w-full items-center justify-center bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                  >
                    {card.cta}
                  </a>
                </article>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="border border-slate-200 bg-slate-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-950 mb-4">Pilot-Stage Operational Discovery</h2>
              <p className="text-slate-700 leading-relaxed">
                Founder-led conversations are used during the pilot stage to understand site-level compliance operations, audit workflows and reporting expectations before recommending a deployment path.
              </p>
            </div>
            <div className="border border-slate-200 bg-slate-950 p-6 md:p-8 text-white">
              <h2 className="text-lg font-semibold mb-2">Response Expectation</h2>
              <p className="text-slate-300">Typical response time: within 1 business day.</p>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 border border-slate-200 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-slate-950 mb-1">Phone</h2>
                  <a href="tel:+918341339444" onClick={trackPhoneCall} className="text-slate-700 hover:text-orange-700">
                    +91 83413 39444
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-slate-950 mb-1">Email</h2>
                  <a
                    href={emailLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-orange-700"
                  >
                    hello@safetywarden.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-slate-950 mb-1">Operations</h2>
                  <p className="text-slate-700">India, GCC Region and Singapore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 lg:max-w-2xl">
              <h2 className="text-2xl font-bold text-slate-950 mb-6">India Office</h2>
              <p className="text-slate-600">
                Manipal County Road
                <br />
                Bangalore - 560068
                <br />
                Karnataka, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
