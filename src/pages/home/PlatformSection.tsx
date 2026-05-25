import IconBubble from './IconBubble';
import { architectureSteps, capabilityItems } from './homeData';

export function PlatformSection() {
  return (
    <section className="bg-slate-950 py-16 sm:py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Platform architecture</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              From inspection activity to compliance intelligence.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              SafetyWarden connects field inspection execution with management visibility so teams can manage audits, evidence, findings, CAPA and reporting from one platform.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {architectureSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-sky-300 text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{step}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm leading-6 text-slate-400">
              Templates → Audits → Evidence → Findings → CAPA → Reports → Governance Dashboard
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  return (
    <section className="bg-slate-950 py-12 sm:py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Capabilities</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Built for operational compliance teams.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
              Every capability is designed to reduce audit effort and keep compliance teams focused on governance.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {capabilityItems.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/95 p-4 sw-elev">
                <div className="flex items-start gap-3">
                  <IconBubble label={`${index + 1}`} tone="sky" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ESGSection() {
  const governanceItems = [
    'BRSR readiness controls',
    'Evidence-backed disclosures',
    'Audit-linked ESG scoring',
    'CAPA governance',
    'Multi-site risk visibility',
    'Board reporting summaries'
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">ESG / BRSR governance</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Evidence-backed sustainability governance for enterprise disclosure readiness.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              SafetyWarden connects ESG activity, BRSR inputs, site audits, evidence records and corrective actions into a controlled operating model for sustainability reporting.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {governanceItems.map((title) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <IconBubble label="✓" tone="orange" />
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformSection;
