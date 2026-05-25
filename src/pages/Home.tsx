import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import SEOHead from '../components/SEO/SEOHead';
import HeroSection from './home/HeroSection';

const ProblemSection = lazy(() => import('./home/ProblemSection'));
const PlatformSection = lazy(() => import('./home/PlatformSection'));
const CapabilitiesSection = lazy(() =>
  import('./home/PlatformSection').then((module) => ({ default: module.CapabilitiesSection }))
);
const WorkflowSection = lazy(() => import('./home/WorkflowSection'));
const ESGSection = lazy(() =>
  import('./home/PlatformSection').then((module) => ({ default: module.ESGSection }))
);
const FieldExecutionSection = lazy(() => import('./home/FieldExecutionSection'));
const IndustriesSection = lazy(() => import('./home/IndustriesSection'));
const ComparisonSection = lazy(() =>
  import('./home/CTASection').then((module) => ({ default: module.ComparisonSection }))
);
const FounderSection = lazy(() =>
  import('./home/CTASection').then((module) => ({ default: module.FounderSection }))
);
const CTASection = lazy(() => import('./home/CTASection'));

const lazySections = [
  { Component: ProblemSection, minHeight: 360 },
  { Component: PlatformSection, minHeight: 360 },
  { Component: WorkflowSection, minHeight: 320 },
  { Component: CapabilitiesSection, minHeight: 420 },
  { Component: ESGSection, minHeight: 360 },
  { Component: FieldExecutionSection, minHeight: 680 },
  { Component: IndustriesSection, minHeight: 360 },
  { Component: ComparisonSection, minHeight: 560 },
  { Component: FounderSection, minHeight: 420 },
  { Component: CTASection, minHeight: 320 }
];

const Home: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      <SEOHead
        title="SafetyWarden | Enterprise Compliance Operations Platform"
        description="SafetyWarden helps industries and infrastructure organizations digitize inspections, audits, CAPA, ESG and compliance operations to stay inspection-ready by design."
        canonicalUrl="https://safetywarden.com"
      />

      <HeroSection />

      {lazySections.map(({ Component, minHeight }, index) => (
        <ViewportSection key={index} minHeight={minHeight}>
          <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
            <Component />
          </Suspense>
        </ViewportSection>
      ))}
    </div>
  );
};

function ViewportSection({
  children,
  minHeight
}: {
  children: React.ReactNode;
  minHeight: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={ref} style={!isVisible ? { minHeight } : undefined}>
      {isVisible ? children : null}
    </div>
  );
}

function SectionFallback({ minHeight }: { minHeight: number }) {
  return <div aria-hidden="true" style={{ minHeight }} />;
}

export default Home;
