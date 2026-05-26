import React from 'react';
import SEOHead from '../../components/SEO/SEOHead';

type LegalSection = {
  title: string;
  body?: string;
  items?: string[];
};

export type LegalPageContent = {
  title: string;
  eyebrow: string;
  description: string;
  canonicalPath: string;
  updated: string;
  sections: LegalSection[];
};

type LegalPageProps = {
  content: LegalPageContent;
};

const LegalPage: React.FC<LegalPageProps> = ({ content }) => {
  return (
    <div className="bg-white">
      <SEOHead
        title={`${content.title} | SafetyWarden`}
        description={content.description}
        canonicalUrl={`https://www.safetywarden.com${content.canonicalPath}`}
      />

      <section className="bg-slate-950 py-16 text-white md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
            {content.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{content.description}</p>
          <p className="mt-6 text-sm text-slate-400">Last updated: {content.updated}</p>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 lg:px-8">
          {content.sections.map((section) => (
            <article key={section.title} className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-950">{section.title}</h2>
              {section.body && <p className="leading-8 text-slate-700">{section.body}</p>}
              {section.items && (
                <ul className="mt-5 space-y-3 text-slate-700">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-7">
                      <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          <div className="border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600 md:p-8">
            These pages provide a practical trust and legal overview for the SafetyWarden website and platform discussions. They are not a substitute for a negotiated enterprise agreement, data processing addendum or statement of work where one is required.
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
