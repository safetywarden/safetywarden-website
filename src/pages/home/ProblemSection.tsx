import IconBubble from './IconBubble';
import { problemItems } from './homeData';

function ProblemSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">Problem</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Compliance operations are still fragmented.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              Fragmented tools and manual handoffs force teams into reactive audit preparation and disconnected evidence workflows.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {problemItems.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sw-elev">
                <div className="flex gap-3">
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

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-950/5 px-6 py-6 sm:px-8">
          <p className="text-lg leading-8 text-slate-900">
            SafetyWarden converts fragmented compliance activity into a continuous, system-driven governance process.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
