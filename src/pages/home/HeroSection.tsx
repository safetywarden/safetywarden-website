import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-20 pb-20 sm:pb-24 lg:pb-0">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-slate-900 to-slate-950 opacity-90" />
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1400px', minHeight: '720px' }}>
        <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.24em] text-slate-300 mb-6">
              Enterprise compliance operations platform
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl font-semibold leading-tight text-white">
              Compliance Ready. By Design. Not By Effort.
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-300 max-w-xl">
              SafetyWarden helps industries and infrastructure organizations digitize inspections, audits, CAPA, ESG and regulatory compliance into one continuous governance platform.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-orange-600 px-10 py-4 text-base font-semibold text-white shadow-sm sw-elev transition duration-200 hover:bg-orange-700 sm:w-auto"
              >
                Request Demo
              </Link>
              <Link
                to="/features"
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-10 py-4 text-base font-semibold text-white transition duration-200 hover:bg-slate-800 sm:w-auto"
              >
                Explore Platform
              </Link>
            </div>

            <p className="mt-8 max-w-lg text-sm leading-6 text-slate-400">
              Built for audits, inspections, CAPA, ESG and regulatory readiness across industrial operations.
            </p>
          </div>

          <div className="relative w-full lg:h-[720px] lg:flex lg:items-center lg:justify-end">
            <div className="absolute -right-10 top-10 hidden h-40 w-40 rounded-full bg-sky-500/10 blur-3xl md:block md:h-56 md:w-56" />
            <div className="absolute -left-10 bottom-10 hidden h-40 w-40 rounded-full bg-orange-500/10 blur-3xl md:block md:h-56 md:w-56" />

            <div className="relative w-full">
              <img
                src="/images/optimized/hero-dashboard-768.webp"
                srcSet="/images/optimized/hero-dashboard-480.webp 480w, /images/optimized/hero-dashboard-768.webp 768w, /images/optimized/hero-dashboard-1200.webp 1200w"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 84vw, 780px"
                alt="SafetyWarden enterprise compliance platform"
                width={1200}
                height={800}
                decoding="async"
                loading="eager"
                fetchPriority="high"
                className="w-full rounded-3xl border border-slate-700/50 bg-slate-900/95 object-contain shadow-[0_24px_70px_-28px_rgba(15,23,42,0.8)] md:shadow-[0_50px_150px_-30px_rgba(15,23,42,0.95)]"
                style={{ maxWidth: '780px' }}
              />
            </div>
          </div>
        </div>

        <div className="hidden gap-3 mt-8 sm:grid-cols-2 lg:hidden">
          <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/95 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.8)]">
            <div className="h-12 bg-slate-950/90" />
            <img
              src="/images/optimized/compliance-dashboard-480.webp"
              alt="Compliance dashboard preview"
              loading="lazy"
              decoding="async"
              width={480}
              height={320}
              className="w-full object-cover"
              style={{ aspectRatio: '5 / 7' }}
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/95 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.8)]">
            <div className="h-12 bg-slate-950/90" />
            <img
              src="/images/hero/reports-dashboard.png"
              alt="Reports dashboard preview"
              loading="lazy"
              decoding="async"
              width={220}
              height={227}
              className="w-full object-cover"
              style={{ aspectRatio: '5 / 7' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
