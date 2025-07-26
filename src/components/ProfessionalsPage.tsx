import React, { useState } from 'react';
import { Star, MapPin, Clock, Filter, Calendar, MessageCircle, Award, User } from 'lucide-react';
import { Professional } from '../types';

interface ProfessionalsPageProps {
  onPageChange: (page: string) => void;
}

export default function ProfessionalsPage({ onPageChange }: ProfessionalsPageProps) {
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Speech-Language Pathologist',
      specialization: ['Autism Spectrum Disorders', 'Language Delays', 'Articulation'],
      rating: 4.9,
      reviewCount: 127,
      experience: 8,
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 85,
      availability: ['Mon', 'Wed', 'Fri'],
      bio: 'Specialized in working with children on the autism spectrum and language development.',
      credentials: ['MS-SLP', 'CCC-SLP', 'BCBA']
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      title: 'Occupational Therapist',
      specialization: ['Sensory Processing', 'Fine Motor Skills', 'Daily Living Skills'],
      rating: 4.8,
      reviewCount: 89,
      experience: 6,
      location: 'Los Angeles, CA',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 75,
      availability: ['Tue', 'Thu', 'Sat'],
      bio: 'Passionate about helping children develop independence through sensory integration therapy.',
      credentials: ['OTR/L', 'SI Certified']
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      title: 'Developmental Pediatrician',
      specialization: ['ADHD', 'Developmental Delays', 'Behavioral Issues'],
      rating: 4.9,
      reviewCount: 156,
      experience: 12,
      location: 'Chicago, IL',
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 120,
      availability: ['Mon', 'Tue', 'Thu'],
      bio: 'Board-certified developmental pediatrician with expertise in neurodevelopmental disorders.',
      credentials: ['MD', 'Board Certified Pediatrics', 'Developmental-Behavioral Pediatrics']
    },
    {
      id: '4',
      name: 'Jennifer Williams',
      title: 'Special Education Teacher',
      specialization: ['Learning Disabilities', 'IEP Development', 'Academic Support'],
      rating: 4.7,
      reviewCount: 73,
      experience: 10,
      location: 'Houston, TX',
      avatar: 'https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 60,
      availability: ['Mon', 'Wed', 'Fri', 'Sat'],
      bio: 'Dedicated special education teacher helping children reach their academic potential.',
      credentials: ['M.Ed Special Education', 'State Certified']
    }
  ];

  const specializations = [
    'all',
    'Speech Therapy',
    'Occupational Therapy',
    'Developmental Pediatrics',
    'Special Education'
  ];

  const locations = [
    'all',
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX'
  ];

  const availabilityOptions = [
    'all',
    'Today',
    'This Week',
    'Weekends'
  ];

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSpecialization = selectedSpecialization === 'all' || 
      professional.title.toLowerCase().includes(selectedSpecialization.toLowerCase()) ||
      professional.specialization.some(spec => spec.toLowerCase().includes(selectedSpecialization.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'all' || professional.location === selectedLocation;
    
    return matchesSpecialization && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#d698ab] via-[#CB748E] to-[#698a60] text-white py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-4 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-x-12"></div>
        <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-full translate-y-10"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-5 rounded-full"></div>
        
        {/* Professional Page Floating Elements */}
        <div className="absolute top-16 left-12 opacity-25 animate-pulse">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="20" fill="white" opacity="0.8"/>
            <path d="M25 10V40M10 25H40" stroke="#CB748E" strokeWidth="3"/>
          </svg>
        </div>
        <div className="absolute top-24 right-20 opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
            <path d="M22.5 5L27 15H37L29.5 21L32 31L22.5 26L13 31L15.5 21L8 15H18L22.5 5Z" fill="white" opacity="0.9"/>
          </svg>
        </div>
        <div className="absolute bottom-16 left-24 opacity-30 animate-float" style={{ animationDelay: '2s' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="8" width="24" height="24" rx="12" fill="white" opacity="0.7"/>
            <circle cx="20" cy="20" r="6" fill="#698a60"/>
          </svg>
        </div>
        
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
            <p className="text-xl md:text-2xl text-white text-opacity-95 mb-4" style={{ fontFamily: 'Calibri, sans-serif' }}>
              Connect with certified experts who understand your child's unique needs
            </p>
            <p className="text-lg md:text-xl text-white text-opacity-90 leading-relaxed" style={{ fontFamily: 'Calibri, sans-serif' }}>
              Browse our network of verified professionals including speech therapists, occupational therapists, 
              developmental pediatricians, and special education teachers ready to support your family's journey.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Background floating elements for main content */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 opacity-20 animate-pulse">
            <img src="/pattern/pattern pink.svg" alt="" className="w-60 h-60" />
          </div>
          <div className="absolute top-40 right-16 opacity-18 animate-bounce" style={{ animationDelay: '1.5s' }}>
            <img src="/pattern/pattern light green.svg" alt="" className="w-56 h-56" />
          </div>
          <div className="absolute bottom-32 left-20 opacity-22 animate-float" style={{ animationDelay: '0.8s' }}>
            <img src="/pattern/pattern dark green.svg" alt="" className="w-52 h-52" />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white border-opacity-50 font-handwritten relative">
          {/* Filter section decorative elements */}
          <div className="absolute -top-3 -right-3 opacity-30">
            <img src="/pattern/pattern pink.svg" alt="" className="w-32 h-32" />
          </div>
          <div className="absolute -bottom-3 -left-3 opacity-25">
            <img src="/pattern/pattern light green.svg" alt="" className="w-36 h-36" />
          </div>
          
          <div className="flex items-center mb-4">
            <Filter className="h-6 w-6 text-green-600 mr-3" />
            <h3 className="text-2xl font-bold text-green-800">Find Your Perfect Match</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-green-600 mb-3 font-readable">Specialization</label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full border-2 border-green-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white bg-opacity-95 shadow-lg font-readable backdrop-blur-sm"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>
                    {spec === 'all' ? 'All Specializations' : spec}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-green-600 mb-3 font-readable">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border-2 border-green-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white bg-opacity-95 shadow-lg font-readable backdrop-blur-sm"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-green-600 mb-3 font-readable">Availability</label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full border-2 border-green-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white bg-opacity-95 shadow-lg font-readable backdrop-blur-sm"
              >
                {availabilityOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'Any Time' : option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfessionals.map((professional) => (
            <div key={professional.id} className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-white border-opacity-50 font-handwritten relative group">
              {/* Card floating elements */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                <img src="/pattern/pattern pink.svg" alt="" className="w-28 h-28" />
              </div>
              <div className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-25 transition-opacity duration-300">
                <img src="/pattern/pattern light green.svg" alt="" className="w-32 h-32" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <img
                    src={professional.avatar}
                    alt={professional.name}
                    className="w-20 h-20 rounded-full object-cover mr-4 border-4 border-white shadow-xl ring-2 ring-pink-200"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-green-800">{professional.name}</h3>
                    <p className="text-green-600 text-sm font-bold font-readable">{professional.title}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-bold text-green-800 font-readable">{professional.rating}</span>
                    <span className="ml-1 text-sm text-green-600 font-readable">({professional.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-green-700 mb-3 font-readable">
                  <MapPin className="h-4 w-4 mr-1" />
                  {professional.location}
                </div>

                <div className="flex items-center text-sm text-green-700 mb-4 font-readable">
                  <Clock className="h-4 w-4 mr-1" />
                  {professional.experience} years experience
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-bold text-green-800 mb-3 font-readable">Specializations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {professional.specialization.slice(0, 2).map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold font-readable"
                      >
                        {spec}
                      </span>
                    ))}
                    {professional.specialization.length > 2 && (
                      <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs rounded-full font-semibold font-readable">
                        +{professional.specialization.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-readable">Starting from</span>
                    <span className="text-xl font-bold text-green-800">₱{professional.hourlyRate}/hr</span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <Award className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">
                    {professional.credentials.slice(0, 2).join(', ')}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => onPageChange('bookings')}
                    className="flex-1 bg-gradient-to-r from-pink-400 to-green-500 text-white px-4 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center border border-white border-opacity-20"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </button>
                  <button className="px-4 py-3 border-2 border-green-300 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg bg-white bg-opacity-80 backdrop-blur-sm">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white border-opacity-50 shadow-xl relative">
              <div className="absolute -top-4 -right-4 opacity-25">
                <img src="/pattern/pattern pink.svg" alt="" className="w-14 h-14" />
              </div>
              <div className="absolute -bottom-4 -left-4 opacity-20">
                <img src="/pattern/pattern light green.svg" alt="" className="w-12 h-12" />
              </div>
              <div className="text-green-400 mb-6">
                <Filter className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 font-handwritten">No professionals found</h3>
              <p className="text-green-600 mb-6 font-readable">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => {
                  setSelectedSpecialization('all');
                  setSelectedLocation('all');
                  setSelectedAvailability('all');
                }}
                className="bg-gradient-to-r from-pink-400 to-green-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl font-handwritten border border-white border-opacity-20"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}