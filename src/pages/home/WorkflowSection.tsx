import { Link } from 'react-router-dom';
import { workflowDetails } from '../../data/workflows';

function WorkflowSection() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
              Operational workflows
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Compliance governance shown as operating workflows.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore how SafetyWarden structures inspection readiness, ESG/BRSR governance, field execution and corrective action visibility.
            </p>
          </div>

          <div className="flex lg:justify-end">
            <Link
              to="/workflows"
              className="inline-flex items-center justify-center bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Explore Operational Workflows
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflowDetails.map((workflow) => (
            <Link
              key={workflow.key}
              to={workflow.path}
              className="group border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-orange-300 hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {workflow.shortTitle}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-950">{workflow.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{workflow.summary}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-orange-700 group-hover:text-orange-800">
                View workflow
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
