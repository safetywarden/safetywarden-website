import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download, Play, Users, Shield, Clock, BarChart3 } from 'lucide-react';
import { solutions } from '../data/solutions';
import LeadForm from '../components/LeadForm';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/seo';

const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const solution = solutions.find(s => s.id === id);

  if (!solution) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Solution Not Found</h1>
        <Link to="/solutions" className="text-blue-600 hover:text-blue-700">
          ← Back to Solutions
        </Link>
      </div>
    );
  }

  const faqs = [
    {
      question: 'Is this solution compliant with Indian regulations?',
      answer: 'Yes, all our solutions are designed to meet NFPA, NBC, and local Indian fire safety requirements.'
    },
    {
      question: 'Can we integrate this with our existing systems?',
      answer: 'Absolutely. We provide APIs and can integrate with most HRIS, LMS, and facility management systems.'
    },
    {
      question: 'What support is included?',
      answer: 'All plans include email support, documentation, and training resources. Premium plans include phone support and dedicated account management.'
    },
    {
      question: 'How quickly can we get started?',
      answer: 'Most implementations can be completed within 2-4 weeks depending on the complexity and number of sites.'
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: 'https://safetywarden.com/' },
    { name: 'Solutions', url: 'https://safetywarden.com/solutions' },
    { name: solution.title, url: `https://safetywarden.com/solutions/${solution.id}` }
  ];

  const serviceSchema = generateServiceSchema({
    name: solution.title,
    description: solution.description,
    url: `https://safetywarden.com/solutions/${solution.id}`,
    price: solution.pricing,
    category: 'Safety Compliance Service'
  });

  return (
    <div>
      <SEOHead
        title={`${solution.title} | SafetyWarden.com`}
        description={solution.description}
        keywords={`${solution.title.toLowerCase()}, safety compliance, fire safety, ${solution.features.slice(0, 3).join(', ').toLowerCase()}`}
        canonicalUrl={`https://safetywarden.com/solutions/${solution.id}`}
      />
      
      <StructuredData 
        data={[
          serviceSchema,
          generateBreadcrumbSchema(breadcrumbs)
        ]} 
      />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/solutions"
              className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Solutions</span>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {solution.title}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {solution.description}
            </p>
            
            {solution.pricing && (
              <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4 mb-8 inline-block">
                <p className="text-orange-200 font-medium">
                  Pricing: {solution.pricing}
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                {solution.cta.primary}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                {solution.cta.secondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Features</h2>
              <div className="space-y-4">
                {solution.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-slate-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-slate-600">
                    Screenshots and demo video would go here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Organizations Choose This Solution</h2>
            <p className="text-xl text-slate-600">Real benefits that make a difference to your safety program</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Save Time</h3>
              <p className="text-sm text-slate-600">
                Reduce manual processes and automate compliance workflows
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Ensure Compliance</h3>
              <p className="text-sm text-slate-600">
                Meet all regulatory requirements with confidence
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Better Insights</h3>
              <p className="text-sm text-slate-600">
                Data-driven decisions with comprehensive reporting
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Scale Easily</h3>
              <p className="text-sm text-slate-600">
                Grow your safety program across multiple locations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-200 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadForm
            title={`Get Started with ${solution.title}`}
            subtitle="Contact us to learn more about this solution and how it can help your organization"
            ctaText="Request Information"
            showBookDemo={true}
          />
        </div>
      </section>
    </div>
  );
};

export default SolutionDetail;