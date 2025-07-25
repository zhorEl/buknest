import React, { useState } from 'react';
import { Calendar, User, MessageCircle, TrendingUp, Bell, Plus, Clock, Star, FileText, Baby, Heart, Activity, BookOpen, Users, Phone, MapPin, AlertCircle } from 'lucide-react';

interface ParentDashboardProps {
  user: any;
  onPageChange: (page: string) => void;
}

export default function ParentDashboard({ user, onPageChange }: ParentDashboardProps) {
  const [selectedChild, setSelectedChild] = useState('emma');

  const children = [
    {
      id: 'emma',
      name: 'Emma',
      age: 6,
      dateOfBirth: '2018-03-15',
      conditions: ['Autism Spectrum Disorder', 'Speech Delay', 'Sensory Processing'],
      nextSession: '2024-01-15 10:00 AM',
      recentProgress: 'Improved eye contact and verbal responses',
      avatar: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
      progressScore: 85,
      totalSessions: 24,
      favoriteActivities: ['Drawing', 'Music therapy', 'Sensory play'],
      emergencyContact: 'Dr. Sarah Johnson - (555) 123-4567'
    },
    {
      id: 'alex',
      name: 'Alex',
      age: 4,
      dateOfBirth: '2020-07-22',
      conditions: ['ADHD', 'Language Delay'],
      nextSession: '2024-01-16 2:00 PM',
      recentProgress: 'Better focus during activities',
      avatar: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400',
      progressScore: 72,
      totalSessions: 18,
      favoriteActivities: ['Physical therapy', 'Story time'],
      emergencyContact: 'Dr. Michael Chen - (555) 987-6543'
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      professional: 'Dr. Sarah Johnson',
      type: 'Speech Therapy',
      date: '2024-01-15',
      time: '10:00 AM',
      sessionType: 'Home Visit'
    },
    {
      id: '2',
      professional: 'Maria Rodriguez',
      type: 'Occupational Therapy',
      date: '2024-01-18',
      time: '2:00 PM',
      sessionType: 'Online'
    },
    {
      id: '3',
      professional: 'Dr. Michael Chen',
      type: 'Developmental Assessment',
      date: '2024-01-20',
      time: '11:00 AM',
      sessionType: 'Home Visit'
    }
  ];

  const recentReports = [
    {
      id: '1',
      title: 'Speech Therapy Progress Report',
      professional: 'Dr. Sarah Johnson',
      date: '2024-01-10',
      summary: 'Significant improvement in articulation and vocabulary expansion.'
    },
    {
      id: '2',
      title: 'Occupational Therapy Assessment',
      professional: 'Maria Rodriguez',
      date: '2024-01-08',
      summary: 'Fine motor skills showing steady progress with recommended exercises.'
    },
    {
      id: '3',
      title: 'Monthly Progress Summary',
      professional: 'Dr. Michael Chen',
      date: '2024-01-05',
      summary: 'Overall development tracking shows positive trends in social interaction.'
    }
  ];

  const milestones = [
    {
      id: '1',
      title: 'First Words',
      description: 'Emma said her first clear word "mama"',
      date: '2024-01-12',
      achieved: true
    },
    {
      id: '2',
      title: 'Eye Contact',
      description: 'Maintained eye contact for 5+ seconds',
      date: '2024-01-10',
      achieved: true
    },
    {
      id: '3',
      title: 'Social Play',
      description: 'Engaged in parallel play with peers',
      date: '2024-01-15',
      achieved: false
    }
  ];

  const dailyActivities = [
    { time: '8:00 AM', activity: 'Morning routine with visual schedule', completed: true },
    { time: '10:00 AM', activity: 'Speech therapy exercises', completed: true },
    { time: '2:00 PM', activity: 'Sensory break time', completed: false },
    { time: '4:00 PM', activity: 'Social story reading', completed: false }
  ];

  const currentChild = children.find(child => child.id === selectedChild);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 rounded-3xl p-8 text-white mb-8 font-handwritten">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-white text-opacity-90 text-lg">Here's what's happening with your child's therapy journey</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Child Selector */}
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-8 border border-white border-opacity-50 font-handwritten">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Your Children</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                  selectedChild === child.id
                    ? 'border-purple-400 bg-purple-50 shadow-lg'
                    : 'border-pink-200 hover:bg-pink-50 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <span className="font-bold text-purple-800 text-lg">{child.name}</span>
                    <p className="text-sm text-purple-600 font-readable">Age {child.age}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-purple-700 font-readable">
                    <Activity className="h-4 w-4 mr-2" />
                    Progress: {child.progressScore}%
                  </div>
                  <div className="text-xs text-purple-600 font-readable">
                    {child.conditions.slice(0, 2).join(', ')}
                    {child.conditions.length > 2 && ` +${child.conditions.length - 2} more`}
                  </div>
                </div>
              </button>
            ))}
            <button className="p-6 rounded-2xl border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center">
              <Plus className="h-6 w-6 text-purple-400 mr-2" />
              <span className="text-purple-600 font-semibold">Add Child</span>
            </button>
          </div>
        </div>

        {currentChild && (
          <>
            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-pink-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600 font-readable">Next Session</p>
                    <p className="text-lg font-bold text-purple-800">Tomorrow</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600 font-readable">Progress Score</p>
                    <p className="text-lg font-bold text-purple-800">{currentChild.progressScore}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600 font-readable">Total Sessions</p>
                    <p className="text-lg font-bold text-purple-800">{currentChild.totalSessions}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                <div className="flex items-center">
                  <Baby className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600 font-readable">Age</p>
                    <p className="text-lg font-bold text-purple-800">{currentChild.age} years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="xl:col-span-2 space-y-8">
                {/* Upcoming Sessions */}
                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-purple-800">Upcoming Sessions</h3>
                    <button
                      onClick={() => onPageChange('bookings')}
                      className="text-purple-600 hover:text-purple-700 font-bold"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="border border-purple-200 rounded-2xl p-4 bg-purple-50 bg-opacity-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-purple-800">{session.professional}</h4>
                            <p className="text-purple-600 text-sm font-semibold">{session.type}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
                            {session.sessionType}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-purple-700 font-readable">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(session.date).toLocaleDateString()} at {session.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Activities */}
                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                  <h3 className="text-2xl font-bold text-purple-800 mb-6">Today's Activities</h3>
                  
                  <div className="space-y-4">
                    {dailyActivities.map((activity, index) => (
                      <div key={index} className={`flex items-center p-3 rounded-2xl ${
                        activity.completed ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
                      }`}>
                        <div className={`w-4 h-4 rounded-full mr-3 ${
                          activity.completed ? 'bg-green-500' : 'bg-orange-400'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-purple-800">{activity.time}</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-readable ${
                              activity.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {activity.completed ? 'Completed' : 'Pending'}
                            </span>
                          </div>
                          <p className="text-sm text-purple-700 font-readable">{activity.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Child Profile Card */}
                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                  <div className="flex items-center mb-6">
                    <img
                      src={currentChild.avatar}
                      alt={currentChild.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-purple-800">{currentChild.name}</h3>
                      <p className="text-purple-600 font-readable">Born: {new Date(currentChild.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-bold text-purple-600 font-readable">Conditions</label>
                      <div className="mt-2 space-y-2">
                        {currentChild.conditions.map((condition, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full mr-2 mb-2 font-semibold font-readable"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-bold text-purple-600 font-readable">Favorite Activities</label>
                      <div className="mt-2 space-y-2">
                        {currentChild.favoriteActivities.map((activity, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full mr-2 mb-2 font-semibold font-readable"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-bold text-purple-600 font-readable">Recent Progress</label>
                      <p className="text-sm text-purple-700 mt-1 font-readable">{currentChild.recentProgress}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-bold text-purple-600 font-readable">Emergency Contact</label>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 text-purple-600 mr-2" />
                        <p className="text-sm text-purple-700 font-readable">{currentChild.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4">Recent Milestones</h3>
                  
                  <div className="space-y-3">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className={`p-3 rounded-2xl border ${
                        milestone.achieved 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-orange-50 border-orange-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-purple-800">{milestone.title}</h4>
                          {milestone.achieved ? (
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          ) : (
                            <Clock className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <p className="text-sm text-purple-700">{milestone.description}</p>
                        <p className="text-xs text-purple-600 mt-1 font-readable">{new Date(milestone.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4">Quick Actions</h3>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => onPageChange('bookings')}
                      className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book New Session
                    </button>
                    
                    <button
                      onClick={() => onPageChange('assessment')}
                      className="w-full bg-gradient-to-r from-purple-400 to-orange-400 text-white px-4 py-3 rounded-2xl font-bold hover:from-purple-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      AI Assessment
                    </button>
                    
                    <button
                      onClick={() => onPageChange('professionals')}
                      className="w-full bg-white bg-opacity-80 border-2 border-purple-300 text-purple-700 px-4 py-3 rounded-2xl font-bold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Find Professionals
                    </button>
                    
                    <button className="w-full bg-white bg-opacity-80 border-2 border-pink-300 text-pink-700 px-4 py-3 rounded-2xl font-bold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center">
                      <FileText className="h-5 w-5 mr-2" />
                      View Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}