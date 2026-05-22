import React from 'react';
import {
  CheckSquare,
  Smartphone,
  Camera,
  AlertCircle,
  FileText,
  BarChart3,
  Building2,
  QrCode,
  Library,
  Shield,
  ArrowRight,
  Check
} from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';

const Features = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Custom Digital Checklists',
      description: 'Build inspection workflows that match your exact needs',
      items: [
        '100% customizable checklist builder',
        'IS 14489 / NBC / ESG templates',
        'Conditional logic, scoring, mandatory fields',
        'Multi-language & industry-ready templates'
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile Inspections (Online & Offline)',
      description: 'Conduct audits anywhere, even without internet',
      items: [
        'Works without internet in remote locations',
        'Photo/video capture with annotations',
        'GPS, timestamps & digital signatures',
        'Auto-save and resume inspections'
      ]
    },
    {
      icon: Camera,
      title: 'Evidence Capture',
      description: 'Document findings with rich media evidence',
      items: [
        'Attach photos, videos, documents',
        'Mark-up & draw on images',
        'Before/after comparisons',
        'Automatically added to reports'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Corrective Actions & Issue Tracking',
      description: 'Close the loop on every finding with accountability',
      items: [
        'Convert findings into actions instantly',
        'Assign to teams or individuals',
        'Due dates, reminders & escalation',
        'Live tracking: Open / In Progress / Closed'
      ]
    },
    {
      icon: FileText,
      title: 'Instant PDF & Excel Reports',
      description: 'Professional reports generated in seconds',
      items: [
        'Auto-generated reports',
        'Include photos, findings, scoring',
        'Custom branding (logo, header, footer)',
        'Share via email/WhatsApp in one click'
      ]
    },
    {
      icon: BarChart3,
      title: 'Dashboards & Compliance Analytics',
      description: 'Real-time visibility into your safety performance',
      items: [
        'Live compliance score for each site',
        'Heatmaps for Fire, EHS, ESG, Facility',
        'Open vs closed actions',
        'Recurring issue insights',
        'Auditor KPIs'
      ]
    },
    {
      icon: Building2,
      title: 'Multi-Site & Team Management',
      description: 'Scale standardized audits across your organization',
      items: [
        'Standardized audits across sites',
        'Role-based access control',
        'Auditor assignment',
        'Centralized issue management',
        'Cross-site benchmarking'
      ]
    },
    {
      icon: QrCode,
      title: 'QR Code Asset Tagging',
      description: 'Track and inspect assets throughout their lifecycle',
      items: [
        'Tag fire extinguishers, hydrants, pumps, detectors',
        'Scan → Inspect → Log history',
        'Full lifecycle tracking',
        'Perfect for Fire Safety & FM teams'
      ]
    },
    {
      icon: Library,
      title: 'Template Library',
      description: 'Hit the ground running with expert-built templates',
      items: [
        'Prebuilt templates for Fire, EHS, ESG, Facility, Retail, Construction',
        'Editable and ready to deploy',
        'Aligns with standards: NBC, IS, OSHA, GRI, BRSR'
      ]
    },
    {
      icon: Shield,
      title: 'Secure Cloud Archive',
      description: 'Your compliance data, always accessible and secure',
      items: [
        'Long-term storage of audits & reports',
        'Centralized evidence repository',
        'Full audit trail for compliance & insurance',
        'Role-based viewing'
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Features - Digital Safety Audit Platform"
        description="Powerful features to digitize every audit & inspection. Mobile-first digital workflows for Fire Safety, EHS, ESG, Facility & Operations teams."
        keywords="digital safety audits, mobile inspections, custom checklists, corrective actions, compliance dashboard, fire safety, EHS, ESG, facility inspections"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Powerful Features to Digitize<br />Every Audit & Inspection
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
              Mobile-first digital workflows for Fire Safety, EHS, ESG, Facility & Operations teams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Book Demo <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/app/auth/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-lg transition-colors"
              >
                Try Sample Checklist
              </a>
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              See SafetyWarden in Action
            </h2>
            <p className="text-xl text-slate-600">
              Watch how easy it is to conduct digital inspections
            </p>
          </div>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <video
              controls
              className="w-full"
              poster="/safetywarden_digital_audit.jpg"
            >
              <source src="/inspectiondemo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  {/* Icon & Title Column */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-slate-600 mb-6">
                      {feature.description}
                    </p>
                  </div>

                  {/* Features List Column */}
                  <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                    <ul className="space-y-4">
                      {feature.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Digitize your audits today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              See how SafetyWarden can transform your safety & compliance workflows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-blue-700 font-semibold rounded-lg transition-colors"
              >
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="mailto:hello@safetywarden.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors border-2 border-blue-400"
              >
                hello@safetywarden.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
