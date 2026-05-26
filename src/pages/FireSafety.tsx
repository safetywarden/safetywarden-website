import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, FileSearch, Flame, ShieldCheck } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateSoftwareApplicationSchema } from '../utils/seo';
import { trackCtaClick, trackDemoRequest } from '../utils/analytics';

const capabilities = [
  'Fire and life safety audit workflows',
  'Inspection evidence capture',
  'Finding and CAPA ownership',
  'Readiness reporting for management review',
  'Multi-site audit traceability',
  'Operational closure visibility'
];

const FireSafety: React.FC = () => {
  return (
    <div className="bg-white text-slate-900">
      <SEOHead
        title="Fire & Life Safety Audit Platform | SafetyWarden"
        description="Manage fire and life safety audits, inspections and operational readiness using SafetyWarden’s enterprise audit governance platform."
        keywords="fire safety audit platform, life safety inspection software, fire audit software, NFPA NBC compliance, operational readiness"
        canonicalUrl="https://www.safetywarden.com/fire-safety"
      />
      <StructuredData data={generateSoftwareApplicationSchema()} />

      <section className="bg-slate-950 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
            Fire and life safety governance
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            Fire & Life Safety Audit Platform
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            SafetyWarden helps operating teams digitize fire safety inspections, evidence records, audit findings and corrective action workflows for inspection readiness.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              onClick={() => {
                trackDemoRequest('fire_safety');
                trackCtaClick('request_demo', 'fire_safety');
              }}
              className="inline-flex items-center justify-center bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Schedule Fire Safety Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: 'Inspection Readiness',
                description: 'Maintain structured audit workflows, evidence trails and closure status before regulatory or internal reviews.',
                icon: ShieldCheck
              },
              {
                title: 'Audit Traceability',
                description: 'Connect observations, photos, documents, owners and corrective actions into one governed record.',
                icon: FileSearch
              },
              {
                title: 'Operational CAPA',
                description: 'Move fire safety findings from inspection notes into accountable corrective action workflows.',
                icon: ClipboardCheck
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-orange-200 bg-orange-50 text-orange-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mb-3 text-xl font-bold text-slate-950">{item.title}</h2>
                  <p className="leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 border border-slate-200 bg-slate-50 p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <Flame className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-slate-950">Platform Capabilities</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {capabilities.map((capability) => (
                <div key={capability} className="border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">
              Readiness verification workflow
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Fire and life safety execution belongs in a governed workflow.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Review the dedicated path for NBC mapping, inspection execution, deficiency tracking, corrective action management and closure verification.
            </p>
          </div>

          <div className="border border-slate-800 bg-slate-900 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {['NBC mapping', 'Inspection execution', 'Deficiency tracking', 'Closure verification'].map((item) => (
                <div key={item} className="border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100">
                  {item}
                </div>
              ))}
            </div>
            <Link
              to="/workflows/fire-life-safety"
              className="mt-5 inline-flex items-center justify-center bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              View Fire Safety Workflow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FireSafety;
