import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Filter, Search, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TrainingSession } from '../../types/training';

const SessionsList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    loadSessions();
    
    // Set initial filters from URL params
    const course = searchParams.get('course');
    if (course) {
      setSearchQuery(course);
    }
  }, [searchParams]);

  const loadSessions = async () => {
    setLoading(true);
    
    try {
      const { data } = await supabase
        .from('training_sessions')
        .select(`
          *,
          course:courses(*),
          provider:training_providers(*)
        `)
        .eq('status', 'Published')
        .gte('start_date', new Date().toISOString().split('T')[0])
        .order('start_date');

      setSessions(data || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const cities = [...new Set(sessions.map(s => s.city))];
  const categories = [...new Set(sessions.map(s => s.course?.category).filter(Boolean))];
  const modes = ['Online', 'Classroom', 'Hybrid'];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = !searchQuery || 
      session.course?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.course?.course_code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || session.city === selectedCity;
    const matchesMode = !selectedMode || session.mode === selectedMode;
    const matchesCategory = !selectedCategory || session.course?.category === selectedCategory;
    
    let matchesDate = true;
    if (dateFilter) {
      const sessionDate = new Date(session.start_date);
      const today = new Date();
      const filterDate = new Date(dateFilter);
      
      switch (dateFilter) {
        case 'this_week':
          const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          matchesDate = sessionDate >= today && sessionDate <= weekEnd;
          break;
        case 'this_month':
          const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          matchesDate = sessionDate >= today && sessionDate <= monthEnd;
          break;
        case 'next_month':
          const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
          const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0);
          matchesDate = sessionDate >= nextMonthStart && sessionDate <= nextMonthEnd;
          break;
      }
    }
    
    return matchesSearch && matchesCity && matchesMode && matchesCategory && matchesDate;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Training Sessions
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Find and enroll in upcoming safety training sessions across India and GCC
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            
            <div>
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
            
            <div>
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
            
            <div>
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
            
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full py-3 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Dates</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="next_month">Next Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredSessions.length} of {sessions.length} training sessions
          </p>
        </div>

        {/* Sessions List */}
        <div className="space-y-6">
          {filteredSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
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
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.course?.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      session.course?.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {session.course?.level}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {session.course?.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">
                          {session.course?.duration_hours}h total
                        </p>
                        <p className="text-xs text-slate-500">
                          {session.course?.theory_hours}h theory, {session.course?.practical_hours}h practical
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 lg:mt-0 lg:ml-6 text-right">
                  <div className="text-2xl font-bold text-navy-900 mb-2">
                    ₹{session.price_per_seat.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-500 mb-4">per person</div>
                  
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

        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No sessions found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search criteria or check back later for new sessions
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('');
                setSelectedMode('');
                setSelectedCategory('');
                setDateFilter('');
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsList;