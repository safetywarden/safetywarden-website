import React from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileSearch,
  Flame,
  Leaf,
  Mail,
  MessageCircle,
  Network,
  ShieldCheck,
  Users2
} from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import { trackCtaClick, trackWhatsAppClick } from '../utils/analytics';
import { collaborationEmailLink, meetLink, whatsappLink } from '../utils/directOutreach';
import { seoPages } from '../utils/seo';

const roleGroups = [
  {
    title: 'Safety Auditors',
    icon: ShieldCheck,
    examples: [
      'Industrial safety auditors',
      'EHS professionals',
      'Fire & life safety specialists',
      'Operational compliance auditors'
    ]
  },
  {
    title: 'ESG & Sustainability Professionals',
    icon: Leaf,
    examples: [
      'ESG consultants',
      'BRSR professionals',
      'Sustainability reporting specialists'
    ]
  },
  {
    title: 'Operational Compliance Experts',
    icon: ClipboardCheck,
    examples: [
      'Factories Act practitioners',
      'Inspection professionals',
      'Governance specialists',
      'CAPA/process experts'
    ]
  },
  {
    title: 'Field Inspection Professionals',
    icon: FileSearch,
    examples: [
      'Site inspectors',
      'Infrastructure auditors',
      'Field execution specialists'
    ]
  }
];

const reasons = [
  'Help shape next-generation compliance workflows',
  'Bring operational expertise into digital governance systems',
  'Participate in real-world pilot deployments',
  'Contribute to inspection-readiness transformation'
];

const collaborationSteps = [
  'Initial discussion',
  'Domain expertise review',
  'Workflow alignment',
  'Pilot collaboration',
  'Operational feedback & refinement'
];

const backgrounds = [
  'Manufacturing',
  'Infrastructure',
  'Hospitals',
  'Fire & safety',
  'ESG/BRSR',
  'EHS operations',
  'Industrial inspections',
  'Regulatory audits'
];

const Careers: React.FC = () => {
  return (
    <div className="bg-white">
      <SEOHead
        title={seoPages.careers.title}
        description={seoPages.careers.description}
        keywords={seoPages.careers.keywords}
        canonicalUrl="https://www.safetywarden.com/careers"
      />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,102,0,0.14),transparent_30%),linear-gradient(135deg,#020617_0%,#0B1D39_52%,#111827_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-orange-100">
              <Network className="h-4 w-4 text-orange-300" />
              Professional collaboration network
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-normal md:text-6xl">
              Join the Future of Operational Compliance & Inspection Readiness
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              SafetyWarden is building enterprise-grade audit, ESG/BRSR and operational governance workflows for industries and infrastructure establishments. We are onboarding experienced auditors, compliance professionals and operational specialists to support pilot deployments and workflow validation.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={collaborationEmailLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('careers_express_interest', 'careers_hero')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                Express Interest
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick('careers_discuss_collaboration', 'careers_hero')}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Discuss Collaboration
              </a>
            </div>
          </div>

          <div className="self-end overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30">
            <img
              src="/images/optimized/compliance-dashboard-1200.webp"
              alt="SafetyWarden operational compliance dashboard"
              width={1200}
              height={675}
              className="h-64 w-full object-cover opacity-90 sm:h-80"
            />
            <div className="grid gap-4 border-t border-white/10 bg-slate-950/80 p-5 sm:grid-cols-3">
              {['Audit workflows', 'Pilot validation', 'Governance systems'].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">Who We Are Looking For</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Domain experts for pilot ecosystem participation.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              These are collaboration opportunities for experienced practitioners who understand how compliance work actually moves through sites, audits and governance reviews.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {roleGroups.map((role) => {
              const Icon = role.icon;
              return (
                <article key={role.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900">{role.title}</h3>
                  <ul className="mt-5 space-y-3 text-sm text-slate-700">
                    {role.examples.map((example) => (
                      <li key={example} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-slate-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">Why Join SafetyWarden</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Put field knowledge into operational governance systems.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              SafetyWarden is a growing enterprise compliance operations platform shaped around pilot deployments, audit governance and inspection-readiness transformation.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <BriefcaseBusiness className="mb-4 h-5 w-5 text-orange-700" />
                <p className="text-sm font-semibold leading-6 text-slate-800">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">How Collaboration Works</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Expert onboarding for governance collaboration.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {collaborationSteps.map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-base font-bold leading-6 text-navy-900">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">Ideal Backgrounds</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Experience from operationally serious environments.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {backgrounds.map((background) => (
              <div key={background} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
                <Factory className="h-5 w-5 flex-none text-orange-700" />
                <span className="text-sm font-semibold text-slate-800">{background}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Expression of Interest</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Discuss Collaboration Opportunities</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Share your domain background, pilot interest or operational expertise directly with SafetyWarden.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <a
              href={meetLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick('careers_schedule_google_meet', 'careers_contact')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              <Calendar className="h-4 w-4" />
              Schedule Google Meet
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCtaClick('careers_whatsapp_discussion', 'careers_contact');
                trackWhatsAppClick();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Discussion
            </a>
            <a
              href={collaborationEmailLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick('careers_email_safetywarden', 'careers_contact')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Email hello@safetywarden.com
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-orange-600 text-white">
              <Flame className="h-5 w-5" />
            </div>
            <p className="max-w-4xl text-lg leading-8 text-slate-200">
              SafetyWarden is being built with deep operational insight from decades of experience in industrial safety, audits and governance systems across India and the GCC.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
              Founder-led operational governance initiative
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
