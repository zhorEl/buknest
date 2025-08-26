import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Ensure your Supabase URL and Anon Key are set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in your environment variables.');
  console.error('Please ensure your .env file is correctly configured and accessible.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const professionalsData = [
  {
    email: 'dr.sarah.johnson@buknest.com',
    password: 'password123',
    full_name: 'Dr. Sarah Johnson',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639171234567',
    address: 'Cagayan de Oro City, Misamis Oriental',
    is_verified: true,
    date_of_birth: '1985-05-10',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Speech-Language Pathologist',
      specializations: ['Speech Delay', 'Articulation Disorders', 'Autism Spectrum Disorder'],
      hourly_rate: 1500.00,
      experience_years: 10,
      bio: 'Experienced Speech-Language Pathologist dedicated to helping children find their voice. Specializes in early intervention and comprehensive communication strategies.',
      credentials: ['MS, Speech-Language Pathology', 'ASHA Certified'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Speech-Language Pathologist',
      languages: ['English', 'Tagalog'],
      education: 'University of the Philippines, Diliman',
      certifications: ['Certificate of Clinical Competence in Speech-Language Pathology (CCC-SLP)'],
      availability_hours: { start: '09:00', end: '17:00' },
      service_areas: ['Cagayan de Oro City', 'Misamis Oriental'],
      max_travel_distance: 30,
      verification_status: 'approved',
      rating: 4.9,
      review_count: 75,
      total_sessions: 250,
      completed_sessions: 245,
      response_rate: 98.50,
      completion_rate: 98.00,
      average_response_time: 120,
      is_accepting_new_clients: true,
      consultation_fee: 500.00,
      cancellation_policy: '24-hour notice required for cancellations.'
    },
    services: [
      { name: 'Speech Therapy Assessment', description: 'Comprehensive evaluation of speech and language skills.', rate: 2000.00, duration: 90, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Individual Speech Therapy', description: 'One-on-one sessions focusing on articulation, fluency, and language development.', rate: 1500.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 20, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'maria.rodriguez@buknest.com',
    password: 'password123',
    full_name: 'Maria Rodriguez',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639272345678',
    address: 'Davao City, Davao del Sur',
    is_verified: true,
    date_of_birth: '1990-11-20',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Occupational Therapist',
      specializations: ['Sensory Integration', 'Fine Motor Skills', 'ADHD Support'],
      hourly_rate: 1300.00,
      experience_years: 7,
      bio: 'Passionate Occupational Therapist helping children develop essential life skills and overcome sensory challenges.',
      credentials: ['BS, Occupational Therapy', 'Certified Sensory Integration Therapist'],
      availability_days: ['Tuesday', 'Thursday', 'Saturday'],
      documents_uploaded: true,
      profession: 'Occupational Therapist',
      languages: ['English', 'Cebuano'],
      education: 'University of Santo Tomas',
      certifications: ['Sensory Integration Certification'],
      availability_hours: { start: '10:00', end: '18:00' },
      service_areas: ['Davao City', 'Davao del Sur'],
      max_travel_distance: 25,
      verification_status: 'approved',
      rating: 4.8,
      review_count: 60,
      total_sessions: 180,
      completed_sessions: 175,
      response_rate: 97.00,
      completion_rate: 97.50,
      average_response_time: 180,
      is_accepting_new_clients: true,
      consultation_fee: 400.00,
      cancellation_policy: '48-hour notice for rescheduling.'
    },
    services: [
      { name: 'OT Assessment', description: 'Evaluation of motor skills, sensory processing, and daily living activities.', rate: 1800.00, duration: 75, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Individual OT Session', description: 'Tailored therapy to improve fine motor, gross motor, and sensory processing skills.', rate: 1300.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 15, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'dr.john.doe@buknest.com',
    password: 'password123',
    full_name: 'Dr. John Doe',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639393456789',
    address: 'Zamboanga City, Zamboanga del Sur',
    is_verified: true,
    date_of_birth: '1978-03-25',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Developmental Pediatrician',
      specializations: ['Developmental Delays', 'Autism Diagnosis', 'Behavioral Management'],
      hourly_rate: 2500.00,
      experience_years: 15,
      bio: 'Board-certified Developmental Pediatrician providing comprehensive diagnostic and management services for children with developmental challenges.',
      credentials: ['MD, Pediatrics', 'Fellow, Developmental-Behavioral Pediatrics'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Developmental Pediatrician',
      languages: ['English', 'Chavacano'],
      education: 'University of the Philippines, Manila',
      certifications: ['Philippine Pediatric Society Board Certification'],
      availability_hours: { start: '08:00', end: '16:00' },
      service_areas: ['Zamboanga City', 'Zamboanga del Sur'],
      max_travel_distance: 40,
      verification_status: 'approved',
      rating: 4.9,
      review_count: 90,
      total_sessions: 300,
      completed_sessions: 290,
      response_rate: 99.00,
      completion_rate: 96.50,
      average_response_time: 90,
      is_accepting_new_clients: true,
      consultation_fee: 800.00,
      cancellation_policy: 'No-show fees apply.'
    },
    services: [
      { name: 'Developmental Assessment', description: 'Comprehensive evaluation for developmental concerns and diagnosis.', rate: 3000.00, duration: 120, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Follow-up Consultation', description: 'Review of progress, medication management, and behavioral strategies.', rate: 2500.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 10, category: 'Consultation', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'anna.lim@buknest.com',
    password: 'password123',
    full_name: 'Anna Lim',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639084567890',
    address: 'General Santos City, South Cotabato',
    is_verified: true,
    date_of_birth: '1988-08-15',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Special Education Teacher (SPED)',
      specializations: ['Learning Disabilities', 'Academic Support', 'Behavioral Interventions'],
      hourly_rate: 1000.00,
      experience_years: 8,
      bio: 'Dedicated SPED teacher providing individualized education plans and academic support for diverse learners.',
      credentials: ['BSED, Special Education', 'Licensed Professional Teacher'],
      availability_days: ['Monday', 'Tuesday', 'Thursday'],
      documents_uploaded: true,
      profession: 'Special Education Teacher (SPED)',
      languages: ['English', 'Tagalog'],
      education: 'Philippine Normal University',
      certifications: ['SPED Certification'],
      availability_hours: { start: '09:00', end: '17:00' },
      service_areas: ['General Santos City', 'South Cotabato'],
      max_travel_distance: 20,
      verification_status: 'approved',
      rating: 4.7,
      review_count: 55,
      total_sessions: 200,
      completed_sessions: 195,
      response_rate: 96.00,
      completion_rate: 97.00,
      average_response_time: 200,
      is_accepting_new_clients: true,
      consultation_fee: 300.00,
      cancellation_policy: 'Flexible rescheduling with prior notice.'
    },
    services: [
      { name: 'Academic Tutoring', description: 'Individualized tutoring for core subjects, tailored to learning styles.', rate: 1000.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 25, category: 'Education', age_range: '5-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'IEP Development Support', description: 'Assistance in creating and implementing Individualized Education Plans.', rate: 1200.00, duration: 90, session_type: ['online'], max_sessions: 5, category: 'Consultation', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'david.gonzales@buknest.com',
    password: 'password123',
    full_name: 'David Gonzales',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639475678901',
    address: 'Butuan City, Agusan del Norte',
    is_verified: true,
    date_of_birth: '1982-02-28',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Physical Therapist',
      specializations: ['Gross Motor Skills', 'Mobility Training', 'Cerebral Palsy Support'],
      hourly_rate: 1400.00,
      experience_years: 12,
      bio: 'Dedicated Physical Therapist focused on improving mobility and physical independence in children with developmental and neurological conditions.',
      credentials: ['BS, Physical Therapy', 'Licensed Physical Therapist'],
      availability_days: ['Tuesday', 'Thursday', 'Saturday'],
      documents_uploaded: true,
      profession: 'Physical Therapist',
      languages: ['English', 'Tagalog'],
      education: 'University of Perpetual Help System DALTA',
      certifications: ['Pediatric PT Certification'],
      availability_hours: { start: '09:00', end: '17:00' },
      service_areas: ['Butuan City', 'Agusan del Norte'],
      max_travel_distance: 35,
      verification_status: 'approved',
      rating: 4.8,
      review_count: 65,
      total_sessions: 220,
      completed_sessions: 215,
      response_rate: 97.50,
      completion_rate: 98.00,
      average_response_time: 150,
      is_accepting_new_clients: true,
      consultation_fee: 450.00,
      cancellation_policy: 'Cancellation within 12 hours incurs a fee.'
    },
    services: [
      { name: 'PT Assessment', description: 'Evaluation of physical abilities, strength, and range of motion.', rate: 1800.00, duration: 75, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Individual PT Session', description: 'Therapy focused on improving gross motor skills, balance, and coordination.', rate: 1400.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 18, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'catherine.reyes@buknest.com',
    password: 'password123',
    full_name: 'Catherine Reyes',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639567890123',
    address: 'Iligan City, Lanao del Norte',
    is_verified: true,
    date_of_birth: '1992-01-05',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Child Psychologist',
      specializations: ['Anxiety', 'Depression', 'Behavioral Issues', 'Trauma'],
      hourly_rate: 1600.00,
      experience_years: 6,
      bio: 'Compassionate Child Psychologist providing therapy and support for children and adolescents facing emotional and behavioral challenges.',
      credentials: ['MA, Clinical Psychology', 'Licensed Psychologist'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Child Psychologist',
      languages: ['English', 'Tagalog'],\      education: 'Ateneo de Manila University',
      certifications: ['Cognitive Behavioral Therapy (CBT) Certified'],
      availability_hours: { start: '10:00', end: '18:00' },
      service_areas: ['Iligan City', 'Lanao del Norte'],
      max_travel_distance: 20,
      verification_status: 'approved',
      rating: 4.9,
      review_count: 70,
      total_sessions: 150,
      completed_sessions: 145,
      response_rate: 98.00,
      completion_rate: 96.00,
      average_response_time: 100,
      is_accepting_new_clients: true,
      consultation_fee: 600.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Psychological Assessment', description: 'Evaluation of cognitive, emotional, and behavioral functioning.', rate: 2200.00, duration: 90, session_type: ['online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Individual Therapy', description: 'One-on-one counseling sessions for emotional and behavioral support.', rate: 1600.00, duration: 60, session_type: ['online'], max_sessions: 12, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'mark.santos@buknest.com',
    password: 'password123',
    full_name: 'Mark Santos',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639688901234',
    address: 'Cotabato City, Maguindanao del Norte',
    is_verified: true,
    date_of_birth: '1980-07-12',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Behavioral Therapist',
      specializations: ['Applied Behavior Analysis (ABA)', 'Behavioral Challenges', 'Social Skills Training'],
      hourly_rate: 1350.00,
      experience_years: 10,
      bio: 'Certified Behavioral Therapist specializing in ABA to help children develop positive behaviors and essential life skills.',
      credentials: ['BCBA', 'MA, Special Education'],
      availability_days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      documents_uploaded: true,
      profession: 'Behavioral Therapist',
      languages: ['English', 'Tagalog'],
      education: 'De La Salle University',
      certifications: ['Board Certified Behavior Analyst (BCBA)'],
      availability_hours: { start: '08:00', end: '16:00' },
      service_areas: ['Cotabato City', 'Maguindanao del Norte'],
      max_travel_distance: 30,
      verification_status: 'approved',
      rating: 4.8,
      review_count: 80,
      total_sessions: 280,
      completed_sessions: 270,
      response_rate: 97.00,
      completion_rate: 95.50,
      average_response_time: 150,
      is_accepting_new_clients: true,
      consultation_fee: 450.00,
      cancellation_policy: 'Strict 24-hour cancellation policy.'
    },
    services: [
      { name: 'ABA Assessment', description: 'Functional behavioral assessment and development of behavior intervention plans.', rate: 2000.00, duration: 90, session_type: ['home_visit'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Individual ABA Therapy', description: 'One-on-one ABA sessions focusing on skill acquisition and behavior reduction.', rate: 1350.00, duration: 60, session_type: ['home_visit'], max_sessions: 30, category: 'Therapy', age_range: '0-18 years', prerequisites: 'ABA Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'grace.tan@buknest.com',
    password: 'password123',
    full_name: 'Grace Tan',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639779012345',
    address: 'Dipolog City, Zamboanga del Norte',
    is_verified: true,
    date_of_birth: '1987-04-01',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Music Therapist',
      specializations: ['Emotional Regulation', 'Communication Skills', 'Social Interaction'],
      hourly_rate: 1100.00,
      experience_years: 7,
      bio: 'Certified Music Therapist using the power of music to help children achieve developmental goals and express themselves creatively.',
      credentials: ['BM, Music Therapy', 'Board-Certified Music Therapist (MT-BC)'],
      availability_days: ['Tuesday', 'Thursday'],
      documents_uploaded: true,
      profession: 'Music Therapist',
      languages: ['English', 'Tagalog'],
      education: 'St. Paul University Manila',
      certifications: ['Board-Certified Music Therapist (MT-BC)'],
      availability_hours: { start: '10:00', end: '17:00' },
      service_areas: ['Dipolog City', 'Zamboanga del Norte'],
      max_travel_distance: 15,
      verification_status: 'approved',
      rating: 4.7,
      review_count: 45,
      total_sessions: 120,
      completed_sessions: 115,
      response_rate: 95.00,
      completion_rate: 96.00,
      average_response_time: 240,
      is_accepting_new_clients: true,
      consultation_fee: 350.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Music Therapy Assessment', description: 'Evaluation of needs and goals through musical responses.', rate: 1500.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: ['Musical instruments'], is_active: true },
      { name: 'Individual Music Therapy', description: 'Therapeutic music interventions for communication, motor, and emotional goals.', rate: 1100.00, duration: 45, session_type: ['home_visit', 'online'], max_sessions: 10, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: ['Musical instruments'], is_active: true }
    ]
  },
  {
    email: 'robert.cruz@buknest.com',
    password: 'password123',
    full_name: 'Robert Cruz',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639880123456',
    address: 'Pagadian City, Zamboanga del Sur',
    is_verified: true,
    date_of_birth: '1983-09-18',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Early Intervention Specialist',
      specializations: ['Infant Development', 'Toddler Milestones', 'Parent Coaching'],
      hourly_rate: 1250.00,
      experience_years: 11,
      bio: 'Dedicated Early Intervention Specialist supporting families and young children to achieve developmental milestones.',
      credentials: ['MA, Early Childhood Education', 'Certified Early Intervention Specialist'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Early Intervention Specialist',
      languages: ['English', 'Tagalog'],
      education: 'University of the Philippines, Open University',
      certifications: ['Early Intervention Certification'],
      availability_hours: { start: '09:00', end: '17:00' },
      service_areas: ['Pagadian City', 'Zamboanga del Sur'],
      max_travel_distance: 25,
      verification_status: 'approved',
      rating: 4.8,
      review_count: 50,
      total_sessions: 160,
      completed_sessions: 155,
      response_rate: 96.50,
      completion_rate: 97.00,
      average_response_time: 180,
      is_accepting_new_clients: true,
      consultation_fee: 400.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Early Intervention Assessment', description: 'Developmental screening and assessment for infants and toddlers.', rate: 1600.00, duration: 75, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-3 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Parent Coaching Session', description: 'Guidance and strategies for parents to support their child\'s development at home.', rate: 1250.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 10, category: 'Consultation', age_range: '0-3 years', prerequisites: null, materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'susan.go@buknest.com',
    password: 'password123',
    full_name: 'Susan Go',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639991234567',
    address: 'Ozamiz City, Misamis Occidental',
    is_verified: true,
    date_of_birth: '1989-06-30',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Speech-Language Pathologist',
      specializations: ['Fluency Disorders', 'Voice Disorders', 'Swallowing Disorders'],
      hourly_rate: 1450.00,
      experience_years: 9,
      bio: 'Specialized Speech-Language Pathologist focusing on fluency, voice, and swallowing difficulties in children.',
      credentials: ['MS, Speech-Language Pathology', 'Certified Dysphagia Therapist'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Speech-Language Pathologist',
      languages: ['English', 'Tagalog', 'Cebuano'],
      education: 'University of San Carlos',
      certifications: ['Dysphagia Therapy Certification'],
      availability_hours: { start: '09:00', end: '17:00' },
      service_areas: ['Ozamiz City', 'Misamis Occidental'],
      max_travel_distance: 20,
      verification_status: 'approved',
      rating: 4.8,
      review_count: 60,
      total_sessions: 200,
      completed_sessions: 190,
      response_rate: 97.00,
      completion_rate: 95.00,
      average_response_time: 150,
      is_accepting_new_clients: true,
      consultation_fee: 450.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Fluency Assessment', description: 'Evaluation of stuttering and other fluency disorders.', rate: 1800.00, duration: 75, session_type: ['online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Voice Therapy', description: 'Therapy for vocal cord dysfunction and voice quality issues.', rate: 1450.00, duration: 60, session_type: ['online'], max_sessions: 15, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'allen.perez@buknest.com',
    password: 'password123',
    full_name: 'Allen Perez',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639052345678',
    address: 'Kidapawan City, Cotabato',
    is_verified: true,
    date_of_birth: '1984-10-22',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Occupational Therapist',
      specializations: ['Sensory Processing', 'Self-Care Skills', 'Handwriting'],
      hourly_rate: 1200.00,
      experience_years: 10,
      bio: 'Experienced Occupational Therapist helping children develop independence in daily activities and sensory regulation.',
      credentials: ['BS, Occupational Therapy', 'Certified in Sensory Integration'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Occupational Therapist',
      languages: ['English', 'Tagalog'],
      education: 'University of Perpetual Help System DALTA',
      certifications: ['Sensory Integration Certification'],
      availability_hours: { start: '08:00', end: '16:00' },
      service_areas: ['Kidapawan City', 'Cotabato'],
      max_travel_distance: 20,
      verification_status: 'approved',
      rating: 4.7,
      review_count: 50,
      total_sessions: 180,
      completed_sessions: 170,
      response_rate: 96.00,
      completion_rate: 94.50,
      average_response_time: 200,
      is_accepting_new_clients: true,
      consultation_fee: 350.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Sensory Profile Assessment', description: 'Assessment of sensory processing patterns and their impact on daily life.', rate: 1500.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Fine Motor Skills Therapy', description: 'Therapy to improve hand-eye coordination, dexterity, and handwriting.', rate: 1200.00, duration: 45, session_type: ['home_visit', 'online'], max_sessions: 15, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'michelle.chan@buknest.com',
    password: 'password123',
    full_name: 'Michelle Chan',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639183456789',
    address: 'Koronadal City, South Cotabato',
    is_verified: true,
    date_of_birth: '1991-03-08',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Speech-Language Pathologist',
      specializations: ['Autism Communication', 'AAC (Augmentative and Alternative Communication)', 'Social Pragmatics'],
      hourly_rate: 1550.00,
      experience_years: 8,
      bio: 'Specializing in communication for children with autism and complex communication needs, including AAC.',
      credentials: ['MS, Speech-Language Pathology', 'AAC Specialist Certification'],
      availability_days: ['Tuesday', 'Thursday', 'Saturday'],
      documents_uploaded: true,
      profession: 'Speech-Language Pathologist',
      languages: ['English', 'Tagalog'],
      education: 'University of the Philippines, Manila',
      certifications: ['AAC Specialist Certification'],
      availability_hours: { start: '10:00', end: '18:00' },
      service_areas: ['Koronadal City', 'South Cotabato'],
      max_travel_distance: 25,
      verification_status: 'approved',
      rating: 4.9,
      review_count: 70,
      total_sessions: 230,
      completed_sessions: 225,
      response_rate: 98.00,
      completion_rate: 97.50,
      average_response_time: 120,
      is_accepting_new_clients: true,
      consultation_fee: 500.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'AAC Assessment', description: 'Evaluation for Augmentative and Alternative Communication needs.', rate: 2000.00, duration: 90, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Social Pragmatic Therapy', description: 'Therapy to improve social communication and interaction skills.', rate: 1550.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 20, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'jose.reyes@buknest.com',
    password: 'password123',
    full_name: 'Jose Reyes',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639204567890',
    address: 'Valencia City, Bukidnon',
    is_verified: true,
    date_of_birth: '1981-12-01',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Physical Therapist',
      specializations: ['Developmental Coordination Disorder', 'Postural Control', 'Gait Training'],
      hourly_rate: 1300.00,
      experience_years: 12,
      bio: 'Physical Therapist specializing in motor development and coordination for children with various physical challenges.',
      credentials: ['BS, Physical Therapy', 'Licensed Physical Therapist'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Physical Therapist',
      languages: ['English', 'Tagalog'],
      education: 'University of Santo Tomas',
      certifications: ['Pediatric Physical Therapy'],
      availability_hours: { start: '09:00', end: '17:00' },
      service_areas: ['Valencia City', 'Bukidnon'],
      max_travel_distance: 30,
      verification_status: 'approved',
      rating: 4.8,
      review_count: 65,
      total_sessions: 210,
      completed_sessions: 205,
      response_rate: 97.00,
      completion_rate: 96.00,
      average_response_time: 180,
      is_accepting_new_clients: true,
      consultation_fee: 400.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Motor Skills Assessment', description: 'Evaluation of gross motor skills, balance, and coordination.', rate: 1700.00, duration: 75, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Gait Training Therapy', description: 'Specialized therapy to improve walking patterns and mobility.', rate: 1300.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 15, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'kim.gonzales@buknest.com',
    password: 'password123',
    full_name: 'Kim Gonzales',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639305678901',
    address: 'Malaybalay City, Bukidnon',
    is_verified: true,
    date_of_birth: '1993-07-20',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Child Psychologist',
      specializations: ['Autism Spectrum Disorder', 'ADHD', 'Play Therapy'],
      hourly_rate: 1700.00,
      experience_years: 5,
      bio: 'Child Psychologist specializing in play therapy and behavioral interventions for children with ASD and ADHD.',
      credentials: ['MA, Developmental Psychology', 'Licensed Psychologist'],
      availability_days: ['Tuesday', 'Thursday', 'Saturday'],
      documents_uploaded: true,
      profession: 'Child Psychologist',
      languages: ['English', 'Tagalog'],
      education: 'University of the Philippines, Diliman',
      certifications: ['Play Therapy Certification'],
      availability_hours: { start: '10:00', end: '18:00' },
      service_areas: ['Malaybalay City', 'Bukidnon'],
      max_travel_distance: 20,
      verification_status: 'approved',
      rating: 4.9,
      review_count: 60,
      total_sessions: 130,
      completed_sessions: 125,
      response_rate: 98.50,
      completion_rate: 97.00,
      average_response_time: 100,
      is_accepting_new_clients: true,
      consultation_fee: 650.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Play Therapy Session', description: 'Child-centered therapy using play to address emotional and behavioral issues.', rate: 1700.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 10, category: 'Therapy', age_range: '3-12 years', prerequisites: null, materials_needed: ['Toys', 'Art supplies'], is_active: true },
      { name: 'Parent Counseling', description: 'Support and guidance for parents on managing child behavior and development.', rate: 1500.00, duration: 60, session_type: ['online'], max_sessions: 5, category: 'Consultation', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'leo.fernandez@buknest.com',
    password: 'password123',
    full_name: 'Leo Fernandez',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639456789012',
    address: 'Surigao City, Surigao del Norte',
    is_verified: true,
    date_of_birth: '1986-02-10',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Behavioral Therapist',
      specializations: ['ADHD Management', 'Oppositional Defiant Disorder (ODD)', 'Social Skills'],
      hourly_rate: 1400.00,
      experience_years: 9,
      bio: 'Behavioral Therapist providing strategies and support for children with ADHD, ODD, and social skill deficits.',
      credentials: ['MA, Behavioral Psychology', 'Certified Behavioral Specialist'],
      availability_days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      documents_uploaded: true,
      profession: 'Behavioral Therapist',
      languages: ['English', 'Tagalog'],
      education: 'University of Santo Tomas',
      certifications: ['ADHD Behavioral Management'],
      availability_hours: { start: '08:00', end: '16:00' },
      service_areas: ['Surigao City', 'Surigao del Norte'],
      max_travel_distance: 25,
      verification_status: 'approved',
      rating: 4.7,
      review_count: 55,
      total_sessions: 190,
      completed_sessions: 185,
      response_rate: 96.00,
      completion_rate: 95.00,
      average_response_time: 200,
      is_accepting_new_clients: true,
      consultation_fee: 400.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Behavioral Assessment', description: 'Assessment of challenging behaviors and development of intervention plans.', rate: 1800.00, duration: 75, session_type: ['home_visit', 'online'], max_sessions: 1, category: 'Assessment', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Behavioral Coaching', description: 'Individual coaching sessions for children and parents on behavioral strategies.', rate: 1400.00, duration: 60, session_type: ['home_visit', 'online'], max_sessions: 15, category: 'Therapy', age_range: '0-18 years', prerequisites: 'Assessment', materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'patricia.diaz@buknest.com',
    password: 'password123',
    full_name: 'Patricia Diaz',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639987890123',
    address: 'Tandag City, Surigao del Sur',
    is_verified: true,
    date_of_birth: '1990-09-05',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Occupational Therapist',
      specializations: ['Sensory Integration', 'ADL Training (Activities of Daily Living)', 'Assistive Technology'],
      hourly_rate: 1200.00,
      experience_years: 6,
      bio: 'Occupational Therapist empowering children with disabilities to participate fully in daily activities through adaptive strategies and assistive technology.',
      credentials: ['BS, Occupational Therapy', 'Certified Assistive Technology Professional'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Occupational Therapist',
      languages: ['English', 'Tagalog'],
      education: 'University of Perpetual Help System DALTA',
      certifications: ['Assistive Technology Professional (ATP)'],
      availability_hours: { start: '09:00', end: '17:00' },
      service_areas: ['Tandag City', 'Surigao del Sur'],
      max_travel_distance: 20,
      verification_status: 'approved',
      rating: 4.8,
      review_count: 40,
      total_sessions: 100,
      completed_sessions: 95,
      response_rate: 95.50,
      completion_rate: 95.00,
      average_response_time: 240,
      is_accepting_new_clients: true,
      consultation_fee: 350.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'ADL Training', description: 'Training for activities of daily living such as dressing, feeding, and hygiene.', rate: 1200.00, duration: 60, session_type: ['home_visit'], max_sessions: 10, category: 'Therapy', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Assistive Technology Consultation', description: 'Assessment and recommendation of assistive devices and technologies.', rate: 1500.00, duration: 90, session_type: ['online'], max_sessions: 5, category: 'Consultation', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true }
    ]
  },
  {
    email: 'daniel.tan@buknest.com',
    password: 'password123',
    full_name: 'Daniel Tan',
    role: 'professional',
    avatar_url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    phone_number: '+639190123456',
    address: 'Marawi City, Lanao del Sur',
    is_verified: true,
    date_of_birth: '1980-04-20',
    preferred_language: 'en',
    timezone: 'Asia/Manila',
    notification_preferences: { sms: true, push: true, email: true },
    professional_profile: {
      title: 'Special Education Teacher (SPED)',
      specializations: ['Autism Spectrum Disorder', 'Intellectual Disability', 'Inclusive Education'],
      hourly_rate: 1100.00,
      experience_years: 14,
      bio: 'Experienced SPED teacher advocating for inclusive education and providing tailored support for children with autism and intellectual disabilities.',
      credentials: ['BSED, Special Education', 'MA, Inclusive Education'],
      availability_days: ['Monday', 'Wednesday', 'Friday'],
      documents_uploaded: true,
      profession: 'Special Education Teacher (SPED)',
      languages: ['English', 'Tagalog', 'Maranao'],
      education: 'Mindanao State University',
      certifications: ['Inclusive Education Specialist'],
      availability_hours: { start: '08:00', end: '16:00' },
      service_areas: ['Marawi City', 'Lanao del Sur'],
      max_travel_distance: 20,
      verification_status: 'approved',
      rating: 4.7,
      review_count: 50,
      total_sessions: 180,
      completed_sessions: 170,
      response_rate: 96.00,
      completion_rate: 94.00,
      average_response_time: 200,
      is_accepting_new_clients: true,
      consultation_fee: 300.00,
      cancellation_policy: '24-hour notice for cancellations.'
    },
    services: [
      { name: 'Inclusive Classroom Support', description: 'Support for children with special needs in mainstream classroom settings.', rate: 1100.00, duration: 60, session_type: ['home_visit'], max_sessions: 15, category: 'Education', age_range: '5-18 years', prerequisites: null, materials_needed: [], is_active: true },
      { name: 'Individualized Learning Plan', description: 'Development and implementation of personalized learning plans.', rate: 1300.00, duration: 90, session_type: ['online'], max_sessions: 5, category: 'Consultation', age_range: '0-18 years', prerequisites: null, materials_needed: [], is_active: true }
    ]
  }
];

async function createProfessionals() {
  console.log('Starting to create sample professional users...');
  const createdUsers = [];

  for (const prof of professionalsData) {
    try {
      // Attempt to sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: prof.email,
        password: prof.password,
        options: {
          data: {
            full_name: prof.full_name,
            role: prof.role,
          },
        },
      });

      if (error) {
        // If user already exists, try to get their ID
        if (error.message.includes('User already registered')) {
          console.warn(`User ${prof.email} already exists. Attempting to retrieve existing user.`);
          const { data: existingUser, error: getUserError } = await supabase.auth.signInWithPassword({
            email: prof.email,
            password: prof.password,
          });
          if (getUserError) {
            console.error(`Failed to sign in existing user ${prof.email}:`, getUserError.message);
            continue;
          }
          if (existingUser.user) {
            console.log(`Retrieved existing user: ${existingUser.user.email} with ID: ${existingUser.user.id}`);
            createdUsers.push({
              id: existingUser.user.id,
              email: existingUser.user.email,
              full_name: prof.full_name,
              role: prof.role,
              profile_data: prof.professional_profile,
              services_data: prof.services,
              user_profile_data: prof // Pass full user profile data
            });
          }
        } else {
          console.error(`Error signing up ${prof.email}:`, error.message);
        }
      } else if (data.user) {
        console.log(`Successfully created user: ${data.user.email} with ID: ${data.user.id}`);
        createdUsers.push({
          id: data.user.id,
          email: data.user.email,
          full_name: prof.full_name,
          role: prof.role,
          profile_data: prof.professional_profile,
          services_data: prof.services,
          user_profile_data: prof // Pass full user profile data
        });
      }
    } catch (e) {
      console.error(`Unexpected error for ${prof.email}:`, e);
    }
  }

  console.log('\n--- Created Professional Users ---');
  for (const user of createdUsers) {
    console.log(`ID: ${user.id}, Email: ${user.email}, Name: ${user.full_name}`);

    // Update user_profiles table with more details
    try {
      const { error: updateProfileError } = await supabase
        .from('user_profiles')
        .update({
          full_name: user.user_profile_data.full_name,
          phone_number: user.user_profile_data.phone_number,
          address: user.user_profile_data.address,
          avatar_url: user.user_profile_data.avatar_url,
          is_verified: user.user_profile_data.is_verified,
          date_of_birth: user.user_profile_data.date_of_birth,
          preferred_language: user.user_profile_data.preferred_language,
          timezone: user.user_profile_data.timezone,
          notification_preferences: user.user_profile_data.notification_preferences,
          is_active: true // Ensure user is active
        })
        .eq('id', user.id);

      if (updateProfileError) {
        console.error(`Error updating user_profile for ${user.email}:`, updateProfileError.message);
      } else {
        console.log(`Updated user_profile for ${user.email}`);
      }
    } catch (e) {
      console.error(`Unexpected error updating user_profile for ${user.email}:`, e);
    }

    // Insert into professional_profiles
    try {
      const { error: insertProfError } = await supabase
        .from('professional_profiles')
        .insert({
          id: user.id,
          ...user.profile_data
        });

      if (insertProfError) {
        // If professional profile already exists, update it
        if (insertProfError.code === '23505') { // Unique violation code
          console.warn(`Professional profile for ${user.email} already exists. Attempting to update.`);
          const { error: updateProfError } = await supabase
            .from('professional_profiles')
            .update(user.profile_data)
            .eq('id', user.id);
          if (updateProfError) {
            console.error(`Error updating professional_profile for ${user.email}:`, updateProfError.message);
          } else {
            console.log(`Updated professional_profile for ${user.email}`);
          }
        } else {
          console.error(`Error inserting professional_profile for ${user.email}:`, insertProfError.message);
        }
      } else {
        console.log(`Inserted professional_profile for ${user.email}`);
      }
    } catch (e) {
      console.error(`Unexpected error inserting/updating professional_profile for ${user.email}:`, e);
    }

    // Insert services
    for (const service of user.services_data) {
      try {
        const { error: insertServiceError } = await supabase
          .from('services')
          .insert({
            professional_id: user.id,
            ...service
          });

        if (insertServiceError) {
          console.error(`Error inserting service '${service.name}' for ${user.email}:`, insertServiceError.message);
        } else {
          console.log(`Inserted service '${service.name}' for ${user.email}`);
        }
      } catch (e) {
        console.error(`Unexpected error inserting service '${service.name}' for ${user.email}:`, e);
      }
    }
  }

  console.log('\n--- Data Population Complete ---');
  console.log('You can now verify the data in your Supabase tables.');
}

createProfessionals();