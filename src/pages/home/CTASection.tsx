import { Link } from 'react-router-dom';
import { comparisonRows } from './homeData';
import { trackCtaClick, trackDemoRequest } from '../../utils/analytics';

export function ComparisonSection() {
  return (
    <section className="bg-slate-950 py-16 sm:py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/95">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] px-6 py-10 sm:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Why SafetyWarden</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                More than a checklist app.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                SafetyWarden is an enterprise governance platform built for continuous compliance execution, not a standalone checklist tool.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="text-slate-300">
                    <th className="pb-4 pr-6 font-semibold uppercase tracking-[0.2em]">Execution model</th>
                    <th className="pb-4 pr-6 font-semibold uppercase tracking-[0.2em]">Traditional Compliance</th>
                    <th className="pb-4 pr-6 font-semibold uppercase tracking-[0.2em]">Generic Checklist Apps</th>
                    <th className="pb-4 font-semibold uppercase tracking-[0.2em]">SafetyWarden</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <td className="py-5 pr-6 align-top font-semibold text-slate-200">{row.label}</td>
                      <td className="py-5 pr-6 align-top text-slate-300">{row.traditional}</td>
                      <td className="py-5 pr-6 align-top text-slate-300">{row.generic}</td>
                      <td className="py-5 align-top text-slate-100">{row.safetywarden}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">Founder trust</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Built by a practitioner who lived the problem.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              SafetyWarden is built from decades of hands-on experience in fire, safety, industrial risk and compliance systems across India and the GCC. The platform reflects field inspection realities, regulatory audits and operational governance.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-600">Founder-led compliance platform</p>
            <h3 className="mt-5 text-2xl font-semibold text-slate-900">Practitioner-led design for inspection readiness.</h3>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
              <p>Designed from real audit and enforcement experience in industrial operations.</p>
              <p>Focuses on evidence, CAPA closure, and live governance instead of checkbox completion.</p>
              <p>Built to reduce audit preparation risk and support regulated operations in India.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-slate-950 py-16 sm:py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Final CTA</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Stop preparing for audits manually.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
              Build continuous inspection readiness across every site.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <Link
              to="/contact"
              onClick={() => {
                trackDemoRequest('home_final_cta');
                trackCtaClick('request_demo', 'home_final_cta');
              }}
              className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition duration-200 hover:bg-orange-700"
            >
              Request Demo
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-8 py-4 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800"
            >
              Talk to Founder
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
