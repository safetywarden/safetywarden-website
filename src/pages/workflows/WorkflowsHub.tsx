import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';
import StructuredData from '../../components/SEO/StructuredData';
import { generateSoftwareApplicationSchema } from '../../utils/seo';
import { workflowDetails } from '../../data/workflows';

export default function WorkflowsHub() {
  return (
    <div className="bg-slate-50 text-slate-950">
      <SEOHead
        title="Operational Compliance Workflows | SafetyWarden"
        description="Explore how SafetyWarden structures inspection readiness, ESG governance, audit execution and operational compliance workflows."
        keywords="operational compliance workflows, audit governance workflow, inspection readiness platform, ESG BRSR workflow, offline inspection workflow"
        canonicalUrl="https://www.safetywarden.com/workflows"
      />
      <StructuredData data={generateSoftwareApplicationSchema()} />

      <section className="bg-slate-950 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
            Workflow architecture
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Operational Compliance Workflows
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Explore how SafetyWarden structures inspection readiness, ESG governance, audit execution and operational compliance workflows.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {workflowDetails.map((workflow) => (
              <Link
                key={workflow.key}
                to={workflow.path}
                className="group grid gap-5 border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-orange-300 hover:bg-white lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
                    {workflow.shortTitle}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-950">{workflow.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{workflow.summary}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-orange-700 group-hover:text-orange-800">
                    Open workflow page
                  </span>
                </div>
                <div className="overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={workflow.visual.src}
                    alt={workflow.visual.alt}
                    width={1200}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="h-full min-h-48 w-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
              Governance journey
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              From field execution to leadership visibility.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Each workflow connects operational execution, evidence traceability, review ownership and management-ready reporting without relying on fake adoption claims or generic feature grids.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {['Plan', 'Execute', 'Capture evidence', 'Assign CAPA', 'Verify closure', 'Review readiness'].map((step, index) => (
              <div key={step} className="border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
