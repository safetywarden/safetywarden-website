import IconBubble from './IconBubble';
import { workflowItems } from './homeData';

function WorkflowSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">Workflow</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              One platform for the full compliance execution cycle.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              A unified workflow from planning inspections to tracking CAPA and generating audit-ready reports.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {workflowItems.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sw-elev">
                <div className="flex items-start gap-3">
                  <IconBubble label={`${index + 1}`} tone="dark" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-600">{item.description}</p>
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

export default WorkflowSection;
