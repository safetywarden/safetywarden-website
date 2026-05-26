import { Link, Navigate, useParams } from 'react-router-dom';
import OperationalWorkflow from '../../components/OperationalWorkflow';
import SEOHead from '../../components/SEO/SEOHead';
import StructuredData from '../../components/SEO/StructuredData';
import { trackCtaClick, trackDemoRequest } from '../../utils/analytics';
import { generateSoftwareApplicationSchema } from '../../utils/seo';
import { getWorkflowByKey, workflowDetails } from '../../data/workflows';

export default function WorkflowDetailPage() {
  const { workflowKey } = useParams();
  const workflow = getWorkflowByKey(workflowKey);

  if (!workflow) {
    return <Navigate to="/workflows" replace />;
  }

  const relatedWorkflows = workflowDetails.filter((item) => item.key !== workflow.key);

  return (
    <div className="bg-white text-slate-950">
      <SEOHead
        title={workflow.seo.title}
        description={workflow.seo.description}
        keywords={workflow.seo.keywords}
        canonicalUrl={`https://www.safetywarden.com${workflow.path}`}
      />
      <StructuredData data={generateSoftwareApplicationSchema()} />

      <section className="bg-slate-950 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <Link to="/workflows" className="text-sm font-semibold text-orange-300 hover:text-orange-200">
              Operational workflows
            </Link>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {workflow.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{workflow.scenario}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                onClick={() => {
                  trackDemoRequest(`workflow_${workflow.key}`);
                  trackCtaClick('request_demo', `workflow_${workflow.key}`);
                }}
                className="inline-flex items-center justify-center bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
              >
                Discuss This Workflow
              </Link>
              <Link
                to="/workflows"
                className="inline-flex items-center justify-center border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-slate-950"
              >
                View All Workflows
              </Link>
            </div>
          </div>

          <div className="overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={workflow.visual.src}
              alt={workflow.visual.alt}
              width={1200}
              height={675}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full min-h-72 w-full object-cover"
            />
          </div>
        </div>
      </section>

      <OperationalWorkflow
        eyebrow="Execution path"
        headline={workflow.headline}
        scenario={workflow.scenario}
        steps={workflow.steps}
        visual={workflow.visual}
      />

      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
              Operational depth
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Built around execution, evidence and governance review.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The workflow is designed for industrial teams that need a clear operating path from field activity to traceable review, without turning compliance into a spreadsheet chase.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {workflow.focusAreas.map((area) => (
              <div key={area} className="border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
              Governance controls
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Traceable records for accountable decisions.
            </h2>
          </div>

          <div className="grid gap-4">
            {workflow.governanceNotes.map((note, index) => (
              <div key={note} className="grid grid-cols-[44px_1fr] gap-4 border border-slate-800 bg-slate-900 p-4">
                <div className="flex h-9 w-9 items-center justify-center bg-orange-600 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-slate-200">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
                Related workflows
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                Continue the operational architecture.
              </h2>
            </div>
            <Link to="/workflows" className="text-sm font-semibold text-orange-700 hover:text-orange-800">
              Workflow hub
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedWorkflows.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-orange-300 hover:bg-white"
              >
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
