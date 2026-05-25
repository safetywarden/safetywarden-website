import { useEffect, useRef, useState } from 'react';
import { fieldExecutionItems, fieldExecutionTags } from './homeData';

function FieldExecutionSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Field execution</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Designed for real field inspections.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
              Field teams capture findings, evidence and sync status from a mobile interface built for inspection workflows and offline execution.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {fieldExecutionItems.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/95 p-5 sw-elev">
                  <p className="text-sm md:text-base font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px]">
              <div className="absolute -inset-6 rounded-[4rem] bg-sky-500/10 blur-3xl" />
              <div className="relative rounded-[3.25rem] border border-slate-700 bg-slate-900 p-3 shadow-[0_45px_120px_-35px_rgba(0,0,0,0.95)]">
                <div className="rounded-[2.75rem] border border-slate-700 bg-slate-950 p-3">
                  <div className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-slate-700" />
                  <div className="overflow-hidden rounded-[2.25rem] border border-slate-800 bg-slate-950">
                    <div className="flex items-center justify-between bg-slate-950 px-4 py-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Mobile Inspection Execution</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <LazyFieldExecutionVideo />
                  </div>
                  <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-slate-700" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {fieldExecutionTags.map((item) => (
                  <span key={item} className="rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LazyFieldExecutionVideo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const target = containerRef.current;
    if (!target || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="aspect-[9/16] w-full bg-slate-950">
      {shouldLoad && (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="SafetyWarden field execution video"
        >
          <source src="/assets/videos/field_execution.mp4?v=20260523-193507" type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default FieldExecutionSection;
