import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Users, Award, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Course, TrainingSession } from '../../types/training';
import SEOHead from '../../components/SEO/SEOHead';
import StructuredData from '../../components/SEO/StructuredData';
import { generateCourseSchema, seoPages } from '../../utils/seo';

const TrainingHome: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMode, setSelectedMode] = useState('');

  useEffect(() => {
    loadTrainingData();
  }, []);

  const loadTrainingData = async () => {
    setLoading(true);
    
    try {
      // Load courses with providers
      const { data: coursesData } = await supabase
        .from('courses')
        .select(`
          *,
          provider:training_providers(*)
        `)
        .eq('active', true)
        .order('title');

      // Load upcoming sessions
      const { data: sessionsData } = await supabase
        .from('training_sessions')
        .select(`
          *,
          course:courses(*),
          provider:training_providers(*)
        `)
        .eq('status', 'Published')
        .gte('start_date', new Date().toISOString().split('T')[0])
        .order('start_date');

      setCourses(coursesData || []);
      setSessions(sessionsData || []);
    } catch (error) {
      console.error('Error loading training data:', error);
      // Fallback to sample data on error
      const { sampleCourses, sampleSessions } = await import('../../data/training/sample-data');
      setCourses(sampleCourses);
      setSessions(sampleSessions);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(courses.map(c => c.category))];
  const cities = [...new Set(sessions.map(s => s.city))];
  const modes = ['Online', 'Classroom', 'Hybrid'];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = !searchQuery || 
      session.course?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.course?.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || session.city === selectedCity;
    const matchesCategory = !selectedCategory || session.course?.category === selectedCategory;
    const matchesMode = !selectedMode || session.mode === selectedMode;
    
    return matchesSearch && matchesCity && matchesCategory && matchesMode;
  });

  const trainingControls = [
    'Competency-based courses',
    'Provider-led sessions',
    'Digital certificate records',
    'Corporate training workflows'
  ];

  const featuredCourses = courses.slice(0, 3);

  const coursesSchema = featuredCourses.map(course => 
    generateCourseSchema({
      name: course.title,
      description: course.description,
      provider: course.provider?.brand_name || 'SafetyWarden',
      duration: `PT${course.duration_hours}H`,
      price: course.price_per_seat,
      url: `https://safetywarden.com/training/course/${course.course_code}`
    })
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead
        title={seoPages.training.title}
        description={seoPages.training.description}
        keywords={seoPages.training.keywords}
        canonicalUrl="https://safetywarden.com/training"
      />
      
      <StructuredData data={coursesSchema} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Professional{' '}
              <span className="text-orange-400">Safety Training</span>{' '}
              & Certification
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              Industry-recognized safety training with digital certificates. 
              From fire wardens to NEBOSH - we've got you covered.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses: Fire Warden, NEBOSH, First Aid..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 text-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
            
            {/* Training Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {trainingControls.map((control, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-semibold text-orange-300 mb-2">0{index + 1}</div>
                  <div className="text-slate-300">{control}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Modes</option>
                {modes.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Popular Safety Courses
            </h2>
            <p className="text-xl text-slate-600">
              Industry-recognized training with digital certificates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                    <span className="text-sm text-slate-500">{course.duration_hours}h</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-navy-900 mb-3 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-600">{course.category}</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-navy-900">
                        ₹{course.price_per_seat.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-500">per person</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      by {course.provider?.brand_name}
                    </span>
                    <Link
                      to={`/training/course/${course.course_code}`}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Upcoming Training Sessions
            </h2>
            <p className="text-xl text-slate-600">
              {filteredSessions.length} sessions available in the next 3 months
            </p>
          </div>
          
          <div className="space-y-6">
            {filteredSessions.slice(0, 6).map((session) => (
              <div key={session.id} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-navy-900">
                        {session.course?.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        session.mode === 'Online' ? 'bg-blue-100 text-blue-800' :
                        session.mode === 'Classroom' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {session.mode}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {new Date(session.start_date).toLocaleDateString('en-IN')}
                          </p>
                          <p className="text-xs text-slate-500">
                            {session.start_time} - {session.end_time}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600">{session.city}, {session.state}</p>
                          {session.venue && (
                            <p className="text-xs text-slate-500">{session.venue}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600">
                            {session.available_seats} seats available
                          </p>
                          <p className="text-xs text-slate-500">
                            Max {session.max_seats} participants
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600">
                      Provider: {session.provider?.brand_name}
                    </p>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6 text-right">
                    <div className="text-2xl font-bold text-navy-900 mb-2">
                      ₹{session.price_per_seat.toLocaleString()}
                    </div>
                    <div className="space-y-2">
                      <Link
                        to={`/training/sessions/${session.session_code}`}
                        className="block bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Enroll Now
                      </Link>
                      <Link
                        to={`/training/course/${session.course?.course_code}`}
                        className="block border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Course Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSessions.length > 6 && (
            <div className="text-center mt-8">
              <Link
                to="/training/sessions"
                className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>View All Sessions</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Why Choose SafetyWarden Training?
            </h2>
            <p className="text-xl text-slate-600">
              Structured training workflows with digital certificates and corporate coordination
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Certified Trainers</h3>
              <p className="text-sm text-slate-600">
                NEBOSH, IOSH, and NFPA certified trainers with industry experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icon.png" alt="Digital Certificates" className="h-8 w-auto" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Digital Certificates</h3>
              <p className="text-sm text-slate-600">
                QR-verifiable certificates with structured training records
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Corporate Training</h3>
              <p className="text-sm text-slate-600">
                Customized training programs for your organization's needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-slate-600">
                Online, classroom, and hybrid options to fit your schedule
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Certified?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Build structured safety training records for teams, sites and compliance reviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/training/sessions"
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Browse All Sessions
            </Link>
            <Link
              to="/training/corporate"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Corporate Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingHome;
