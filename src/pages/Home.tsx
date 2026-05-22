import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, BookOpen, ShoppingCart, CheckCircle, Star, TrendingUp, Award, Clock } from 'lucide-react';
import SEOHead from '../components/SEO/SEOHead';
import StructuredData from '../components/SEO/StructuredData';
import { generateOrganizationSchema, generateServiceSchema, generateReviewSchema } from '../utils/seo';
import PostCard from '../components/blog/PostCard';
import PageCounter from '../components/PageCounter';
import { blogPosts } from '../data/blog/posts';

const Home: React.FC = () => {
  const organizationSchema = generateOrganizationSchema();
  
  const servicesSchema = [
    generateServiceSchema({
      name: "Fire Safety Training",
      description: "Comprehensive fire safety training programs including NEBOSH, IOSH, and emergency response",
      url: "https://safetywarden.com/training",
      category: "Training"
    }),
    generateServiceSchema({
      name: "Safety Audit Platform",
      description: "Digital safety audit and compliance management platform",
      url: "https://safetywarden.com/solutions",
      category: "Software"
    })
  ];

  const reviewsSchema = generateReviewSchema([
    {
      author: "Rajesh Kumar",
      rating: 5,
      text: "Excellent fire safety training program. Very comprehensive and practical.",
      company: "Tech Corp"
    },
    {
      author: "Sarah Ahmed",
      rating: 5,
      text: "The safety audit platform has streamlined our compliance processes significantly.",
      company: "Manufacturing Ltd"
    }
  ]);

  return (
    <div>
      <SEOHead
        title="SafetyWarden™ | Digital Inspection Software & Safety Audit Platform"
        description="Leading safety, Greenhouse Gas (GHG)audit software India & digital inspection platform. Offline inspection app, audit checklist software, petrol pump safety checklist, factory safety audit, fire inspection app. HSE audit software for oil & gas, manufacturing, construction sites. Digitize inspections with our mobile audit solution."
        keywords="Greenhouse Gas (GHG), safety warden,digital inspection software,safety audit software,inspection app,inspection checklist software,compliance management software,EHS audit software,mobile inspection app,digital audit platform,safety compliance software,workplace safety software,facility inspection software,safety inspection checklist,inspection reporting software,offline inspection app,audit checklist software,petrol pump safety checklist,factory safety audit software,fire safety audit software,oil and gas inspection software,construction site safety app,hospital safety audit software,preventive maintenance checklist app,corrective action tracking software,inspection management system,paperless inspection solution,real-time inspection dashboard,audit automation platform,safety audit software india,inspection app india,EHS software UAE,compliance software Saudi Arabia"
        canonicalUrl="https://safetywarden.com"
      />
      
      <StructuredData data={organizationSchema} />
      <StructuredData data={servicesSchema} />
      <StructuredData data={reviewsSchema} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Digital Inspection Software for
                <span className="text-orange-400"> Safety & Compliance</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
                SafetyWarden™ is a comprehensive safety and Greenhouse Gas (GHG) audit software and mobile inspection app. Digitize inspections, eliminate paperless processes, and conduct offline inspections with our inspection management system. Transform workplace safety with audit checklist software, real-time inspection dashboards, and instant inspection reporting.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/training"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg text-center"
                >
                  Book a Free Demo
                </Link>
                <Link
                  to="/solutions"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 text-center"
                >
                  Try Sample Checklist
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-orange-400">Growing</div>
                  <div className="text-slate-300">Companies Using</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400">Lot of</div>
                  <div className="text-slate-300">Professionals Certified</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400">Many</div>
                  <div className="text-slate-300">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400">Overall</div>
                  <div className="text-slate-300">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-400/30">
                <video
                  src="/safetywarden_checklistfill.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                  aria-label="SafetyWarden Platform Demo"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Audit Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/safetywarden_digital_audit.jpg"
                  alt="SafetyWarden Digital Audit Interface"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Complete Safety Compliance Software for Every Industry
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Our digital audit platform is trusted by safety and ESG teams across India and globally. The leading compliance management software that scales from 1 to 1,000+ sites.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Audit Checklist Software & Asset Inspection</h3>
                    <p className="text-slate-600">Create custom digital checklists for fire safety, ESG, Carbon Credit, Greenhouse Gas (GHG), factory inspections, and preventive maintenance. Our asset inspection app with QR code system enables paperless inspection solutions even offline.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">EHS Audit & Risk Assessment Tool</h3>
                    <p className="text-slate-600">Complete inspection management system for manufacturing, construction sites, hospitals, and oil & gas. Digital risk assessment tool with real-time inspection dashboard and corrective action tracking software.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Multi-Site Compliance Dashboard</h3>
                    <p className="text-slate-600">Digitize inspections across fuel stations, retail outlets, and facilities with our compliance digitization tool. Mobile audit checklist with digital evidence capture for field teams and remote sites.</p>
                  </div>
                </div>
              </div>

              <Link
                to="/solutions"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span>Explore Features</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Mobile Inspection App—Conduct Audits Anywhere, Even Offline
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Our powerful offline inspection app enables field teams to conduct petrol pump safety checks, factory inspections, construction site safety audits, and hospital compliance assessments anywhere. The best mobile inspection solution for India and GCC markets.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Offline Inspection App</h3>
                  <p className="text-slate-600">Conduct fire safety audits, Greenhouse Gas (GHG), fuel station inspections, and building safety checks without internet. Perfect for remote sites and field inspection automation.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Digital Evidence Capture</h3>
                  <p className="text-slate-600">Capture photos and videos for fire inspection checklists, industrial safety audits, and contractor safety compliance. Complete digital evidence for inspections.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">QR Code Asset Inspection System</h3>
                  <p className="text-slate-600">QR code digital assets checklist and asset tracking for preventive maintenance. Ideal for facility management compliance tools.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Safety Audit Reporting App</h3>
                  <p className="text-slate-600">Generate inspection reports for ISO compliance, HSE audits, ESG, Greenhouse Gas (GHG), and quality inspections. Instant PDF export for evacuation drill audits and toolbox talks.</p>
                </div>
              </div>

              <Link
                to="/training"
                className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span>Try Mobile App</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="relative flex justify-center">
              <div className="relative z-10">
                <img
                  src="/iphone_13_pro__5_.gif"
                  alt="SafetyWarden Mobile App"
                  className="w-full max-w-sm h-auto drop-shadow-2xl"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              One platform for unlimited inspection use-cases across multiple industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Manufacturing & Industrial</h3>
              <p className="text-slate-700">Factory safety audit software, industrial safety inspection app, and quality inspection tools for ISO compliance.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fuel Retail & Oil Gas</h3>
              <p className="text-slate-700">Petrol pump safety checklist, fuel station inspection app, and HSE audit software for oil & gas operations.</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Facilities & Buildings</h3>
              <p className="text-slate-700">Fire safety audit software, building safety inspection, evacuation drill checklist, and facility management compliance.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Healthcare & Construction</h3>
              <p className="text-slate-700">Hospital safety audit software, GMP inspection checklist, and construction site safety app with contractor compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Greenhouse Gas (GHG)-aligned data capture, compliance, and verification platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              SafetyWarden is aligned with the Greenhouse Gas Protocol requirements for measuring, monitoring, and verifying Scope 1, Scope 2, and Scope 3 greenhouse gas emissions by enabling structured data capture, audit trails, and third-party verification readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Platform Highlights</h3>
              <ul className="space-y-3 text-blue-800 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Multi-site dashboard with real-time updates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Role-based permissions & access control</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>QR tagging for assets & equipment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Geo-tagging & time stamping</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Automated reminders & notifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Secure cloud data retention</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Multilingual support (English/Hindi/Regional)</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">+15–25% Compliance Boost</span>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">≤10% False Positives</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-orange-900 mb-4">What You Can Digitize</h3>
              <ul className="space-y-3 text-orange-800 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Safety, Fire & EHS Inspections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Quality & ISO Audits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Operations & SOP Compliance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Preventive Maintenance & Assets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>ESG & Sustainability Reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Contractor and Permit Checks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                  <span>Custom checklists for any use case</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">80% Staff Approval</span>
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">Faster Resolution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Organizations Choose SafetyWarden™
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Removes friction from inspections • Strengthens compliance culture • Boosts speed, accuracy & evidence quality • Integrates with existing workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-orange-50 to-white rounded-xl p-6">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Easy to Use</h3>
              <p className="text-slate-600">
                Intuitive interface that requires minimal training. Get started in minutes.
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-blue-50 to-white rounded-xl p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Proven Results</h3>
              <p className="text-slate-600">
                15-25% improvement in compliance rates and significant time savings.
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">24/7 Support</h3>
              <p className="text-slate-600">
                Round-the-clock support and emergency response capabilities.
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-purple-50 to-white rounded-xl p-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Secure & Reliable</h3>
              <p className="text-slate-600">
                Enterprise-grade security with cloud data retention and backups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Practical insights on compliance, audits, and inspection readiness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogPosts.slice(0, 3).map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Articles
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600">
              Trusted by safety professionals across industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 text-lg">
                "Our forecourt audits became 3× faster. Corrective actions closing within 48 hours."
              </p>
              <div className="font-semibold text-slate-900">Rajesh Kumar</div>
              <div className="text-slate-500">Retail Outlet Manager</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 text-lg">
                "Fire NOC renewals got smoother because we now show real compliance evidence."
              </p>
              <div className="font-semibold text-slate-900">Sarah Ahmed</div>
              <div className="text-slate-500">HSE Director, Manufacturing Ltd</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 text-lg">
                "Professional delivery and excellent support. Our team is fully satisfied with the platform."
              </p>
              <div className="font-semibold text-slate-900">Mohammed Al-Rashid</div>
              <div className="text-slate-500">Operations Manager, Gulf Industries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Statistics */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Join Our Growing Community
            </h2>
            <p className="text-slate-600">
              See how many professionals are exploring SafetyWarden
            </p>
          </div>
          <PageCounter className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/2024-04-05_15-19-09__1_.gif')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Compliance Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get started with a free consultation and discover how SafetyWarden can digitize your inspections, audits, and compliance tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book a Free Demo
            </Link>
            <Link
              to="/solutions"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;