import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Home, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface BookingsPageProps {
  onPageChange: (page: string) => void;
}

export default function BookingsPage({ onPageChange }: BookingsPageProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'book'>('upcoming');

  const upcomingBookings = [
    {
      id: '1',
      professionalName: 'Dr. Sarah Johnson',
      professionalTitle: 'Speech-Language Pathologist',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'home-visit',
      status: 'scheduled',
      childName: 'Emma',
      address: '123 Main St, New York, NY',
      notes: 'Focus on articulation exercises'
    },
    {
      id: '2',
      professionalName: 'Maria Rodriguez',
      professionalTitle: 'Occupational Therapist',
      date: '2024-01-18',
      time: '2:00 PM',
      type: 'online',
      status: 'scheduled',
      childName: 'Emma',
      meetingLink: 'https://meet.therapyconnect.com/session-123'
    }
  ];

  const pastBookings = [
    {
      id: '3',
      professionalName: 'Dr. Michael Chen',
      professionalTitle: 'Developmental Pediatrician',
      date: '2024-01-08',
      time: '11:00 AM',
      type: 'online',
      status: 'completed',
      childName: 'Emma',
      notes: 'Initial assessment completed. Recommended speech therapy.'
    },
    {
      id: '4',
      professionalName: 'Jennifer Williams',
      professionalTitle: 'Special Education Teacher',
      date: '2024-01-05',
      time: '3:00 PM',
      type: 'home-visit',
      status: 'completed',
      childName: 'Emma',
      address: '123 Main St, New York, NY'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const BookingCard = ({ booking, showActions = false }: { booking: any; showActions?: boolean }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{booking.professionalName}</h3>
          <p className="text-blue-600 text-sm">{booking.professionalTitle}</p>
        </div>
        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
          {getStatusIcon(booking.status)}
          <span className="ml-2 capitalize">{booking.status}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-3" />
          <span>{new Date(booking.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-3" />
          <span>{booking.time}</span>
        </div>

        <div className="flex items-center text-gray-600">
          {booking.type === 'home-visit' ? (
            <>
              <Home className="h-4 w-4 mr-3" />
              <span>Home Visit</span>
            </>
          ) : (
            <>
              <Video className="h-4 w-4 mr-3" />
              <span>Online Session</span>
            </>
          )}
        </div>

        {booking.address && (
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-3" />
            <span className="text-sm">{booking.address}</span>
          </div>
        )}

        <div className="flex items-center text-gray-600">
          <User className="h-4 w-4 mr-3" />
          <span>Child: {booking.childName}</span>
        </div>
      </div>

      {booking.notes && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">{booking.notes}</p>
        </div>
      )}

      {showActions && booking.status === 'scheduled' && (
        <div className="flex space-x-3">
          {booking.type === 'online' && (
            <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
              <Video className="h-4 w-4 mr-2" />
              Join Session
            </button>
          )}
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            Reschedule
          </button>
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  const BookingForm = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Book a New Session</h3>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Professional</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Choose a professional...</option>
            <option value="1">Dr. Sarah Johnson - Speech-Language Pathologist</option>
            <option value="2">Maria Rodriguez - Occupational Therapist</option>
            <option value="3">Dr. Michael Chen - Developmental Pediatrician</option>
            <option value="4">Jennifer Williams - Special Education Teacher</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Child</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select child...</option>
            <option value="emma">Emma (Age 6)</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select time...</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="sessionType" value="home-visit" className="mr-3" />
              <div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Home Visit</span>
                </div>
                <p className="text-sm text-gray-600">Professional comes to your home</p>
              </div>
            </label>
            
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" name="sessionType" value="online" className="mr-3" />
              <div>
                <div className="flex items-center">
                  <Video className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium">Online Session</span>
                </div>
                <p className="text-sm text-gray-600">Video consultation</p>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Notes or Requests</label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any specific concerns or goals for this session..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Book Session
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your therapy sessions and appointments</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md mx-auto">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past Sessions' },
            { id: 'book', label: 'Book New' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} showActions={true} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
                  <p className="text-gray-600 mb-4">Book your first session to get started</p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Session
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-6">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white border-opacity-50 shadow-xl relative">
                    <div className="absolute -top-4 -right-4 opacity-20">
                      <img src="/pattern/pattern light green.svg" alt="" className="w-12 h-12" />
                    </div>
                    <Clock className="h-16 w-16 text-green-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-green-800 mb-4 font-handwritten">No past sessions</h3>
                    <p className="text-green-600 font-readable">Your completed sessions will appear here</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'book' && <BookingForm />}
        </div>
      </div>
    </div>
  );
}