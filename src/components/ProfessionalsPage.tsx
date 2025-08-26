import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar as CalendarIcon, Filter, ChevronDown, User, Award, Clock, Phone, Mail, Video, Home, Heart, Shield, CheckCircle, Settings, Globe, TrendingUp, X } from 'lucide-react';
import Calendar from './Calendar';
import { useInterventionCategories, useInterventions } from '../hooks/useInterventions';
import { useProfessionals } from '../hooks/useProfessionals';

interface ProfessionalsPageProps {
  onPageChange: (page: string) => void;
  user?: any;
  onLogin: () => void;
}

interface Child {
  id: string;
  name: string;
  age: number;
  conditions: string[];
  avatar: string;
}

interface Professional {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  experience: number;
  location: string;
  avatar: string;
  hourlyRate: number;
  availability: string[];
  bio: string;
  credentials: string[];
  languages: string[];
  isVerified: boolean;
  responseTime: string;
  completionRate: number;
  totalSessions: number;
  services: {
    id: string;
    name: string;
    description: string;
    duration: number;
    rate: number;
    type: 'assessment' | 'therapy' | 'consultation';
  }[];
}

export default function ProfessionalsPage({ onPageChange, user, onLogin }: ProfessionalsPageProps) {
  const { categories } = useInterventionCategories();
  const { interventions } = useInterventions();
  const { professionals: dbProfessionals, loading: professionalsLoading } = useProfessionals();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');

  // Sample children data for parent users
  const sampleChildren: Child[] = [
    {
      id: '1',
      name: 'Emma Johnson',
      age: 6,
      conditions: ['Autism Spectrum Disorder', 'Speech Delay'],
      avatar: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Alex Johnson',
      age: 4,
      conditions: ['ADHD', 'Language Delay'],
      avatar: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  // Get specializations from database
  const specializations = ['all', ...categories.map(cat => cat.name)];

  // Get locations from professionals data
  const locations = [
    'all',
    ...Array.from(new Set(dbProfessionals.map(prof => prof.location).filter(Boolean)))
  ];

  // Show loading state
  if (professionalsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB748E] mx-auto mb-4"></div>
          <p className="text-gray-600 font-sans">Loading professionals...</p>
        </div>
      </div>
    );
  }

  const filteredProfessionals = dbProfessionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 professional.specializations.includes(selectedSpecialization);
    
    const matchesLocation = selectedLocation === 'all' || professional.location === selectedLocation;
    
    return matchesSearch && matchesSpecialization && matchesLocation;
  });

  const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.experience - a.experience;
      case 'price-low':
        return a.hourlyRate - b.hourlyRate;
      case 'price-high':
        return b.hourlyRate - a.hourlyRate;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleBookSession = (professional: Professional) => {
    if (!user) {
      onLogin();
      return;
    }
    
    if (user.role !== 'parent') {
      alert('Only parents/guardians can book sessions. Please log in with a parent account.');
      return;
    }
    
    setSelectedProfessional(professional);
    setShowBookingModal(true);
  };

  const BookingModal = () => {
    if (!showBookingModal || !selectedProfessional) return null;

    const selectedChildData = sampleChildren.find(child => child.id === selectedChild);
    const selectedServiceData = selectedProfessional.services.find(service => service.id === selectedService);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 font-handwritten">Book Session</h2>
            <button
              onClick={() => setShowBookingModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-pink-50 to-green-50 rounded-2xl border border-pink-200">
              <img
                src={selectedProfessional.avatar}
                alt={selectedProfessional.name}
                className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-handwritten">{selectedProfessional.name}</h3>
                <p className="text-[#CB748E] font-semibold font-sans">{selectedProfessional.title}</p>
                <p className="text-sm text-gray-600 font-sans">{selectedProfessional.location}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3 font-handwritten">Select Child</label>
                <div className="space-y-3">
                  {sampleChildren.map((child) => (
                    <div
                      key={child.id}
                      onClick={() => setSelectedChild(child.id)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        selectedChild === child.id
                          ? 'border-[#CB748E] bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={child.avatar}
                          alt={child.name}
                          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 font-handwritten">{child.name}</h4>
                          <p className="text-sm text-gray-600 font-sans">Age {child.age}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {child.conditions.slice(0, 2).map((condition, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-pink-100 text-[#CB748E] text-xs rounded-full font-semibold font-sans"
                              >
                                {condition}
                              </span>
                            ))}
                            {child.conditions.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold font-sans">
                                +{child.conditions.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                        {selectedChild === child.id && (
                          <CheckCircle className="h-6 w-6 text-[#CB748E]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3 font-handwritten">Select Service</label>
                <div className="space-y-3">
                  {selectedProfessional.services.map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        selectedService === service.id
                          ? 'border-[#698a60] bg-green-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <h4 className="font-bold text-gray-800 font-handwritten">{service.name}</h4>
                            {selectedService === service.id && (
                              <CheckCircle className="h-5 w-5 text-[#698a60] ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 font-sans">{service.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-700 font-sans">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration} minutes
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#698a60] font-handwritten">₱{service.rate}</p>
                          <span className={`px-2 py-1 text-xs rounded-full font-semibold font-sans ${
                            service.type === 'assessment' ? 'bg-blue-100 text-blue-800' :
                            service.type === 'therapy' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {service.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3 font-handwritten">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-sans"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3 font-handwritten">Session Type</label>
                  <select className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-sans">
                    <option value="home-visit">Home Visit</option>
                    <option value="online">Online Session</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3 font-handwritten">Special Requirements</label>
                <textarea
                  rows={3}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent resize-none font-sans"
                  placeholder="Any special requirements or notes for the session..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    if (!selectedChild) {
                      alert('Please select a child for this session.');
                      return;
                    }
                    if (!selectedService) {
                      alert('Please select a service for this session.');
                      return;
                    }
                    setShowBookingModal(false);
                    setSelectedChild('');
                    setSelectedService('');
                    onPageChange('bookings');
                  }}
                  className={`flex-1 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg font-handwritten ${
                    selectedChild && selectedService
                      ? 'bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white hover:from-pink-500 hover:to-green-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!selectedChild || !selectedService}
                >
                  Book Session
                </button>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setSelectedChild('');
                    setSelectedService('');
                  }}
                  className="px-6 py-4 border-2 border-gray-300 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 text-gray-700 font-handwritten"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#d698ab] via-[#CB748E] to-[#698a60] text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-4 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-x-12"></div>
        <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-full translate-y-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mr-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold font-handwritten">
                <span className="text-white">Find </span><span className="text-yellow-300">Professionals</span>
              </h1>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white text-opacity-95 mb-4 font-sans">
              Connect with certified therapists and specialists in Mindanao
            </p>
            <p className="text-lg md:text-xl text-white text-opacity-90 leading-relaxed font-sans">
              Browse verified professionals who understand your child's unique needs and can provide 
              quality developmental support right here in the Philippines.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white border-opacity-50">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, specialization, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans"
                />
              </div>
            </div>
            
            <div className="relative">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans appearance-none pr-10"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>
                    {spec === 'all' ? 'All Specializations' : spec}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans appearance-none pr-10"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-bold text-gray-700 font-sans">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 text-sm font-sans"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600 font-sans">
              {sortedProfessionals.length} professionals found
            </div>
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {sortedProfessionals.map((professional) => (
            <div key={professional.id} className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg border border-white border-opacity-50 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={professional.avatar}
                      alt={professional.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {professional.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 font-handwritten">{professional.name}</h3>
                    <p className="text-[#CB748E] font-semibold font-sans">{professional.title}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600 font-sans">{professional.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-bold text-gray-800 font-sans">{professional.rating}</span>
                    <span className="text-sm text-gray-600 ml-1 font-sans">({professional.reviewCount})</span>
                  </div>
                  <p className="text-sm text-gray-600 font-sans">{professional.experience} years exp.</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {professional.specializations.slice(0, 3).map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-[#CB748E] text-sm rounded-full font-semibold font-sans"
                    >
                      {spec}
                    </span>
                  ))}
                  {professional.specializations.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-semibold font-sans">
                      +{professional.specializations.length - 3} more
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed font-sans line-clamp-3">{professional.bio}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 font-sans">
                    <Clock className="h-4 w-4 mr-2 text-[#698a60]" />
                    <span className="text-sm">Responds in {professional.responseTime}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700 font-sans">
                    <Award className="h-4 w-4 mr-2 text-[#CB748E]" />
                    <span className="text-sm">{professional.completionRate}% completion rate</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 font-sans">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{professional.totalSessions} sessions completed</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700 font-sans">
                    <span className="text-lg font-bold text-[#698a60] font-handwritten">₱{professional.hourlyRate}/hour</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2 font-handwritten">Languages:</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-[#698a60] text-xs rounded-full font-semibold font-sans"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2 font-handwritten">Available Days:</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.availability.map((day, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-semibold font-sans"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleBookSession(professional)}
                  className="flex-1 bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-6 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center font-handwritten"
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Book Session
                </button>
                <button className="px-4 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-gray-700 font-bold flex items-center font-sans">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </button>
                <button className="px-4 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-gray-700 font-bold flex items-center font-sans">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedProfessionals.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white border-opacity-50 shadow-xl">
              <User className="h-20 w-20 text-[#CB748E] mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-handwritten">No professionals found</h3>
              <p className="text-gray-600 mb-6 font-sans">
                Try adjusting your search criteria or browse all available professionals.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialization('all');
                  setSelectedLocation('all');
                }}
                className="bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-6 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-handwritten"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Booking Modal */}
      <BookingModal />
    </div>
  );
}