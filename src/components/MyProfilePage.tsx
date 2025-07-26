import React, { useState } from 'react';
import { User, MapPin, Clock, Star, Award, Edit, Save, X, Phone, Mail, Calendar, DollarSign, BookOpen, Users, Shield, Camera, Plus, Trash2 } from 'lucide-react';

interface MyProfilePageProps {
  user: any;
  onPageChange: (page: string) => void;
}

export default function MyProfilePage({ user, onPageChange }: MyProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user.name || 'Dr. Sarah Johnson',
    title: 'Speech-Language Pathologist',
    email: user.email || 'sarah.johnson@buknest.com',
    phone: '(555) 123-4567',
    address: 'Bukidnon, Philippines',
    bio: 'Passionate speech-language pathologist with over 8 years of experience working with children on the autism spectrum and language development. I believe in creating a supportive, engaging environment where every child can reach their full potential.',
    specializations: ['Autism Spectrum Disorders', 'Speech Delays', 'Language Development', 'Articulation Therapy'],
    credentials: ['MS-SLP', 'CCC-SLP', 'BCBA', 'State Licensed'],
    experience: 8,
    education: [
      {
        degree: 'Master of Science in Speech-Language Pathology',
        institution: 'University of the Philippines',
        year: '2016'
      },
      {
        degree: 'Bachelor of Science in Communication Sciences',
        institution: 'Ateneo de Manila University',
        year: '2014'
      }
    ],
    languages: ['English', 'Filipino', 'Cebuano'],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    hourlyRate: 1500,
    sessionTypes: ['Home Visit', 'Online'],
    achievements: [
      'Certified Behavior Analyst (BCBA)',
      'Outstanding Therapist Award 2023',
      'Published researcher in child development'
    ]
  });

  const [newSpecialization, setNewSpecialization] = useState('');
  const [newCredential, setNewCredential] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      setProfileData(prev => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()]
      }));
      setNewSpecialization('');
    }
  };

  const removeSpecialization = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index)
    }));
  };

  const addCredential = () => {
    if (newCredential.trim()) {
      setProfileData(prev => ({
        ...prev,
        credentials: [...prev.credentials, newCredential.trim()]
      }));
      setNewCredential('');
    }
  };

  const removeCredential = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      credentials: prev.credentials.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Here you would typically save to database
    setIsEditing(false);
    // Show success message
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
                <span className="text-white">My </span><span className="text-yellow-300">Profile</span>
              </h1>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white text-opacity-95 mb-4 font-sans">
              Manage your professional information and credentials
            </p>
            <p className="text-lg md:text-xl text-white text-opacity-90 leading-relaxed font-sans">
              Keep your profile updated to help families find the right support for their children.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-200 relative">
          <div className="absolute -top-4 -right-4 opacity-5 animate-float">
            <img src="/pattern/pattern pink.svg" alt="" className="w-32 h-32" />
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={user.avatar || 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={profileData.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-[#CB748E] text-white p-2 rounded-full hover:bg-[#d698ab] transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="ml-6">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="text-3xl font-bold border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-handwritten"
                    />
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="text-xl border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-sans"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-handwritten">{profileData.fullName}</h1>
                    <p className="text-xl text-[#CB748E] font-semibold font-sans">{profileData.title}</p>
                  </div>
                )}
                <div className="flex items-center mt-3 space-x-4">
                  <div className="flex items-center text-gray-600 font-sans">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{profileData.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 font-sans">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{profileData.experience} years experience</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-[#698a60] text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center font-sans"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center font-sans"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-[#CB748E] text-white rounded-xl font-bold hover:bg-[#d698ab] transition-colors flex items-center font-sans"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-green-50 rounded-xl border border-pink-200">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800 font-handwritten">4.9</div>
              <div className="text-sm text-gray-600 font-sans">Rating</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-pink-50 rounded-xl border border-green-200">
              <Users className="h-8 w-8 text-[#698a60] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800 font-handwritten">156</div>
              <div className="text-sm text-gray-600 font-sans">Sessions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-green-50 rounded-xl border border-pink-200">
              <Calendar className="h-8 w-8 text-[#CB748E] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800 font-handwritten">32</div>
              <div className="text-sm text-gray-600 font-sans">Clients</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-pink-50 rounded-xl border border-green-200">
              <Shield className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800 font-handwritten">100%</div>
              <div className="text-sm text-gray-600 font-sans">Verified</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="flex-1 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-sans"
                    />
                  ) : (
                    <span className="text-gray-700 font-sans">{profileData.email}</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-sans"
                    />
                  ) : (
                    <span className="text-gray-700 font-sans">{profileData.phone}</span>
                  )}
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  {isEditing ? (
                    <textarea
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={2}
                      className="flex-1 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent resize-none font-sans"
                    />
                  ) : (
                    <span className="text-gray-700 font-sans">{profileData.address}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">Specializations</h3>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.specializations.map((spec, index) => (
                    <div key={index} className="flex items-center px-3 py-2 bg-pink-100 text-[#CB748E] rounded-full font-semibold font-sans">
                      <span>{spec}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeSpecialization(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSpecialization}
                      onChange={(e) => setNewSpecialization(e.target.value)}
                      placeholder="Add new specialization"
                      className="flex-1 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-sans"
                    />
                    <button
                      onClick={addSpecialization}
                      className="px-4 py-2 bg-[#698a60] text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">Professional Bio</h3>
              
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={6}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent resize-none font-sans"
                  placeholder="Tell families about your experience and approach..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed font-sans">{profileData.bio}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Credentials & Certifications */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">Credentials & Certifications</h3>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.credentials.map((credential, index) => (
                    <div key={index} className="flex items-center px-3 py-2 bg-green-100 text-[#698a60] rounded-full font-semibold font-sans">
                      <Award className="h-3 w-3 mr-2" />
                      <span>{credential}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeCredential(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newCredential}
                      onChange={(e) => setNewCredential(e.target.value)}
                      placeholder="Add new credential"
                      className="flex-1 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-sans"
                    />
                    <button
                      onClick={addCredential}
                      className="px-4 py-2 bg-[#698a60] text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">Education</h3>
              
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-[#CB748E] pl-4">
                    <h4 className="font-bold text-gray-800 font-sans">{edu.degree}</h4>
                    <p className="text-gray-600 font-sans">{edu.institution}</p>
                    <p className="text-sm text-gray-500 font-sans">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">Service Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans">Hourly Rate (₱)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profileData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                      className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent font-sans"
                    />
                  ) : (
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-lg font-semibold text-gray-800 font-sans">₱{profileData.hourlyRate}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans">Session Types</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.sessionTypes.map((type, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold font-sans">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold font-sans">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-sans">Availability</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.availability.map((day, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold font-sans">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">Achievements & Recognition</h3>
              
              <div className="space-y-3">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <Award className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="text-gray-700 font-sans">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => onPageChange('my-services')}
            className="bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-8 py-4 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center font-handwritten"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Manage Services
          </button>
          <button
            onClick={() => onPageChange('my-clients')}
            className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center font-handwritten"
          >
            <Users className="h-5 w-5 mr-2" />
            View Clients
          </button>
        </div>
      </div>
    </div>
  );
}