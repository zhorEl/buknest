import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Star, Clock, MessageCircle, FileText, TrendingUp, Bell, Award, BookOpen, Activity, Phone, Video, Home, CheckCircle, AlertCircle } from 'lucide-react';

interface ProfessionalDashboardProps {
  user: any;
  onPageChange: (page: string) => void;
}

export default function ProfessionalDashboard({ user, onPageChange }: ProfessionalDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const stats = {
    totalSessions: 156,
    upcomingSessions: 8,
    totalEarnings: 12450,
    averageRating: 4.8,
    responseRate: 95,
    completionRate: 98,
    totalClients: 32,
    thisWeekSessions: 12
  };

  const upcomingSessions = [
    {
      id: '1',
      childName: 'Emma Johnson',
      parentName: 'Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'home-visit',
      duration: 60,
      notes: 'Focus on articulation exercises',
      parentPhone: '(555) 123-4567',
      address: '123 Main St, Bukidnon'
    },
    {
      id: '2',
      childName: 'Michael Chen',
      parentName: 'Lisa Chen',
      date: '2024-01-15',
      time: '2:00 PM',
      type: 'online',
      duration: 45,
      notes: 'Continue with sensory integration activities',
      parentPhone: '(555) 987-6543',
      meetingLink: 'https://meet.buknest.com/session-456'
    },
    {
      id: '3',
      childName: 'Sofia Rodriguez',
      parentName: 'Maria Rodriguez',
      date: '2024-01-16',
      time: '11:00 AM',
      type: 'home-visit',
      duration: 60,
      notes: 'Initial assessment session',
      parentPhone: '(555) 456-7890',
      address: '456 Oak Ave, Bukidnon'
    },
    {
      id: '4',
      childName: 'Alex Thompson',
      parentName: 'Jennifer Thompson',
      date: '2024-01-15',
      time: '4:00 PM',
      type: 'online',
      duration: 30,
      notes: 'Follow-up session for behavioral strategies',
      parentPhone: '(555) 321-0987',
      meetingLink: 'https://meet.buknest.com/session-789'
    }
  ];

  const recentMessages = [
    {
      id: '1',
      from: 'Sarah Johnson',
      message: 'Thank you for the great session with Emma yesterday!',
      time: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      from: 'Lisa Chen',
      message: 'Can we reschedule tomorrow\'s session?',
      time: '5 hours ago',
      unread: true
    },
    {
      id: '3',
      from: 'Maria Rodriguez',
      message: 'Looking forward to our first session!',
      time: '1 day ago',
      unread: false
    },
    {
      id: '4',
      from: 'Jennifer Thompson',
      message: 'Alex showed great improvement today!',
      time: '2 days ago',
      unread: false
    }
  ];

  const pendingReports = [
    {
      id: '1',
      childName: 'Emma Johnson',
      sessionDate: '2024-01-12',
      type: 'Progress Report',
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      childName: 'Michael Chen',
      sessionDate: '2024-01-10',
      type: 'Assessment Report',
      dueDate: '2024-01-14'
    },
    {
      id: '3',
      childName: 'Alex Thompson',
      sessionDate: '2024-01-11',
      type: 'Behavioral Plan Update',
      dueDate: '2024-01-16'
    }
  ];

  const weeklySchedule = [
    { day: 'Monday', sessions: 4, earnings: 320 },
    { day: 'Tuesday', sessions: 3, earnings: 240 },
    { day: 'Wednesday', sessions: 2, earnings: 160 },
    { day: 'Thursday', sessions: 3, earnings: 240 },
    { day: 'Friday', sessions: 0, earnings: 0 }
  ];

  const clientProgress = [
    {
      id: '1',
      childName: 'Emma Johnson',
      condition: 'Speech Delay',
      progress: 85,
      lastSession: '2024-01-12',
      nextGoal: 'Improve articulation of /r/ sounds'
    },
    {
      id: '2',
      childName: 'Michael Chen',
      condition: 'Sensory Processing',
      progress: 72,
      lastSession: '2024-01-11',
      nextGoal: 'Increase tolerance to textures'
    },
    {
      id: '3',
      childName: 'Sofia Rodriguez',
      condition: 'Autism Spectrum',
      progress: 68,
      lastSession: '2024-01-10',
      nextGoal: 'Enhance social communication skills'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl p-8 text-white mb-8 font-handwritten">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-white text-opacity-90 text-lg">You have {upcomingSessions.length} sessions scheduled today</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
                <Award className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600 font-readable">Total Sessions</p>
                <p className="text-2xl font-bold text-purple-800">{stats.totalSessions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600 font-readable">Today</p>
                <p className="text-2xl font-bold text-purple-800">{stats.upcomingSessions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600 font-readable">Earnings</p>
                <p className="text-2xl font-bold text-purple-800">₱{stats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600 font-readable">Rating</p>
                <p className="text-2xl font-bold text-purple-800">{stats.averageRating}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600 font-readable">Clients</p>
                <p className="text-2xl font-bold text-purple-800">{stats.totalClients}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600 font-readable">This Week</p>
                <p className="text-2xl font-bold text-purple-800">{stats.thisWeekSessions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-purple-800">Today's Schedule</h3>
                <button className="text-purple-600 hover:text-purple-700 font-bold">
                  View Calendar
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border border-purple-200 rounded-2xl p-4 bg-purple-50 bg-opacity-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-purple-800">{session.childName}</h4>
                        <p className="text-sm text-purple-600 font-semibold font-readable">Parent: {session.parentName}</p>
                        <div className="flex items-center mt-1">
                          <Phone className="h-3 w-3 text-purple-500 mr-1" />
                          <span className="text-xs text-purple-600 font-readable">{session.parentPhone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-800">{session.time}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          session.type === 'home-visit' 
                            ? 'bg-blue-100 text-blue-800 font-semibold' 
                            : 'bg-green-100 text-green-800 font-semibold'
                        }`}>
                          {session.type === 'home-visit' ? 'Home Visit' : 'Online'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-purple-700 font-readable">
                        <Clock className="h-4 w-4 mr-1" />
                        {session.duration} minutes
                      </div>
                      <div className="flex space-x-2">
                        {session.type === 'online' ? (
                          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition-colors font-semibold flex items-center">
                            <Video className="h-3 w-3 mr-1" />
                            Join Call
                          </button>
                        ) : (
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors font-semibold flex items-center">
                            <Home className="h-3 w-3 mr-1" />
                            Navigate
                          </button>
                        )}
                        <button className="px-3 py-1 border border-purple-300 text-purple-700 text-sm rounded-full hover:bg-purple-50 transition-colors font-semibold">
                          Reschedule
                        </button>
                      </div>
                    </div>
                    
                    {session.notes && (
                      <div className="mt-3 p-2 bg-purple-100 rounded-xl text-sm text-purple-800 font-readable">
                        <strong>Notes:</strong> {session.notes}
                      </div>
                    )}
                    
                    {session.address && (
                      <div className="mt-2 flex items-center text-xs text-purple-600 font-readable">
                        <Home className="h-3 w-3 mr-1" />
                        {session.address}
                      </div>
                    )}
                    
                    {session.meetingLink && (
                      <div className="mt-2 flex items-center text-xs text-purple-600 font-readable">
                        <Video className="h-3 w-3 mr-1" />
                        Meeting ready
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Client Progress Overview */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
              <h3 className="text-2xl font-bold text-purple-800 mb-6">Client Progress</h3>
              
              <div className="space-y-4">
                {clientProgress.map((client) => (
                  <div key={client.id} className="border border-purple-200 rounded-2xl p-4 bg-purple-50 bg-opacity-30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-purple-800">{client.childName}</h4>
                        <p className="text-sm text-purple-600 font-semibold font-readable">{client.condition}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <div className="w-12 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                              style={{ width: `${client.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-purple-800">{client.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-purple-600 font-readable">
                        <Calendar className="h-3 w-3 mr-1" />
                        Last session: {new Date(client.lastSession).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-purple-700 font-readable">
                        <strong>Next goal:</strong> {client.nextGoal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Schedule Overview */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
              <h3 className="text-2xl font-bold text-purple-800 mb-6">This Week's Overview</h3>
              
              <div className="grid grid-cols-5 gap-4">
                {weeklySchedule.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className={`p-4 rounded-2xl ${
                      day.sessions > 0 
                        ? 'bg-gradient-to-br from-green-100 to-blue-100 border border-green-200' 
                        : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <h4 className="font-bold text-purple-800 text-sm mb-2">{day.day}</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center">
                          <Calendar className="h-3 w-3 text-purple-600 mr-1" />
                          <span className="text-sm font-semibold text-purple-800 font-readable">{day.sessions}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <DollarSign className="h-3 w-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-700 font-semibold font-readable">₱{day.earnings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Performance Metrics */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-purple-800">Performance</h3>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="border border-purple-300 rounded-xl px-3 py-1 text-sm font-semibold"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl border border-green-200">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{stats.responseRate}%</p>
                  <p className="text-sm text-purple-700 font-semibold font-readable">Response Rate</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl border border-blue-200">
                  <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">{stats.completionRate}%</p>
                  <p className="text-sm text-purple-700 font-semibold font-readable">Session Completion</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-purple-800">Messages</h3>
                <button className="text-purple-600 hover:text-purple-700 font-bold">
                  View All
                </button>
              </div>
              
              <div className="space-y-3">
                {recentMessages.map((message) => (
                  <div key={message.id} className={`p-3 rounded-2xl border ${
                    message.unread 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-purple-50 border-purple-200'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-sm text-purple-800 font-readable">{message.from}</p>
                      <span className="text-xs text-purple-600 font-readable">{message.time}</span>
                    </div>
                    <p className="text-sm text-purple-700 font-readable">{message.message}</p>
                    {message.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Reports */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Pending Reports</h3>
              
              <div className="space-y-3">
                {pendingReports.map((report) => (
                  <div key={report.id} className="border border-orange-200 bg-orange-50 rounded-2xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="font-bold text-sm text-purple-800 font-readable">{report.childName}</span>
                      </div>
                      <span className="text-xs text-orange-600 font-semibold font-readable">Due: {new Date(report.dueDate).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-purple-700 font-semibold font-readable">{report.type}</p>
                    <p className="text-xs text-purple-600 font-readable">Session: {new Date(report.sessionDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-2xl font-bold hover:from-orange-500 hover:to-red-500 transition-all duration-300">
                Complete Reports
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white border-opacity-50 font-handwritten">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 rounded-2xl font-bold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Update Availability
                </button>
                
                <button className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-2xl font-bold hover:from-green-500 hover:to-blue-500 transition-all duration-300 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Parents
                </button>
                
                <button className="w-full bg-white bg-opacity-80 border-2 border-purple-300 text-purple-700 px-4 py-2 rounded-2xl font-bold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
                
                <button className="w-full bg-white bg-opacity-80 border-2 border-pink-300 text-pink-700 px-4 py-2 rounded-2xl font-bold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Resource Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}