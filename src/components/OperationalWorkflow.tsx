type WorkflowVisual = {
  src: string;
  alt: string;
};

type OperationalWorkflowProps = {
  eyebrow?: string;
  headline: string;
  scenario: string;
  steps: string[];
  visual?: WorkflowVisual;
  dark?: boolean;
};

export default function OperationalWorkflow({
  eyebrow = 'Operational workflow',
  headline,
  scenario,
  steps,
  visual,
  dark = false
}: OperationalWorkflowProps) {
  const surface = dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-950';
  const muted = dark ? 'text-slate-300' : 'text-slate-600';
  const card = dark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50';

  return (
    <section className={`${surface} py-14 sm:py-16`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{headline}</h2>
            <p className={`mt-4 text-base leading-7 ${muted}`}>{scenario}</p>

            {visual && (
              <div className={`mt-8 overflow-hidden border ${dark ? 'border-slate-800' : 'border-slate-200'} bg-slate-100`}>
                <img
                  src={visual.src}
                  alt={visual.alt}
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className={`border ${card} p-5 sm:p-6`}>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="grid grid-cols-[44px_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center bg-orange-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && <div className={`mt-2 h-full min-h-6 w-px ${dark ? 'bg-slate-700' : 'bg-slate-300'}`} />}
                  </div>
                  <div className={`border ${dark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'} px-4 py-3`}>
                    <p className={`text-sm font-semibold ${dark ? 'text-slate-100' : 'text-slate-900'}`}>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
