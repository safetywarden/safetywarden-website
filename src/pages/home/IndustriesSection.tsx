import { industries } from './homeData';

function IndustriesSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">Industries</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Purpose-built for high-compliance environments.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sw-elev">
                <p className="text-lg font-semibold text-slate-900">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
