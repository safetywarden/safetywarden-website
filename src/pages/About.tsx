import React from 'react';
import { Users, Award, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEO/SEOHead';
import { seoPages } from '../utils/seo';

const About: React.FC = () => {
  const stats = [
    { number: '500+', label: 'Organizations served' },
    { number: '50,000+', label: 'Employees trained' },
    { number: '95%', label: 'Compliance success rate' },
    { number: '24/7', label: 'Support availability' }
  ];

  const team = [
    {
      name: 'Shaw Alem',
      role: 'Founder & CEO',
      background: 'Shaw Alem, Founder & CEO of SafetyWarden™, a platform that unifies digital audits, training, staffing, and certified vendors to deliver measurable compliance results. With 25+ years in HSSE across India and the Middle East, he has led safety achieving 100% regulatory compliance and major risk reduction. A mechanical engineer with an M.E. in Industrial Safety (NIT Trichy) and an MBA from Strathclyde University, he builds high-performing teams and practical, tech-enabled safety solutions..',
      image: '/Profile pic.jpg'
    },
    {
      name: 'Asha',
      role: 'Head of Signapore Operations',
      background: 'specialized in enterprise safety software',
      image: null
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'Head of GCC Operations',
      background: 'Former UAE Civil Defense consultant, expert in Middle East regulations',
      image: null
    }
  ];

  const values = [
    {
      icon: <img src="/icon.png" alt="Safety First" className="h-8 w-auto" />,
      title: 'Safety First',
      description: 'Every decision we make prioritizes the safety and well-being of people in workplaces.'
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: 'Customer Success',
      description: 'We measure our success by how effectively we help our customers achieve compliance.'
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: 'Excellence',
      description: 'We continuously improve our platform and services to exceed industry standards.'
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: 'Innovation',
      description: 'We leverage technology to make safety compliance simple, efficient, and accessible.'
    }
  ];

  return (
    <div className="py-12">
      <SEOHead
        title={seoPages.about.title}
        description={seoPages.about.description}
        keywords={seoPages.about.keywords}
        canonicalUrl="https://safetywarden.com/about"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Leading Safety Audit Software & Digital Inspection Platform
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              SafetyWarden is a comprehensive compliance management software helping organizations across India and GCC achieve workplace safety excellence. Our digital inspection software, mobile inspection app, and EHS audit tools simplify safety compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
            </div>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                Traditional paper-based safety inspections are complex, time-consuming, and ineffective.
                Organizations struggle with manual inspection checklists, scattered documentation, and
                the constant challenge of workplace safety compliance.
              </p>

              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                SafetyWarden was founded to transform this reality with digital inspection software.
                Our safety audit software, mobile inspection app, and comprehensive compliance management platform
                make facility inspection and EHS audits accessible, efficient, and reliable for organizations of all sizes.
              </p>

              <p className="text-xl text-slate-700 leading-relaxed">
                Through our integrated digital audit platform—combining inspection checklist software,
                inspection reporting tools, and safety compliance software—we're helping hundreds of
                organizations protect their people, achieve regulatory compliance, and build a culture of safety excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-8">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Leadership Team</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Industry experts with deep experience in safety, compliance, and technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm text-center">
                {member.image && (
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!member.image && (
                  <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-6">
                    <Users className="h-12 w-12 text-slate-400" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-4">{member.role}</p>
                <p className="text-sm text-slate-600">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Regional Expertise
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                We understand the unique regulatory landscape of India and the GCC region, 
                providing localized solutions that meet specific compliance requirements.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">India Compliance</h3>
                    <p className="text-slate-600">NBC 2016, State Fire Service regulations, Factory Act requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">GCC Standards</h3>
                    <p className="text-slate-600">UAE Fire Code, Saudi Building Code, NFPA adaptations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">International Best Practices</h3>
                    <p className="text-slate-600">NFPA, IFC, and ISO standards integration</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-slate-600">
                  Coverage map visualization would go here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Help us make workplace safety simple and effective for organizations everywhere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>View Open Positions</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;