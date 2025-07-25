import React, { useState } from 'react';
import { Star, MapPin, Clock, Filter, Calendar, MessageCircle, Award } from 'lucide-react';
import { Professional } from '../types';

interface ProfessionalsPageProps {
  onPageChange: (page: string) => void;
}

export default function ProfessionalsPage({ onPageChange }: ProfessionalsPageProps) {
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

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

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSpecialization = selectedSpecialization === 'all' || 
      professional.title.toLowerCase().includes(selectedSpecialization.toLowerCase()) ||
      professional.specialization.some(spec => spec.toLowerCase().includes(selectedSpecialization.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'all' || professional.location === selectedLocation;
    
    return matchesSpecialization && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find the Right Professional</h1>
          <p className="text-gray-600">Connect with certified experts who understand your child's unique needs</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Filter Professionals</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>
                    {spec === 'all' ? 'All Specializations' : spec}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <div key={professional.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={professional.avatar}
                    alt={professional.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{professional.name}</h3>
                    <p className="text-blue-600 text-sm font-medium">{professional.title}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{professional.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({professional.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {professional.location}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {professional.experience} years experience
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Specializations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {professional.specialization.slice(0, 2).map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {professional.specialization.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{professional.specialization.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Starting from</span>
                    <span className="text-lg font-bold text-gray-900">${professional.hourlyRate}/hr</span>
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
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <MessageCircle className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
}