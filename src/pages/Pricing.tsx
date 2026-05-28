import React from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  GitBranch,
  Layers3,
  Mail,
  MessageCircle,
  Network,
  ShieldCheck,
  Users2
} from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import { emailLink, meetLink, whatsappLink } from '../utils/directOutreach';
import { seoPages } from '../utils/seo';

const deploymentModels = [
  {
    title: 'Pilot Deployment',
    icon: FileSearch,
    positioning:
      'Designed for organizations evaluating audit digitization, inspection readiness and operational governance workflows.',
    features: [
      'Limited workflow rollout',
      'Selected modules',
      'Founder-led onboarding',
      'Workflow alignment',
      'Pilot support',
      'Readiness review'
    ],
    cta: 'Request Pilot Discussion'
  },
  {
    title: 'Operational Rollout',
    icon: GitBranch,
    positioning:
      'For organizations operationalizing recurring audits, compliance governance and ESG/BRSR workflows across sites or departments.',
    features: [
      'Recurring audit operations',
      'CAPA workflows',
      'Governance dashboards',
      'Operational reporting',
      'Multi-user collaboration'
    ],
    cta: 'Discuss Operational Rollout'
  },
  {
    title: 'Enterprise Governance Deployment',
    icon: Network,
    positioning:
      'For large organizations requiring advanced governance structures, workflow customization and enterprise-wide compliance visibility.',
    features: [
      'Enterprise governance workflows',
      'Custom operational mapping',
      'Advanced reporting',
      'Multi-site visibility',
      'Deployment consultation'
    ],
    cta: 'Plan Governance Deployment'
  }
];

const deploymentFactors = [
  'Operational scope',
  'Number of sites',
  'Audit frequency',
  'Workflow complexity',
  'Governance requirements',
  'User roles',
  'Deployment support needs'
];

const engagementSteps = [
  'Discovery discussion',
  'Workflow alignment',
  'Pilot configuration',
  'Operational rollout',
  'Governance review',
  'Expansion planning'
];

const trustSignals = [
  {
    title: 'Founder-led onboarding',
    description: 'Early deployment alignment is guided directly around operational and governance context.',
    icon: Users2
  },
  {
    title: 'Operational workflow expertise',
    description: 'SafetyWarden is structured for audits, inspections, evidence, CAPA and ESG/BRSR workflows.',
    icon: ClipboardCheck
  },
  {
    title: 'Enterprise governance orientation',
    description: 'Engagements focus on visibility, accountability and repeatable compliance operations.',
    icon: ShieldCheck
  },
  {
    title: 'Deployment-based engagement model',
    description: 'Commercial discussions are aligned to operational scope, complexity and rollout readiness.',
    icon: Building2
  }
];

const Pricing: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white">
      <SEOHead
        title={seoPages.pricing.title}
        description={seoPages.pricing.description}
        keywords={seoPages.pricing.keywords}
        canonicalUrl="https://safetywarden.com/pricing"
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,102,0,0.16),transparent_32%),linear-gradient(135deg,#020617_0%,#0B1D39_48%,#111827_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-orange-100">
              <ShieldCheck className="h-4 w-4 text-orange-300" />
              Enterprise deployment model
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-normal text-white md:text-6xl">
              Enterprise Compliance Operations. Structured Around Your Deployment Needs.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              SafetyWarden deployments are aligned to operational complexity, audit scope, governance workflows and organizational readiness requirements.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                Discuss Pilot Deployment
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={emailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Schedule Founder-Led Discussion
              </a>
            </div>
          </div>

          <div className="self-end rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {['Audit governance', 'ESG/BRSR workflows', 'Industrial inspections', 'Enterprise onboarding'].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-slate-900/70 p-4">
                  <div className="mb-3 h-1.5 w-10 rounded-full bg-orange-500" />
                  <p className="text-sm font-semibold text-slate-100">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Engagement principle</p>
              <p className="mt-3 text-base leading-7 text-slate-200">
                Custom pricing aligned to operational scope, deployment complexity and governance requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">Deployment Models</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Engagement structures for compliance operations.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              SafetyWarden is deployed around operating reality: governance scope, audit cadence, evidence workflows, site coverage and organizational readiness.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {deploymentModels.map((model) => {
              const Icon = model.icon;
              return (
                <article key={model.title} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-navy-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">{model.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{model.positioning}</p>
                  <div className="my-6 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700">
                    Custom pricing aligned to operational scope, deployment complexity and governance requirements.
                  </div>
                  <ul className="space-y-3 text-sm text-slate-700">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center justify-center rounded-lg border border-navy-900 px-4 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white"
                  >
                    {model.cta}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-slate-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">Deployment Factors</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">Pricing follows governance reality.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Enterprise engagement is assessed through operational and governance variables, not public package tiers.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {deploymentFactors.map((factor) => (
              <div key={factor} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
                <BarChart3 className="h-5 w-5 flex-none text-orange-700" />
                <span className="text-sm font-semibold text-slate-800">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">Pilot Engagement Process</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">A consultative path from evaluation to governance scale.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {engagementSteps.map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Step {index + 1}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Trust Positioning</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Built for operational maturity and enterprise governance buying.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <Icon className="mb-5 h-6 w-6 text-orange-300" />
                  <h3 className="text-base font-bold text-white">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{signal.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">Next Discussion</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Discuss Your Compliance Operations</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              <Layers3 className="h-4 w-4" />
              Schedule Google Meet
            </a>
            <a
              href={emailLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Email SafetyWarden
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Discussion
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
