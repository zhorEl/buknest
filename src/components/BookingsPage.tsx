import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Home, User, CheckCircle, XCircle, AlertCircle, Plus, Filter, Search, Phone, Mail, Star, ChevronDown, Edit, Trash2, ChevronUp, Users, Grid, List } from 'lucide-react';

interface BookingsPageProps {
  onPageChange: (page: string) => void;
  user?: any;
}

export default function BookingsPage({ onPageChange, user }: BookingsPageProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'book'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedChild, setSelectedChild] = useState('all');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'thumbnail' | 'table'>('thumbnail');

  const children = [
    { id: 'emma', name: 'Emma', age: 6 },
    { id: 'alex', name: 'Alex', age: 4 }
  ];

  const upcomingBookings = [
    {
      id: '1',
      professionalName: 'Dr. Sarah Johnson',
      professionalTitle: 'Speech-Language Pathologist',
      professionalAvatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: 60,
      type: 'home-visit',
      status: 'scheduled',
      childName: 'Emma',
      address: '123 Main St, Bukidnon, Philippines',
      notes: 'Focus on articulation exercises and vocabulary building',
      professionalPhone: '(555) 123-4567',
      professionalEmail: 'sarah.johnson@buknest.com',
      rating: 4.9,
      price: 1200
    },
    {
      id: '2',
      professionalName: 'Maria Rodriguez',
      professionalTitle: 'Occupational Therapist',
      professionalAvatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-18',
      time: '2:00 PM',
      duration: 45,
      type: 'online',
      status: 'scheduled',
      childName: 'Emma',
      meetingLink: 'https://meet.buknest.com/session-123',
      notes: 'Sensory integration activities and fine motor skills development',
      professionalPhone: '(555) 987-6543',
      professionalEmail: 'maria.rodriguez@buknest.com',
      rating: 4.8,
      price: 900
    },
    {
      id: '3',
      professionalName: 'Dr. Michael Chen',
      professionalTitle: 'Developmental Pediatrician',
      professionalAvatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-20',
      time: '11:00 AM',
      duration: 90,
      type: 'home-visit',
      status: 'confirmed',
      childName: 'Alex',
      address: '123 Main St, Bukidnon, Philippines',
      notes: 'Comprehensive developmental assessment and behavioral evaluation',
      professionalPhone: '(555) 456-7890',
      professionalEmail: 'michael.chen@buknest.com',
      rating: 4.9,
      price: 2500
    }
  ];

  const pastBookings = [
    {
      id: '4',
      professionalName: 'Dr. Michael Chen',
      professionalTitle: 'Developmental Pediatrician',
      professionalAvatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-08',
      time: '11:00 AM',
      duration: 60,
      type: 'online',
      status: 'completed',
      childName: 'Emma',
      notes: 'Initial assessment completed. Recommended speech therapy and occupational therapy.',
      rating: 4.9,
      price: 1500,
      feedback: 'Excellent session with detailed recommendations'
    },
    {
      id: '5',
      professionalName: 'Jennifer Williams',
      professionalTitle: 'Special Education Teacher',
      professionalAvatar: 'https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-05',
      time: '3:00 PM',
      duration: 45,
      type: 'home-visit',
      status: 'completed',
      childName: 'Emma',
      address: '123 Main St, Bukidnon, Philippines',
      notes: 'Educational assessment and learning plan development',
      rating: 4.7,
      price: 800,
      feedback: 'Very helpful session with practical strategies'
    }
  ];

  // Professional bookings data
  const professionalUpcomingBookings = [
    {
      id: '1',
      childName: 'Emma Johnson',
      parentName: 'Sarah Johnson',
      parentAvatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: 60,
      type: 'home-visit',
      status: 'scheduled',
      address: '123 Main St, Bukidnon, Philippines',
      notes: 'Focus on articulation exercises and vocabulary building',
      parentPhone: '(555) 123-4567',
      parentEmail: 'sarah.johnson@email.com',
      price: 1200,
      sessionType: 'Speech Therapy'
    },
    {
      id: '2',
      childName: 'Michael Chen',
      parentName: 'Lisa Chen',
      parentAvatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-18',
      time: '2:00 PM',
      duration: 45,
      type: 'online',
      status: 'confirmed',
      meetingLink: 'https://meet.buknest.com/session-123',
      notes: 'Sensory integration activities and fine motor skills development',
      parentPhone: '(555) 987-6543',
      parentEmail: 'lisa.chen@email.com',
      price: 900,
      sessionType: 'Occupational Therapy'
    },
    {
      id: '3',
      childName: 'Sofia Rodriguez',
      parentName: 'Maria Rodriguez',
      parentAvatar: 'https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-20',
      time: '11:00 AM',
      duration: 90,
      type: 'home-visit',
      status: 'scheduled',
      address: '456 Oak Ave, Bukidnon, Philippines',
      notes: 'Comprehensive developmental assessment and behavioral evaluation',
      parentPhone: '(555) 456-7890',
      parentEmail: 'maria.rodriguez@email.com',
      price: 2500,
      sessionType: 'Developmental Assessment'
    }
  ];

  const professionalPastBookings = [
    {
      id: '4',
      childName: 'Alex Thompson',
      parentName: 'Jennifer Thompson',
      parentAvatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-08',
      time: '4:00 PM',
      duration: 30,
      type: 'online',
      status: 'completed',
      notes: 'Follow-up session for behavioral strategies. Great progress shown.',
      parentPhone: '(555) 321-0987',
      parentEmail: 'jennifer.thompson@email.com',
      price: 600,
      sessionType: 'Behavioral Therapy',
      feedback: 'Excellent session with clear improvement in focus and attention'
    },
    {
      id: '5',
      childName: 'Emma Johnson',
      parentName: 'Sarah Johnson',
      parentAvatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-05',
      time: '10:00 AM',
      duration: 60,
      type: 'home-visit',
      status: 'completed',
      address: '123 Main St, Bukidnon, Philippines',
      notes: 'Initial speech therapy session. Baseline assessment completed.',
      parentPhone: '(555) 123-4567',
      parentEmail: 'sarah.johnson@email.com',
      price: 1200,
      sessionType: 'Speech Therapy',
      feedback: 'Very thorough assessment and clear recommendations provided'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'confirmed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Calendar component
  const CalendarView = () => {
    const today = new Date();
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Get bookings for current month
    const currentBookings = user?.role === 'professional' ? professionalUpcomingBookings : upcomingBookings;
    const bookingDates = currentBookings.map(booking => new Date(booking.date).getDate());
    
    const navigateMonth = (direction: number) => {
      setSelectedDate(new Date(currentYear, currentMonth + direction, 1));
    };
    
    // Calculate total calendar cells needed (6 weeks * 7 days = 42 cells)
    const totalCells = 42;
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    
    // Generate all calendar days
    const calendarDays = [];
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      calendarDays.push({
        day,
        isCurrentMonth: false,
        isPrevMonth: true,
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day)
      });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        day,
        isCurrentMonth: true,
        isPrevMonth: false,
        date: new Date(currentYear, currentMonth, day)
      });
    }
    
    // Next month's leading days
    const remainingCells = totalCells - calendarDays.length;
    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push({
        day,
        isCurrentMonth: false,
        isPrevMonth: false,
        date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day)
      });
    }
    
    return (
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white border-opacity-50 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 font-handwritten">Calendar View</h3>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center text-[#CB748E] hover:text-[#d698ab] font-bold font-sans"
          >
            {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
            {showCalendar ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </button>
        </div>
        
        {showCalendar && (
          <div className="space-y-4">
            {/* Calendar Header */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ←
              </button>
              <h4 className="text-xl font-bold text-gray-800 font-handwritten">
                {monthNames[currentMonth]} {currentYear}
              </h4>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                →
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center font-bold text-gray-600 p-2 font-sans">
                  {day}
                </div>
              ))}
              
              {/* All calendar days */}
              {calendarDays.map((dayInfo, index) => {
                const isToday = today.getDate() === dayInfo.day && 
                               today.getMonth() === dayInfo.date.getMonth() && 
                               today.getFullYear() === dayInfo.date.getFullYear();
                const hasBooking = dayInfo.isCurrentMonth && bookingDates.includes(dayInfo.day);
                
                return (
                  <div
                    key={index}
                    className={`p-3 text-center rounded-lg cursor-pointer transition-colors font-sans relative ${
                      !dayInfo.isCurrentMonth
                        ? 'text-gray-300'
                      : isToday
                        ? 'bg-[#CB748E] text-white font-bold'
                        : hasBooking
                        ? 'bg-green-100 text-green-800 font-semibold hover:bg-green-200'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {dayInfo.day}
                    {hasBooking && dayInfo.isCurrentMonth && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center space-x-6 text-sm font-sans">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#CB748E] rounded-full mr-2"></div>
                <span className="text-gray-600">Today</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                <span className="text-gray-600">Has Sessions</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const BookingCard = ({ booking, showActions = false, isPast = false, isProfessional = false }: { booking: any; showActions?: boolean; isPast?: boolean; isProfessional?: boolean }) => (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg border border-white border-opacity-50 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute -top-4 -right-4 opacity-5 animate-float">
        <img src="/pattern/pattern pink.svg" alt="" className="w-32 h-32" />
      </div>
      <div className="absolute -bottom-4 -left-4 opacity-4 animate-float" style={{ animationDelay: '2s' }}>
        <img src="/pattern/pattern light green.svg" alt="" className="w-28 h-28" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            {isProfessional ? (
              <>
                <img
                  src={booking.parentAvatar}
                  alt={booking.parentName}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-handwritten">{booking.childName}</h3>
                  <p className="text-[#CB748E] font-semibold font-sans">Parent: {booking.parentName}</p>
                  <p className="text-sm text-gray-600 font-sans">{booking.sessionType}</p>
                </div>
              </>
            ) : (
              <>
                <img
                  src={booking.professionalAvatar}
                  alt={booking.professionalName}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-handwritten">{booking.professionalName}</h3>
                  <p className="text-[#CB748E] font-semibold font-sans">{booking.professionalTitle}</p>
                  {booking.rating && (
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-bold text-gray-700 font-sans">{booking.rating}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="text-right">
            <div className={`flex items-center px-3 py-2 rounded-full text-sm font-bold border ${getStatusColor(booking.status)} font-sans`}>
              {getStatusIcon(booking.status)}
              <span className="ml-2 capitalize">{booking.status}</span>
            </div>
            {booking.price && (
              <p className="text-lg font-bold text-gray-800 mt-2 font-sans">₱{booking.price}</p>
            )}
          </div>
        </div>

        {/* Session Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-700 font-sans">
              <Calendar className="h-5 w-5 mr-3 text-[#CB748E]" />
              <span className="font-semibold">
                {new Date(booking.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <div className="flex items-center text-gray-700 font-sans">
              <Clock className="h-5 w-5 mr-3 text-[#698a60]" />
              <span className="font-semibold">{booking.time} ({booking.duration} minutes)</span>
            </div>

            <div className="flex items-center text-gray-700 font-sans">
              {booking.type === 'home-visit' ? (
                <>
                  <Home className="h-5 w-5 mr-3 text-[#CB748E]" />
                  <span className="font-semibold">Home Visit</span>
                </>
              ) : (
                <>
                  <Video className="h-5 w-5 mr-3 text-[#698a60]" />
                  <span className="font-semibold">Online Session</span>
                </>
              )}
            </div>

            <div className="flex items-center text-gray-700 font-sans">
              <User className="h-5 w-5 mr-3 text-gray-500" />
              <span className="font-semibold">{isProfessional ? `Child: ${booking.childName}` : `Child: ${booking.childName}`}</span>
            </div>
          </div>

          <div className="space-y-4">
            {booking.address && (
              <div className="flex items-start text-gray-700 font-sans">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-[#CB748E] flex-shrink-0" />
                <span className="font-semibold">{booking.address}</span>
              </div>
            )}

            {(isProfessional ? booking.parentPhone : booking.professionalPhone) && (
              <div className="flex items-center text-gray-700 font-sans">
                <Phone className="h-5 w-5 mr-3 text-[#698a60]" />
                <span className="font-semibold">{isProfessional ? booking.parentPhone : booking.professionalPhone}</span>
              </div>
            )}

            {(isProfessional ? booking.parentEmail : booking.professionalEmail) && (
              <div className="flex items-center text-gray-700 font-sans">
                <Mail className="h-5 w-5 mr-3 text-gray-500" />
                <span className="font-semibold">{isProfessional ? booking.parentEmail : booking.professionalEmail}</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="bg-gradient-to-r from-pink-50 to-green-50 rounded-2xl p-4 mb-6 border border-pink-100">
            <h4 className="font-bold text-gray-800 mb-2 font-handwritten">Session Notes:</h4>
            <p className="text-gray-700 font-sans leading-relaxed">{booking.notes}</p>
          </div>
        )}

        {/* Feedback for past sessions */}
        {isPast && booking.feedback && (
          <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-200">
            <h4 className="font-bold text-green-800 mb-2 font-handwritten">Your Feedback:</h4>
            <p className="text-green-700 font-sans leading-relaxed">{booking.feedback}</p>
          </div>
        )}

        {/* Actions */}
        {showActions && booking.status !== 'cancelled' && (
          <div className="flex flex-wrap gap-3">
            {booking.type === 'online' && booking.status === 'confirmed' && (
              <button className="flex-1 min-w-[200px] bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-6 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center font-sans">
                <Video className="h-5 w-5 mr-2" />
                Join Session
              </button>
            )}
            
            <button className="px-6 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-gray-700 font-bold flex items-center font-sans">
              <Edit className="h-4 w-4 mr-2" />
              Reschedule
            </button>
            
            <button className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-2xl hover:bg-red-50 transition-all duration-300 font-bold flex items-center font-sans">
              <Trash2 className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Determine which bookings to show based on user role
  const currentUpcomingBookings = user?.role === 'professional' ? professionalUpcomingBookings : upcomingBookings;
  const currentPastBookings = user?.role === 'professional' ? professionalPastBookings : pastBookings;

  const BookingForm = () => (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl border border-white border-opacity-50 p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute -top-4 -right-4 opacity-5 animate-float">
        <img src="/pattern/pattern light pink with green.svg" alt="" className="w-40 h-40" />
      </div>
      <div className="absolute -bottom-4 -left-4 opacity-4 animate-float" style={{ animationDelay: '3s' }}>
        <img src="/pattern/pattern dark green.svg" alt="" className="w-36 h-36" />
      </div>

      <div className="relative">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 font-handwritten text-center" style={{ color: '#CB748E' }}>
          Book a New Session
        </h3>
        
        <form className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 font-sans">Select Professional *</label>
              <div className="relative">
                <select className="w-full border-2 border-gray-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans appearance-none">
                  <option value="">Choose a professional...</option>
                  <option value="1">Dr. Sarah Johnson - Speech-Language Pathologist</option>
                  <option value="2">Maria Rodriguez - Occupational Therapist</option>
                  <option value="3">Dr. Michael Chen - Developmental Pediatrician</option>
                  <option value="4">Jennifer Williams - Special Education Teacher</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 font-sans">Child *</label>
              <div className="relative">
                <select className="w-full border-2 border-gray-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans appearance-none">
                  <option value="">Select child...</option>
                  <option value="emma">Emma (Age 6)</option>
                  <option value="alex">Alex (Age 4)</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 font-sans">Preferred Date *</label>
              <input
                type="date"
                className="w-full border-2 border-gray-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 font-sans">Preferred Time *</label>
              <div className="relative">
                <select className="w-full border-2 border-gray-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans appearance-none">
                  <option value="">Select time...</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 font-sans">Session Type *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex items-center p-6 border-2 border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-[#CB748E] transition-all duration-300 group">
                <input type="radio" name="sessionType" value="home-visit" className="mr-4 w-5 h-5 text-[#CB748E]" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Home className="h-6 w-6 text-[#CB748E] mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-gray-800 font-handwritten">Home Visit</span>
                  </div>
                  <p className="text-sm text-gray-600 font-sans">Professional comes to your home for personalized care</p>
                  <p className="text-xs text-[#CB748E] font-bold mt-2 font-sans">Starting from ₱800/session</p>
                </div>
              </label>
              
              <label className="flex items-center p-6 border-2 border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-[#698a60] transition-all duration-300 group">
                <input type="radio" name="sessionType" value="online" className="mr-4 w-5 h-5 text-[#698a60]" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Video className="h-6 w-6 text-[#698a60] mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-gray-800 font-handwritten">Online Session</span>
                  </div>
                  <p className="text-sm text-gray-600 font-sans">Secure video consultation from the comfort of your home</p>
                  <p className="text-xs text-[#698a60] font-bold mt-2 font-sans">Starting from ₱600/session</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 font-sans">Special Notes or Requests</label>
            <textarea
              rows={4}
              className="w-full border-2 border-gray-300 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans resize-none"
              placeholder="Any specific concerns, goals, or special requirements for this session..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl font-handwritten"
          >
            Book Session
          </button>
        </form>
      </div>
    </div>
  );

  const filteredUpcoming = currentUpcomingBookings.filter(booking => {
    const searchField = user?.role === 'professional' 
      ? `${booking.childName} ${booking.parentName} ${booking.sessionType}`.toLowerCase()
      : `${booking.professionalName} ${booking.professionalTitle}`.toLowerCase();
    const matchesSearch = searchField.includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesChild = user?.role === 'professional' || selectedChild === 'all' || booking.childName.toLowerCase() === selectedChild.toLowerCase();
    return matchesSearch && matchesStatus && matchesChild;
  });

  const filteredPast = currentPastBookings.filter(booking => {
    const searchField = user?.role === 'professional' 
      ? `${booking.childName} ${booking.parentName} ${booking.sessionType}`.toLowerCase()
      : `${booking.professionalName} ${booking.professionalTitle}`.toLowerCase();
    const matchesSearch = searchField.includes(searchTerm.toLowerCase());
    const matchesChild = user?.role === 'professional' || selectedChild === 'all' || booking.childName.toLowerCase() === selectedChild.toLowerCase();
    return matchesSearch && matchesChild;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-green-50 relative overflow-hidden">
      {/* Background Pattern Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10 animate-float">
          <img src="/pattern/pattern pink.svg" alt="" className="w-64 h-64" />
        </div>
        <div className="absolute top-40 right-16 opacity-8 animate-float" style={{ animationDelay: '2s' }}>
          <img src="/pattern/pattern light green.svg" alt="" className="w-56 h-56" />
        </div>
        <div className="absolute bottom-32 left-20 opacity-12 animate-float" style={{ animationDelay: '4s' }}>
          <img src="/pattern/pattern dark green.svg" alt="" className="w-48 h-48" />
        </div>
        <div className="absolute bottom-20 right-12 opacity-9 animate-float" style={{ animationDelay: '1s' }}>
          <img src="/pattern/pattern light pink with green.svg" alt="" className="w-52 h-52" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#d698ab] via-[#CB748E] to-[#698a60] text-white py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-4 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-x-12"></div>
        <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-full translate-y-10"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-5 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mr-4">
              <Calendar className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold font-handwritten">
                <span className="text-white">{user?.role === 'professional' ? 'My ' : 'My '}</span>
                <span className="text-yellow-300">{user?.role === 'professional' ? 'Sessions' : 'Bookings'}</span>
              </h1>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white text-opacity-95 mb-4 font-sans">
              {user?.role === 'professional' 
                ? 'Manage your client sessions and schedule'
                : 'Manage your therapy sessions and appointments'
              }
            </p>
            <p className="text-lg md:text-xl text-white text-opacity-90 leading-relaxed font-sans">
              {user?.role === 'professional'
                ? 'Keep track of your client sessions, manage your schedule, and review session history with families you support.'
                : 'Keep track of your upcoming sessions, review past appointments, and book new consultations with our certified professionals.'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Calendar View */}
        <CalendarView />
        
        {/* Header with Search and Filters */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white border-opacity-50 relative overflow-hidden">
          <div className="absolute -top-3 -right-3 opacity-5 animate-float">
            <img src="/pattern/pattern pink.svg" alt="" className="w-32 h-32" />
          </div>
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={user?.role === 'professional' ? 'Search clients...' : 'Search professionals...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans appearance-none pr-10"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                
                {user?.role !== 'professional' && (
                  <div className="relative">
                    <select
                      value={selectedChild}
                      onChange={(e) => setSelectedChild(e.target.value)}
                      className="border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans appearance-none pr-10"
                    >
                      <option value="all">All Children</option>
                      {children.map(child => (
                        <option key={child.id} value={child.name}>{child.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('thumbnail')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'thumbnail' 
                      ? 'bg-[#CB748E] text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-[#CB748E] text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 bg-gray-100 p-2 rounded-2xl max-w-md mx-auto">
              {[
                { id: 'upcoming', label: user?.role === 'professional' ? 'Upcoming' : 'Upcoming', count: filteredUpcoming.length },
                { id: 'past', label: user?.role === 'professional' ? 'Completed' : 'Past Sessions', count: filteredPast.length },
                ...(user?.role !== 'professional' ? [{ id: 'book', label: 'Book New', icon: Plus }] : [])
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center font-sans ${
                    activeTab === tab.id
                      ? 'bg-white text-[#CB748E] shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id ? 'bg-[#CB748E] text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {activeTab === 'upcoming' && (
            <>
              {filteredUpcoming.length > 0 ? (
                viewMode === 'thumbnail' ? (
                  <div className="space-y-8">
                    {filteredUpcoming.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} showActions={true} isProfessional={user?.role === 'professional'} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl border border-white border-opacity-50 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-pink-100 to-green-100">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">
                              {user?.role === 'professional' ? 'Client' : 'Professional'}
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Date & Time</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Type</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Price</th>
                            <th className="px-6 py-4 text-center text-sm font-bold text-green-800 font-handwritten">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredUpcoming.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <img
                                    src={user?.role === 'professional' ? booking.parentAvatar : booking.professionalAvatar}
                                    alt={user?.role === 'professional' ? booking.parentName : booking.professionalName}
                                    className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white shadow-lg"
                                  />
                                  <div>
                                    <div className="text-sm font-bold text-gray-900 font-handwritten">
                                      {user?.role === 'professional' ? booking.childName : booking.professionalName}
                                    </div>
                                    <div className="text-sm text-gray-600 font-sans">
                                      {user?.role === 'professional' ? `Parent: ${booking.parentName}` : booking.professionalTitle}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-bold text-gray-900 font-sans">
                                  {new Date(booking.date).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-gray-600 font-sans">{booking.time}</div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full font-semibold font-sans ${
                                  booking.type === 'home-visit' 
                                    ? 'bg-pink-100 text-[#CB748E]' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {booking.type === 'home-visit' ? 'Home Visit' : 'Online'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)} font-sans`}>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm font-bold text-gray-900 font-sans">₱{booking.price}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2 justify-center">
                                  {booking.type === 'online' && booking.status === 'confirmed' && (
                                    <button className="bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-3 py-1 rounded-lg font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 text-xs font-sans">
                                      Join
                                    </button>
                                  )}
                                  <button className="p-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Edit className="h-3 w-3 text-gray-700" />
                                  </button>
                                  <button className="p-1 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              )}
            </>
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white border-opacity-50 shadow-xl relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 opacity-10 animate-float">
                      <img src="/pattern/pattern light green.svg" alt="" className="w-32 h-32" />
                    </div>
                    <Calendar className="h-20 w-20 text-[#CB748E] mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-handwritten">
                      {user?.role === 'professional' ? 'No upcoming sessions' : 'No upcoming sessions'}
                    </h3>
                    <p className="text-gray-600 mb-6 font-sans">
                      {user?.role === 'professional' 
                        ? 'Your upcoming client sessions will appear here'
                        : 'Book your next session to continue your child\'s development journey'
                      }
                    </p>
                    {user?.role !== 'professional' && (
                      <button
                        onClick={() => setActiveTab('book')}
                        className="bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-8 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-handwritten"
                      >
                        Book Session
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <>
              {filteredPast.length > 0 ? (
                viewMode === 'thumbnail' ? (
                  <div className="space-y-8">
                    {filteredPast.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} isPast={true} isProfessional={user?.role === 'professional'} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl border border-white border-opacity-50 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-pink-100 to-green-100">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">
                              {user?.role === 'professional' ? 'Client' : 'Professional'}
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Date & Time</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Type</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Rating</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Price</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-green-800 font-handwritten">Feedback</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredPast.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <img
                                    src={user?.role === 'professional' ? booking.parentAvatar : booking.professionalAvatar}
                                    alt={user?.role === 'professional' ? booking.parentName : booking.professionalName}
                                    className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-white shadow-lg"
                                  />
                                  <div>
                                    <div className="text-sm font-bold text-gray-900 font-handwritten">
                                      {user?.role === 'professional' ? booking.childName : booking.professionalName}
                                    </div>
                                    <div className="text-sm text-gray-600 font-sans">
                                      {user?.role === 'professional' ? `Parent: ${booking.parentName}` : booking.professionalTitle}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-bold text-gray-900 font-sans">
                                  {new Date(booking.date).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-gray-600 font-sans">{booking.time}</div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs rounded-full font-semibold font-sans ${
                                  booking.type === 'home-visit' 
                                    ? 'bg-pink-100 text-[#CB748E]' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {booking.type === 'home-visit' ? 'Home Visit' : 'Online'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {booking.rating && (
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                    <span className="ml-1 text-xs text-gray-600 font-sans">({booking.rating})</span>
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm font-bold text-gray-900 font-sans">₱{booking.price}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-xs text-gray-600 font-sans max-w-xs truncate">
                                  {booking.feedback || 'No feedback provided'}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-16">
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white border-opacity-50 shadow-xl relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 opacity-10 animate-float">
                      <img src="/pattern/pattern light green.svg" alt="" className="w-32 h-32" />
                    </div>
                    <Clock className="h-20 w-20 text-[#698a60] mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-handwritten">
                      {user?.role === 'professional' ? 'No completed sessions' : 'No past sessions'}
                    </h3>
                    <p className="text-gray-600 font-sans">
                      {user?.role === 'professional' 
                        ? 'Your completed client sessions will appear here'
                        : 'Your completed sessions will appear here'
                      }
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'book' && user?.role !== 'professional' && <BookingForm />}
        </div>
      </div>
    </div>
  );
}