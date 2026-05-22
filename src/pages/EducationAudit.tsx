import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, School, Shield, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';

const EducationAudit: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title="Health & Safety Audit for Schools & Colleges | SafetyWarden"
        description="Comprehensive health and safety audit services specifically designed for educational institutions. Campus safety compliance, student accommodation audits, and laboratory safety assessments."
        keywords="school safety audit, college safety compliance, campus health safety, educational institution audit, student safety assessment"
        canonicalUrl="https://safetywarden.com/education-audit"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/solutions/digital-audit"
              className="inline-flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Digital Audit Solution</span>
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <School className="h-12 w-12 text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Health & Safety Audit for Schools & Colleges
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive safety compliance solutions specifically designed for educational institutions
            </p>
          </div>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Service Overview
            </h2>
            <p className="text-xl text-slate-600 mb-6">
              Download our comprehensive guide to health and safety audits for educational institutions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/Health & Safety Audit for Schools & Colleges (2).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center space-x-2"
              >
                <FileText className="h-5 w-5" />
                <span>View Full Brochure</span>
              </a>
              <a
                href="/Health & Safety Audit for Schools & Colleges (2).pdf"
                download
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* PDF Embed */}
          <div className="bg-slate-100 rounded-xl p-4 shadow-lg">
            <div className="text-center py-20">
              <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">PDF Brochure Available</h3>
              <p className="text-slate-600 mb-6">
                Download our comprehensive guide to health and safety audits for educational institutions
              </p>
              <a
                href="/Health & Safety Audit for Schools & Colleges (2).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
              >
                <FileText className="h-5 w-5" />
                <span>View PDF Brochure</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Educational Institutions Choose Our Audit Services
            </h2>
            <p className="text-xl text-slate-600">
              Specialized expertise in campus safety and educational compliance requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <School className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Education-Specific Compliance</h3>
              <p className="text-slate-600">
                Specialized checklists covering classroom safety, laboratory protocols, sports facilities, and student accommodation areas.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Campus-Wide Coverage</h3>
              <p className="text-slate-600">
                Comprehensive audits covering academic buildings, hostels, cafeterias, libraries, and recreational facilities.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Regulatory Compliance</h3>
              <p className="text-slate-600">
                Ensure compliance with NFPA, NBC, and state education board safety requirements for educational institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Audit Your Campus?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a comprehensive health and safety audit tailored for your educational institution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Request Campus Audit
            </Link>
            <Link
              to="/solutions/digital-audit"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Learn More About Our Platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationAudit;