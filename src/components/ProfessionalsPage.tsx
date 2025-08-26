import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, Filter, ChevronDown, User, Award, Clock, Phone, Mail, Video, Home, Heart, Shield, CheckCircle, Settings, Globe, TrendingUp, X } from 'lucide-react';
import Calendar from './Calendar';

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

  // Specializations based on intervention categories from database
  const specializations = [
    'all',
    'Applied Behavior Analysis (ABA)',
    'Speech and Language Therapy',
    'Occupational Therapy (OT)',
    'Developmental Therapy',
    'Social Skills Training',
    'Sensory Integration Therapy',
    'Early Intervention',
    'Special Education',
    'Behavioral Therapy',
    'Autism Spectrum Disorders',
    'ADHD Support',
    'Developmental Delays',
    'Communication Disorders',
    'Motor Skills Development',
    'Parent Training and Support'
  ];

  // Mindanao locations
  const locations = [
    'all',
    'Cagayan de Oro City',
    'Davao City',
    'General Santos City',
    'Butuan City',
    'Iligan City',
    'Malaybalay City, Bukidnon',
    'Valencia City, Bukidnon',
    'Kidapawan City, Cotabato',
    'Koronadal City, South Cotabato',
    'Zamboanga City',
    'Pagadian City',
    'Dipolog City',
    'Marawi City',
    'Cotabato City'
  ];

  // Enhanced sample professionals with Philippine context
  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Dr. Maria Santos-Cruz',
      title: 'Licensed Speech-Language Pathologist',
      specializations: ['Speech and Language Therapy', 'Autism Spectrum Disorders', 'Communication Disorders'],
      rating: 4.9,
      reviewCount: 127,
      experience: 12,
      location: 'Cagayan de Oro City',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 1500,
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      bio: 'Dedicated speech-language pathologist with over 12 years of experience helping children with communication disorders. Specializes in autism spectrum disorders and developmental delays. Fluent in Filipino, English, and Cebuano.',
      credentials: ['Licensed Speech-Language Pathologist (PRC)', 'Master\'s in Speech Pathology - University of the Philippines', 'ABA Certification', 'PECS Level 2 Certified'],
      languages: ['Filipino', 'English', 'Cebuano'],
      isVerified: true,
      responseTime: '2 hours',
      completionRate: 98,
      totalSessions: 1247,
      services: [
        {
          id: '1',
          name: 'Speech Assessment',
          description: 'Comprehensive speech and language evaluation',
          duration: 90,
          rate: 2000,
          type: 'assessment'
        },
        {
          id: '2',
          name: 'Individual Speech Therapy',
          description: 'One-on-one speech therapy sessions',
          duration: 60,
          rate: 1500,
          type: 'therapy'
        },
        {
          id: '3',
          name: 'Parent Consultation',
          description: 'Guidance for parents on home practice',
          duration: 45,
          rate: 1200,
          type: 'consultation'
        }
      ]
    },
    {
      id: '2',
      name: 'Dr. Jose Miguel Reyes',
      title: 'Developmental Pediatrician',
      specializations: ['Developmental Therapy', 'Autism Spectrum Disorders', 'ADHD Support', 'Early Intervention'],
      rating: 4.8,
      reviewCount: 89,
      experience: 15,
      location: 'Davao City',
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 2000,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      bio: 'Board-certified developmental pediatrician specializing in autism spectrum disorders and ADHD. Provides comprehensive developmental assessments and treatment planning for children with special needs.',
      credentials: ['Board Certified Developmental Pediatrician', 'Doctor of Medicine - University of Santo Tomas', 'Fellowship in Developmental Pediatrics - Philippine Children\'s Medical Center', 'ADHD Specialist Certification'],
      languages: ['Filipino', 'English', 'Bisaya'],
      isVerified: true,
      responseTime: '4 hours',
      completionRate: 96,
      totalSessions: 892,
      services: [
        {
          id: '4',
          name: 'Developmental Assessment',
          description: 'Comprehensive developmental evaluation',
          duration: 120,
          rate: 3000,
          type: 'assessment'
        },
        {
          id: '5',
          name: 'ADHD Consultation',
          description: 'ADHD assessment and management planning',
          duration: 90,
          rate: 2500,
          type: 'consultation'
        },
        {
          id: '6',
          name: 'Follow-up Consultation',
          description: 'Progress review and treatment adjustment',
          duration: 60,
          rate: 2000,
          type: 'consultation'
        }
      ]
    },
    {
      id: '3',
      name: 'Ms. Ana Luz Fernandez',
      title: 'Licensed Occupational Therapist',
      specializations: ['Occupational Therapy (OT)', 'Sensory Integration Therapy', 'Motor Skills Development'],
      rating: 4.7,
      reviewCount: 156,
      experience: 8,
      location: 'Malaybalay City, Bukidnon',
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 1300,
      availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      bio: 'Licensed occupational therapist passionate about helping children develop essential life skills. Specializes in sensory integration and fine motor development for children with autism and developmental delays.',
      credentials: ['Licensed Occupational Therapist (PRC)', 'Bachelor of Science in Occupational Therapy - Mindanao State University', 'Sensory Integration Certification', 'Pediatric OT Specialist'],
      languages: ['Filipino', 'English', 'Hiligaynon'],
      isVerified: true,
      responseTime: '3 hours',
      completionRate: 94,
      totalSessions: 743,
      services: [
        {
          id: '7',
          name: 'OT Assessment',
          description: 'Occupational therapy evaluation',
          duration: 90,
          rate: 1800,
          type: 'assessment'
        },
        {
          id: '8',
          name: 'Sensory Integration Therapy',
          description: 'Individual sensory integration sessions',
          duration: 60,
          rate: 1300,
          type: 'therapy'
        }
      ]
    },
    {
      id: '4',
      name: 'Ms. Grace Villanueva-Tan',
      title: 'Special Education Teacher (SPED)',
      specializations: ['Special Education', 'Applied Behavior Analysis (ABA)', 'Social Skills Training', 'Academic Skills'],
      rating: 4.6,
      reviewCount: 203,
      experience: 10,
      location: 'General Santos City',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 1000,
      availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      bio: 'Experienced special education teacher with expertise in ABA and academic skill development. Dedicated to creating inclusive learning environments for children with diverse learning needs.',
      credentials: ['Licensed Professional Teacher (LPT)', 'Master\'s in Special Education - Central Mindanao University', 'ABA Therapist Certification', 'Autism Specialist Certificate'],
      languages: ['Filipino', 'English', 'Cebuano'],
      isVerified: true,
      responseTime: '1 hour',
      completionRate: 97,
      totalSessions: 1156,
      services: [
        {
          id: '9',
          name: 'Educational Assessment',
          description: 'Academic skills and learning needs evaluation',
          duration: 120,
          rate: 1500,
          type: 'assessment'
        },
        {
          id: '10',
          name: 'ABA Therapy Session',
          description: 'Applied behavior analysis therapy',
          duration: 60,
          rate: 1000,
          type: 'therapy'
        }
      ]
    },
    {
      id: '5',
      name: 'Dr. Roberto Dela Cruz',
      title: 'Clinical Psychologist',
      specializations: ['Behavioral Therapy', 'Autism Spectrum Disorders', 'ADHD Support', 'Parent Training and Support'],
      rating: 4.8,
      reviewCount: 94,
      experience: 18,
      location: 'Butuan City',
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 1800,
      availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      bio: 'Clinical psychologist specializing in autism spectrum disorders and behavioral interventions. Extensive experience in family therapy and parent training programs.',
      credentials: ['Licensed Psychologist (PRC)', 'PhD in Clinical Psychology - Ateneo de Davao University', 'Board Certified Behavior Analyst (BCBA)', 'Family Therapy Certification'],
      languages: ['Filipino', 'English', 'Bisaya'],
      isVerified: true,
      responseTime: '6 hours',
      completionRate: 95,
      totalSessions: 567,
      services: [
        {
          id: '11',
          name: 'Psychological Assessment',
          description: 'Comprehensive psychological evaluation',
          duration: 150,
          rate: 3500,
          type: 'assessment'
        },
        {
          id: '12',
          name: 'Behavioral Therapy',
          description: 'Individual behavioral intervention sessions',
          duration: 60,
          rate: 1800,
          type: 'therapy'
        }
      ]
    },
    {
      id: '6',
      name: 'Ms. Jennifer Lim-Garcia',
      title: 'Physical Therapist',
      specializations: ['Motor Skills Development', 'Developmental Therapy', 'Early Intervention'],
      rating: 4.5,
      reviewCount: 78,
      experience: 6,
      location: 'Iligan City',
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 1200,
      availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      bio: 'Licensed physical therapist focused on pediatric development and motor skills enhancement. Experienced in working with children with cerebral palsy, developmental delays, and motor coordination issues.',
      credentials: ['Licensed Physical Therapist (PRC)', 'Bachelor of Science in Physical Therapy - Mindanao State University', 'Pediatric Physical Therapy Certification', 'NDT Certification'],
      languages: ['Filipino', 'English', 'Maranao'],
      isVerified: true,
      responseTime: '4 hours',
      completionRate: 92,
      totalSessions: 445,
      services: [
        {
          id: '13',
          name: 'Motor Skills Assessment',
          description: 'Gross and fine motor skills evaluation',
          duration: 90,
          rate: 1600,
          type: 'assessment'
        },
        {
          id: '14',
          name: 'Physical Therapy Session',
          description: 'Individual motor development therapy',
          duration: 60,
          rate: 1200,
          type: 'therapy'
        }
      ]
    },
    {
      id: '7',
      name: 'Ms. Catherine Morales-Dizon',
      title: 'Registered Behavior Technician (RBT)',
      specializations: ['Applied Behavior Analysis (ABA)', 'Behavioral Therapy', 'Social Skills Training'],
      rating: 4.4,
      reviewCount: 112,
      experience: 4,
      location: 'Valencia City, Bukidnon',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 800,
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      bio: 'Certified behavior technician specializing in ABA therapy for children with autism. Passionate about creating positive learning environments and supporting families in their journey.',
      credentials: ['Registered Behavior Technician (RBT)', 'Bachelor of Science in Psychology - Central Mindanao University', 'ABA Training Certificate', 'First Aid/CPR Certified'],
      languages: ['Filipino', 'English', 'Cebuano'],
      isVerified: true,
      responseTime: '2 hours',
      completionRate: 96,
      totalSessions: 623,
      services: [
        {
          id: '15',
          name: 'ABA Therapy Session',
          description: 'Applied behavior analysis intervention',
          duration: 90,
          rate: 1200,
          type: 'therapy'
        },
        {
          id: '16',
          name: 'Social Skills Group',
          description: 'Group social skills training',
          duration: 60,
          rate: 800,
          type: 'therapy'
        }
      ]
    },
    {
      id: '8',
      name: 'Dr. Mark Anthony Gonzales',
      title: 'Developmental Pediatrician',
      specializations: ['Developmental Therapy', 'Autism Spectrum Disorders', 'ADHD Support', 'Early Intervention'],
      rating: 4.9,
      reviewCount: 67,
      experience: 20,
      location: 'Kidapawan City, Cotabato',
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 2500,
      availability: ['Monday', 'Wednesday', 'Friday'],
      bio: 'Senior developmental pediatrician with two decades of experience in diagnosing and treating children with developmental disorders. Advocates for early intervention and family-centered care.',
      credentials: ['Board Certified Developmental Pediatrician', 'Doctor of Medicine - Davao Medical School Foundation', 'Fellowship in Developmental Pediatrics - Philippine General Hospital', 'Autism Diagnostic Certification'],
      languages: ['Filipino', 'English', 'Hiligaynon'],
      isVerified: true,
      responseTime: '8 hours',
      completionRate: 99,
      totalSessions: 234,
      services: [
        {
          id: '17',
          name: 'Comprehensive Developmental Assessment',
          description: 'Full developmental evaluation and diagnosis',
          duration: 180,
          rate: 4500,
          type: 'assessment'
        },
        {
          id: '18',
          name: 'Developmental Consultation',
          description: 'Treatment planning and family guidance',
          duration: 90,
          rate: 2500,
          type: 'consultation'
        }
      ]
    },
    {
      id: '9',
      name: 'Ms. Rosalie Magbanua-Torres',
      title: 'Early Intervention Specialist',
      specializations: ['Early Intervention', 'Developmental Therapy', 'Parent Training and Support', 'Motor Skills Development'],
      rating: 4.6,
      reviewCount: 145,
      experience: 9,
      location: 'Koronadal City, South Cotabato',
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 1100,
      availability: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
      bio: 'Early intervention specialist dedicated to supporting infants and toddlers with developmental delays. Strong advocate for family-centered intervention and community-based services.',
      credentials: ['Early Intervention Specialist Certification', 'Master\'s in Special Education - Notre Dame University', 'Infant Development Specialist', 'Family Service Coordination Certificate'],
      languages: ['Filipino', 'English', 'Hiligaynon', 'T\'boli'],
      isVerified: true,
      responseTime: '3 hours',
      completionRate: 93,
      totalSessions: 789,
      services: [
        {
          id: '19',
          name: 'Early Intervention Assessment',
          description: 'Developmental screening for infants and toddlers',
          duration: 90,
          rate: 1500,
          type: 'assessment'
        },
        {
          id: '20',
          name: 'Family-Centered Therapy',
          description: 'Home-based early intervention services',
          duration: 75,
          rate: 1100,
          type: 'therapy'
        }
      ]
    },
    {
      id: '10',
      name: 'Ms. Aileen Delos Santos',
      title: 'Music Therapist',
      specializations: ['Developmental Therapy', 'Social Skills Training', 'Communication Disorders', 'Sensory Integration Therapy'],
      rating: 4.7,
      reviewCount: 91,
      experience: 7,
      location: 'Zamboanga City',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 1000,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      bio: 'Certified music therapist using music as a therapeutic tool to enhance communication, social skills, and emotional expression in children with special needs.',
      credentials: ['Board Certified Music Therapist', 'Bachelor of Music Therapy - University of the Philippines', 'Neurologic Music Therapy Certification', 'Autism Music Therapy Specialist'],
      languages: ['Filipino', 'English', 'Chavacano', 'Cebuano'],
      isVerified: true,
      responseTime: '5 hours',
      completionRate: 91,
      totalSessions: 512,
      services: [
        {
          id: '21',
          name: 'Music Therapy Assessment',
          description: 'Musical and developmental assessment',
          duration: 60,
          rate: 1200,
          type: 'assessment'
        },
        {
          id: '22',
          name: 'Individual Music Therapy',
          description: 'One-on-one music therapy sessions',
          duration: 45,
          rate: 1000,
          type: 'therapy'
        }
      ]
    },
    {
      id: '11',
      name: 'Dr. Patricia Ramos-Aquino',
      title: 'Child Psychiatrist',
      specializations: ['Behavioral Therapy', 'ADHD Support', 'Autism Spectrum Disorders', 'Parent Training and Support'],
      rating: 4.8,
      reviewCount: 73,
      experience: 14,
      location: 'Dipolog City',
      avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 2200,
      availability: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
      bio: 'Board-certified child psychiatrist specializing in neurodevelopmental disorders. Provides comprehensive psychiatric evaluation and medication management for children with complex needs.',
      credentials: ['Board Certified Child Psychiatrist', 'Doctor of Medicine - Ateneo School of Medicine', 'Residency in Psychiatry - National Center for Mental Health', 'Child Psychiatry Fellowship - Philippine General Hospital'],
      languages: ['Filipino', 'English', 'Cebuano'],
      isVerified: true,
      responseTime: '12 hours',
      completionRate: 98,
      totalSessions: 298,
      services: [
        {
          id: '23',
          name: 'Psychiatric Evaluation',
          description: 'Comprehensive mental health assessment',
          duration: 120,
          rate: 3500,
          type: 'assessment'
        },
        {
          id: '24',
          name: 'Medication Management',
          description: 'Psychiatric medication consultation',
          duration: 60,
          rate: 2200,
          type: 'consultation'
        }
      ]
    },
    {
      id: '12',
      name: 'Ms. Michelle Cabrera-Yap',
      title: 'Art Therapist',
      specializations: ['Developmental Therapy', 'Social Skills Training', 'Communication Disorders', 'Behavioral Therapy'],
      rating: 4.5,
      reviewCount: 86,
      experience: 5,
      location: 'Pagadian City',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      hourlyRate: 900,
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      bio: 'Creative arts therapist using visual arts to help children express emotions and develop communication skills. Specializes in working with non-verbal children and those with emotional regulation challenges.',
      credentials: ['Registered Art Therapist', 'Master\'s in Art Therapy - De La Salle University', 'Play Therapy Certification', 'Trauma-Informed Care Certificate'],
      languages: ['Filipino', 'English', 'Cebuano'],
      isVerified: true,
      responseTime: '4 hours',
      completionRate: 89,
      totalSessions: 387,
      services: [
        {
          id: '25',
          name: 'Art Therapy Assessment',
          description: 'Creative expression and emotional assessment',
          duration: 75,
          rate: 1100,
          type: 'assessment'
        },
        {
          id: '26',
          name: 'Individual Art Therapy',
          description: 'Creative arts therapy sessions',
          duration: 60,
          rate: 900,
          type: 'therapy'
        }
      ]
    }
  ];

  const filteredProfessionals = professionals.filter(professional => {
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
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
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
                  <Calendar className="h-4 w-4 mr-2" />
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