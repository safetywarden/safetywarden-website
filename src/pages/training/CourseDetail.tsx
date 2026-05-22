import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Award, Calendar, MapPin, Star, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Course, TrainingSession } from '../../types/training';

const CourseDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      loadCourseData();
    }
  }, [code]);

  const loadCourseData = async () => {
    setLoading(true);
    
    try {
      // Load course details
      const { data: courseData } = await supabase
        .from('courses')
        .select(`
          *,
          provider:training_providers(*)
        `)
        .eq('course_code', code)
        .eq('active', true)
        .single();

      if (courseData) {
        setCourse(courseData);
        
        // Load upcoming sessions for this course
        const { data: sessionsData } = await supabase
          .from('training_sessions')
          .select(`
            *,
            provider:training_providers(*)
          `)
          .eq('course_id', courseData.id)
          .eq('status', 'Published')
          .gte('start_date', new Date().toISOString().split('T')[0])
          .order('start_date');

        setSessions(sessionsData || []);
      }
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Course Not Found</h1>
          <Link to="/training" className="text-orange-600 hover:text-orange-700">
            ← Back to Training
          </Link>
        </div>
      </div>
    );
  }

  const bulkTiers = course.bulk_discount_tiers as any[] || [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/training"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Training</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
                <span className="text-sm text-slate-500">{course.category}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-slate-600 mb-6">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-700">{course.duration_hours} hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-700">Max {course.max_participants} participants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-700">{course.certification_validity_months} months validity</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-slate-600">4.8 (124 reviews)</span>
                </div>
                <span className="text-slate-600">
                  by {course.provider?.brand_name}
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-navy-900 mb-2">
                    ₹{course.price_per_seat.toLocaleString()}
                  </div>
                  <div className="text-slate-500">per person</div>
                </div>
                
                {bulkTiers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Volume Discounts</h4>
                    <div className="space-y-2">
                      {bulkTiers.map((tier, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-slate-600">{tier.min_seats}+ seats:</span>
                          <span className="font-medium text-emerald-600">
                            {tier.discount_percent}% off
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Link
                    to={`/training/sessions?course=${course.course_code}`}
                    className="block w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold text-center transition-colors"
                  >
                    View Available Sessions
                  </Link>
                  <button className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 py-3 px-4 rounded-lg font-semibold transition-colors">
                    Request Corporate Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Learning Outcomes</h2>
              <div className="space-y-3">
                {course.learning_outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Prerequisites</h2>
              {course.prerequisites.length > 0 ? (
                <div className="space-y-3">
                  {course.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">{prereq}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No prerequisites required</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      {sessions.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-8">Upcoming Sessions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <div key={session.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.mode === 'Online' ? 'bg-blue-100 text-blue-800' :
                      session.mode === 'Classroom' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {session.mode}
                    </span>
                    <span className="text-sm text-slate-500">
                      {session.available_seats} seats left
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">
                        {new Date(session.start_date).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">
                        {session.city}, {session.state}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-navy-900 mb-3">
                      ₹{session.price_per_seat.toLocaleString()}
                    </div>
                    <Link
                      to={`/training/sessions/${session.session_code}`}
                      className="block bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Course Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Course Structure</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-900">Total Duration</span>
                  <span className="text-slate-700">{course.duration_hours} hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-900">Theory</span>
                  <span className="text-slate-700">{course.theory_hours} hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-900">Practical</span>
                  <span className="text-slate-700">{course.practical_hours} hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-900">Pass Mark (Theory)</span>
                  <span className="text-slate-700">{course.pass_mark_theory}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-900">Pass Mark (Practical)</span>
                  <span className="text-slate-700">{course.pass_mark_practical}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Certification</h2>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="h-8 w-8 text-emerald-600" />
                  <div>
                    <h3 className="font-semibold text-emerald-900">Digital Certificate</h3>
                    <p className="text-sm text-emerald-700">QR-verifiable and blockchain-secured</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-emerald-800">
                  <p>• Valid for {course.certification_validity_months} months</p>
                  <p>• Instantly downloadable upon completion</p>
                  <p>• Employer-verifiable with QR code</p>
                  <p>• Automatic renewal reminders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Info */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-8">Training Provider</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-navy-100 rounded-xl flex items-center justify-center">
                <Award className="h-8 w-8 text-navy-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-navy-900 mb-2">
                  {course.provider?.brand_name}
                </h3>
                <p className="text-slate-600 mb-4">
                  {course.provider?.legal_name}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Location</h4>
                    <p className="text-sm text-slate-600">
                      {course.provider?.city}, {course.provider?.state}, {course.provider?.country}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.provider?.certifications.map((cert, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {course.provider?.website && (
                  <a
                    href={course.provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Visit Provider Website →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;