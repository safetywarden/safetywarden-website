import React from 'react';
import { ArrowRight, BarChart3, CheckCircle, ClipboardCheck, Database, FileSearch, Gauge, Layers, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateFAQSchema, seoPages } from '../utils/seo';

const challengeItems = [
  {
    title: 'Fragmented ESG data ownership',
    description: 'Sustainability inputs sit across EHS, HR, procurement, utilities, operations and finance without a controlled evidence trail.'
  },
  {
    title: 'Manual evidence collection',
    description: 'Teams chase documents, screenshots and spreadsheet extracts close to reporting deadlines instead of maintaining disclosure-ready records.'
  },
  {
    title: 'Weak audit traceability',
    description: 'Reported indicators are difficult to connect back to inspections, site observations, source records, exceptions and corrective actions.'
  },
  {
    title: 'Reactive BRSR preparation',
    description: 'BRSR responses are assembled late, with limited visibility into gaps, owner accountability and unresolved operational risk.'
  }
];

const capabilities = [
  'ESG audit workflows',
  'BRSR data collection',
  'Evidence management',
  'CAPA tracking',
  'Disclosure readiness controls',
  'Sustainability dashboards',
  'Multi-site governance',
  'Audit-linked scoring',
  'Indicator evidence linkage',
  'Reporting workflows'
];

const brsrRows = [
  ['Principle scoring', 'Map performance across BRSR principles with ownership, review status and site-level variance.'],
  ['Indicator intelligence', 'Track essential and leadership indicators through structured inputs and evidence completeness checks.'],
  ['Audit mapping', 'Connect disclosures to audit observations, inspection findings, controls and source documents.'],
  ['Reporting summaries', 'Prepare board and management-ready summaries for review, exceptions and sign-off.']
];

const dashboardMetrics = [
  { label: 'Disclosure readiness', value: '86%', tone: 'text-sky-300' },
  { label: 'Evidence completeness', value: '91%', tone: 'text-cyan-300' },
  { label: 'Open ESG CAPA', value: '37', tone: 'text-orange-300' },
  { label: 'High-risk sites', value: '08', tone: 'text-rose-300' }
];

const executiveControls = [
  'Board visibility into ESG posture',
  'Disclosure gaps and data-quality exceptions',
  'Unresolved CAPA and aging actions',
  'Site-wise risk areas and recurring findings',
  'Evidence completeness by principle and indicator',
  'Enterprise reporting control status'
];

const industries = [
  'Manufacturing groups',
  'Infrastructure developers',
  'Industrial operations',
  'Utilities',
  'Engineering and EPC',
  'Energy and process industries',
  'Large listed enterprises',
  'Multi-site operating companies'
];

const faqData = [
  {
    question: 'What is SafetyWarden ESG/BRSR built for?',
    answer: 'SafetyWarden ESG/BRSR is built for operational sustainability governance, audit-linked evidence management, BRSR readiness and enterprise ESG reporting controls.'
  },
  {
    question: 'How does SafetyWarden support BRSR readiness?',
    answer: 'The platform helps teams structure BRSR data collection, map indicators to evidence, track audit findings and manage corrective actions before disclosure review.'
  },
  {
    question: 'Who should use the ESG/BRSR platform?',
    answer: 'It is designed for listed companies, manufacturing groups, infrastructure organizations, ESG heads, compliance leaders, internal audit teams and CXO governance stakeholders.'
  }
];

const Resources: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      <SEOHead
        title={seoPages.resources.title}
        description={seoPages.resources.description}
        keywords={seoPages.resources.keywords}
        canonicalUrl="https://safetywarden.com/resources"
      />

      <StructuredData data={generateFAQSchema(faqData)} />

      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
              ESG / BRSR governance
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              ESG & BRSR Governance. Built for Operational Reality.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              SafetyWarden helps organizations operationalize ESG and BRSR reporting through audit workflows, evidence traceability, CAPA governance and disclosure intelligence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#platform"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
              >
                Explore ESG Platform
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-slate-950"
              >
                Request Demo
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/90 p-4 shadow-2xl sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-sm font-semibold text-white">Disclosure Control Room</p>
                <p className="text-xs text-slate-400">BRSR readiness, evidence and CAPA governance</p>
              </div>
              <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">
                Board pack ready
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {dashboardMetrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <p className={`text-2xl font-semibold ${metric.tone}`}>{metric.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">BRSR principle scoring</p>
                <p className="text-xs text-slate-400">9 principles</p>
              </div>
              <div className="space-y-3">
                {[82, 74, 91, 68, 86].map((score, index) => (
                  <div key={index} className="grid grid-cols-[72px_1fr_44px] items-center gap-3 text-xs">
                    <span className="font-medium text-slate-300">P{index + 1}</span>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div className="h-2 rounded-full bg-sky-400" style={{ width: `${score}%` }} />
                    </div>
                    <span className="text-right text-slate-300">{score}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {['Evidence linked', 'Audit mapped', 'CAPA monitored'].map((item) => (
                <div key={item} className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-4 text-center text-xs font-semibold text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">Governance challenge</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              ESG reporting fails when operational evidence is not governed.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Enterprise ESG teams need more than narrative reporting. They need controlled workflows that connect operational activity, audit findings, evidence records and disclosure commitments.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {challengeItems.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">Platform capabilities</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Operational sustainability governance, not ESG branding.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                SafetyWarden converts ESG activity into a governed operating model: audits, owners, evidence, corrective actions, approvals and reporting summaries.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div key={capability} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-sky-300" />
                  <span className="text-sm font-semibold text-slate-100">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">BRSR intelligence</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Turn BRSR from annual compilation into structured governance reporting.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Build an evidence-backed disclosure framework where principle scores, indicator inputs, source records and audit observations stay linked throughout the reporting cycle.
            </p>
          </div>

          <div className="rounded-lg border border-slate-300 bg-white p-5">
            <div className="grid gap-3">
              {brsrRows.map(([title, description]) => (
                <div key={title} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[180px_1fr]">
                  <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: BarChart3, title: 'Enterprise ESG posture', text: 'Aggregate readiness across sites, functions and reporting themes.' },
                  { icon: FileSearch, title: 'Disclosure gaps', text: 'Identify missing inputs, incomplete evidence and review exceptions.' },
                  { icon: ClipboardCheck, title: 'CAPA governance', text: 'Track action owners, due dates, aging and closure quality.' },
                  { icon: ShieldCheck, title: 'Reporting controls', text: 'Maintain a controlled trail from source activity to disclosure review.' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                      <Icon className="h-6 w-6 text-sky-300" />
                      <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">Executive dashboard</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Give leadership a governed view of sustainability execution.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                ESG heads, internal audit teams, CXOs and board stakeholders can review the same operating reality: risk areas, disclosure gaps, unresolved CAPA and evidence confidence.
              </p>
              <div className="mt-6 grid gap-3">
                {executiveControls.map((control) => (
                  <div key={control} className="flex items-start gap-3 text-sm text-slate-700">
                    <Gauge className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-700" />
                    <span>{control}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">Industry alignment</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Designed for industrial ESG execution across complex operating footprints.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Support sustainability compliance, ESG audit software workflows, BRSR readiness and ESG evidence management across large sites, assets and operating teams.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((industry) => (
                <div key={industry} className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm font-semibold text-slate-100">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Layers className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Move from sustainability activity to disclosure readiness.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600">
            SafetyWarden brings ESG governance software, BRSR reporting platform workflows, sustainability compliance controls and audit-linked intelligence into one operational system.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Request Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              View Platform Architecture
              <Database className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
