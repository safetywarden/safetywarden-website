import React from 'react';
import { ArrowRight, ClipboardCheck, Database, Eye, FileSearch, Layers, Map, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import { seoPages } from '../utils/seo';

const industryProblems = [
  {
    title: 'Fragmented compliance systems',
    description: 'Audits, permits, inspections, evidence and corrective actions often sit across disconnected tools, folders and teams.'
  },
  {
    title: 'Spreadsheet-driven audits',
    description: 'Manual trackers make ownership, scoring, recurring findings and closure status difficult to govern across sites.'
  },
  {
    title: 'Disconnected evidence',
    description: 'Photos, documents, observations and approvals lose context when they are not linked to controls, findings and reports.'
  },
  {
    title: 'Reactive CAPA workflows',
    description: 'Corrective actions become follow-up lists instead of governed workflows with owners, due dates, verification and closure quality.'
  },
  {
    title: 'Limited governance visibility',
    description: 'Leadership teams need a reliable view of risk, readiness and accountability before audits and regulatory reviews.'
  },
  {
    title: 'Audit readiness challenges',
    description: 'Inspection preparation becomes effort-heavy when operating records are not continuously organized for review.'
  }
];

const platformModules = [
  'Audits & Inspections',
  'Findings & CAPA',
  'ESG/BRSR Reporting',
  'Environmental Consents',
  'Evidence Capture',
  'Governance Reporting',
  'Multi-site Visibility'
];

const philosophyItems = [
  {
    icon: ClipboardCheck,
    title: 'Continuous compliance workflows',
    description: 'Move from periodic preparation to repeatable inspection, review, escalation and closure routines.'
  },
  {
    icon: FileSearch,
    title: 'Audit intelligence',
    description: 'Connect findings, controls, standards and evidence so audit outcomes become operational intelligence.'
  },
  {
    icon: Database,
    title: 'Evidence traceability',
    description: 'Preserve the link between field observations, records, source documents, owners and reporting outputs.'
  },
  {
    icon: Eye,
    title: 'Corrective action visibility',
    description: 'Track CAPA ownership, aging, verification and recurring issues across teams, assets and locations.'
  }
];

const industries = [
  'Manufacturing',
  'Infrastructure',
  'Industrial operations',
  'Utilities',
  'Engineering environments',
  'Energy and process sites',
  'Warehousing and logistics',
  'Large multi-site enterprises'
];

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      <SEOHead
        title={seoPages.about.title}
        description={seoPages.about.description}
        keywords={seoPages.about.keywords}
        canonicalUrl="https://safetywarden.com/about"
      />

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
              About SafetyWarden
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Built for Operational Compliance Governance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              SafetyWarden helps industrial and infrastructure organizations digitize audits, inspections, evidence, CAPA and ESG/BRSR governance into one operational compliance platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/features"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
              >
                View Platform
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-slate-950"
              >
                Talk to SafetyWarden
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/90 p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-sm font-semibold text-white">Governance architecture</p>
                <p className="text-xs text-slate-400">Audit workflow to evidence-backed reporting</p>
              </div>
              <ShieldCheck className="h-6 w-6 text-sky-300" />
            </div>

            <div className="mt-5 space-y-3">
              {[
                ['01', 'Plan audits and regulatory checks'],
                ['02', 'Capture field observations and evidence'],
                ['03', 'Raise findings and assign CAPA'],
                ['04', 'Verify closure and preserve traceability'],
                ['05', 'Report readiness, risk and governance status']
              ].map(([number, label]) => (
                <div key={number} className="grid grid-cols-[48px_1fr] items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-xs font-semibold text-sky-300">
                    {number}
                  </span>
                  <span className="text-sm font-semibold text-slate-100">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">Industry problem</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Compliance operations break down when execution, evidence and governance are separated.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Large operating environments need more than inspection forms. They need a governed system that keeps operational records, accountability and audit readiness connected.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industryProblems.map((problem) => (
              <div key={problem.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-950">{problem.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:items-center">
          <div className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-lg bg-slate-200">
                <img
                  src="/Profile pic.jpg"
                  alt="Shaw Alem"
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Shaw Alem</h2>
                <p className="mt-1 text-sm font-medium text-orange-700">Founder & CEO</p>
              </div>
            </div>
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-950">Domain foundation</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Fire, safety, industrial risk and compliance systems across India and GCC operating environments.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">Founder insight</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Built from operational exposure, not abstract compliance theory.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>
                SafetyWarden is shaped by 30+ years of founder experience in fire, safety, industrial risk and compliance systems, with practical exposure across India and GCC operating environments.
              </p>
              <p>
                The platform reflects a clear field insight: compliance gaps usually do not come from lack of intent. They come from disconnected execution, weak evidence control, delayed CAPA and limited governance visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">Platform philosophy</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Inspection-ready by design, not by effort.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                SafetyWarden is designed around continuous compliance workflows, audit intelligence, evidence traceability and corrective action visibility.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {philosophyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                    <Icon className="h-6 w-6 text-sky-300" />
                    <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">Platform modules</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Structured capabilities for enterprise compliance teams.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The platform connects daily execution with governance reporting so compliance leaders can manage readiness across locations, standards and functions.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {platformModules.map((module) => (
                <div key={module} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <Layers className="h-5 w-5 flex-shrink-0 text-orange-700" />
                  <span className="text-sm font-semibold text-slate-950">{module}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:items-center">
          <div className="rounded-lg border border-slate-300 bg-white p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div key={industry} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-950">
                  {industry}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">Target industries</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Designed for industrial and infrastructure compliance complexity.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              SafetyWarden supports operating environments where audits, evidence, regulatory obligations and CAPA governance need to work across sites, assets, shifts and leadership layers.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Map className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            A governance platform for operational reality.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600">
            SafetyWarden brings regulatory intelligence, audit workflows, evidence traceability and governance reporting into a system built for the way industrial compliance actually operates.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Request Demo
              <UserRoundCheck className="h-4 w-4" />
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              ESG/BRSR Governance
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
