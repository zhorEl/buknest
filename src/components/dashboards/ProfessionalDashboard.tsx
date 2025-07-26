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
        <div className="bg-gradient-to-r from-[#d698ab] via-[#CB748E] to-[#698a60] rounded-3xl p-8 text-white mb-8 font-handwritten">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-white text-opacity-90 text-lg font-sans">You have {upcomingSessions.length} sessions scheduled today</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
                <img src="/icon.svg" alt="BukNEST Logo" className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 font-handwritten">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-[#CB748E]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 font-sans">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalSessions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 font-handwritten">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-[#698a60]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 font-sans">Today</p>
                <p className="text-2xl font-bold text-gray-800">{stats.upcomingSessions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 font-handwritten">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-[#698a60]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 font-sans">Earnings</p>
                <p className="text-2xl font-bold text-gray-800">₱{stats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 font-handwritten">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 font-sans">Rating</p>
                <p className="text-2xl font-bold text-gray-800">{stats.averageRating}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 font-handwritten">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-gray-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 font-sans">Clients</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalClients}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 font-handwritten">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-gray-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 font-sans">This Week</p>
                <p className="text-2xl font-bold text-gray-800">{stats.thisWeekSessions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-10">
            {/* Today's Schedule */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 font-handwritten">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Today's Schedule</h3>
                <button className="text-[#CB748E] hover:text-[#d698ab] font-bold font-sans">
                  View Calendar
                </button>
              </div>
              
              <div className="space-y-6">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-800">{session.childName}</h4>
                        <p className="text-sm text-gray-600 font-semibold font-sans">Parent: {session.parentName}</p>
                        <div className="flex items-center mt-2">
                          <Phone className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-600 font-sans">{session.parentPhone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{session.time}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          session.type === 'home-visit' 
                            ? 'bg-pink-100 text-[#CB748E] font-semibold' 
                            : 'bg-gray-100 text-gray-800 font-semibold'
                        } font-sans`}>
                          {session.type === 'home-visit' ? 'Home Visit' : 'Online'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-[#698a60] font-sans">
                        <Clock className="h-4 w-4 mr-1" />
                        {session.duration} minutes
                      </div>
                      <div className="flex space-x-2">
                        {session.type === 'online' ? (
                          <button className="px-3 py-1 bg-[#CB748E] text-white text-sm rounded-full hover:bg-[#d698ab] transition-colors font-semibold flex items-center font-sans">
                            <Video className="h-3 w-3 mr-1" />
                            Join Call
                          </button>
                        ) : (
                          <button className="px-3 py-1 bg-[#CB748E] text-white text-sm rounded-full hover:bg-[#d698ab] transition-colors font-semibold flex items-center font-sans">
                            <Home className="h-3 w-3 mr-1" />
                            Navigate
                          </button>
                        )}
                        <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-full hover:bg-gray-50 transition-colors font-semibold font-sans">
                          Reschedule
                        </button>
                      </div>
                    </div>
                    
                    {session.notes && (
                      <div className="mt-4 p-3 bg-gray-100 rounded-xl text-sm text-gray-800 font-sans">
                        <strong>Notes:</strong> {session.notes}
                      </div>
                    )}
                    
                    {session.address && (
                      <div className="mt-3 flex items-center text-xs text-gray-600 font-sans">
                        <Home className="h-3 w-3 mr-1" />
                        {session.address}
                      </div>
                    )}
                    
                    {session.meetingLink && (
                      <div className="mt-3 flex items-center text-xs text-gray-600 font-sans">
                        <Video className="h-3 w-3 mr-1" />
                        Meeting ready
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Client Progress Overview */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 font-handwritten">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Client Progress</h3>
              
              <div className="space-y-6">
                {clientProgress.map((client) => (
                  <div key={client.id} className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-800">{client.childName}</h4>
                        <p className="text-sm text-gray-600 font-semibold font-sans">{client.condition}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <div className="w-12 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className="h-2 bg-[#CB748E] rounded-full"
                              style={{ width: `${client.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-800">{client.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-xs text-gray-600 font-sans">
                        <Calendar className="h-3 w-3 mr-1" />
                        Last session: {new Date(client.lastSession).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-700 font-sans">
                        <strong>Next goal:</strong> {client.nextGoal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Schedule Overview */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 font-handwritten">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">This Week's Overview</h3>
              
              <div className="grid grid-cols-5 gap-6">
                {weeklySchedule.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className={`p-6 rounded-2xl ${
                      day.sessions > 0 
                        ? 'bg-pink-50 border border-pink-200' 
                        : 'bg-gray-100 border border-gray-200'
                    }`}>
                      <h4 className="font-bold text-gray-800 text-sm mb-3">{day.day}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          <Calendar className="h-3 w-3 text-gray-600 mr-1" />
                          <span className="text-sm font-semibold text-gray-800 font-sans">{day.sessions}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <DollarSign className="h-3 w-3 text-gray-600 mr-1" />
                          <span className="text-xs text-gray-700 font-semibold font-sans">₱{day.earnings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-10">
            {/* Performance Metrics */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 font-handwritten">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Performance</h3>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-1 text-sm font-semibold font-sans"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              
              <div className="space-y-6">
                <div className="text-center p-6 bg-pink-50 rounded-2xl border border-pink-200">
                  <TrendingUp className="h-8 w-8 text-[#CB748E] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-[#CB748E]">{stats.responseRate}%</p>
                  <p className="text-sm text-[#CB748E] font-semibold font-sans">Response Rate</p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <CheckCircle className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-gray-600">{stats.completionRate}%</p>
                  <p className="text-sm text-gray-700 font-semibold font-sans">Session Completion</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 font-handwritten">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Messages</h3>
                <button className="text-[#CB748E] hover:text-[#d698ab] font-bold font-sans">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className={`p-4 rounded-2xl border ${
                    message.unread
                      ? 'bg-pink-50 border-pink-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-sm text-gray-800 font-sans">{message.from}</p>
                      <span className="text-xs text-gray-600 font-sans">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 font-sans">{message.message}</p>
                    {message.unread && (
                      <div className="w-2 h-2 bg-[#CB748E] rounded-full mt-3"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Reports */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 font-handwritten">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Pending Reports</h3>
              
              <div className="space-y-4">
                {pendingReports.map((report) => (
                  <div key={report.id} className="border border-yellow-200 bg-yellow-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="font-bold text-sm text-gray-800 font-sans">{report.childName}</span>
                      </div>
                      <span className="text-xs text-yellow-600 font-semibold font-sans">Due: {new Date(report.dueDate).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-700 font-semibold font-sans">{report.type}</p>
                    <p className="text-xs text-gray-600 font-sans mt-1">Session: {new Date(report.sessionDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-yellow-600 text-white px-4 py-3 rounded-2xl font-bold hover:bg-yellow-700 transition-all duration-300 font-sans">
                Complete Reports
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 font-handwritten">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-4 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 flex items-center justify-center font-sans">
                  <Calendar className="h-4 w-4 mr-2" />
                  Update Availability
                </button>
                
                <button className="w-full bg-gray-600 text-white px-4 py-3 rounded-2xl font-bold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center font-sans">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Parents
                </button>
                
                <button className="w-full bg-white border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center font-sans">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
                
                <button className="w-full bg-white border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center font-sans">
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