import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on our schema
export interface UserProfile {
  id: string
  auth_user_id: string
  role: 'parent' | 'professional' | 'admin'
  full_name: string
  email: string
  phone_number?: string
  address?: string
  avatar_url?: string
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProfessionalProfile {
  id: string
  title: string
  profession?: string
  specializations: string[]
  hourly_rate: number
  experience_years: number
  bio?: string
  credentials: string[]
  languages: string[]
  availability_days: string[]
  is_verified: boolean
  documents_uploaded: boolean
  verification_status: 'pending' | 'approved' | 'rejected' | 'under_review'
  rating: number
  review_count: number
  total_sessions: number
  response_rate: number
  completion_rate: number
  created_at: string
  updated_at: string
}

export interface Child {
  id: string
  parent_id: string
  name: string
  age: number
  date_of_birth: string
  gender?: string
  conditions: string[]
  favorite_activities: string[]
  communication_style?: string
  behavioral_triggers?: string
  calming_strategies?: string
  current_goals?: string
  current_professionals?: string
  emergency_contact?: string
  school_info?: string
  notes?: string
  avatar_url?: string
  progress_score: number
  total_sessions: number
  completed_sessions: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  professional_id: string
  name: string
  description: string
  rate: number
  duration: number
  session_type: ('home-visit' | 'online')[]
  max_sessions: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  parent_id: string
  professional_id: string
  child_id: string
  service_id?: string
  session_date: string
  session_time: string
  duration: number
  session_type: 'home-visit' | 'online'
  status: 'pending' | 'accepted' | 'confirmed' | 'completed' | 'cancelled' | 'declined'
  notes?: string
  address?: string
  meeting_link?: string
  rate: number
  requested_at: string
  responded_at?: string
  confirmed_at?: string
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  booking_id: string
  parent_id: string
  professional_id: string
  child_id: string
  session_date: string
  session_time: string
  duration: number
  session_type: 'home-visit' | 'online'
  status: 'pending' | 'accepted' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
  notes?: string
  address?: string
  meeting_link?: string
  started_at?: string
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface Assessment {
  id: string
  child_id: string
  professional_id?: string
  type: 'ai-preassessment' | 'professional'
  concerns: string[]
  recommendations: string[]
  severity?: 'mild' | 'moderate' | 'severe'
  suggested_professionals: string[]
  notes?: string
  assessment_data: any
  created_at: string
  updated_at: string
}

export interface SessionReport {
  id: string
  session_id: string
  professional_id: string
  child_id: string
  progress_rating?: number
  progress_notes?: string
  activities_performed: string[]
  goals_worked_on: string[]
  homework_assigned?: string
  next_session_recommendations?: string
  parent_feedback?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  parent_id: string
  professional_id: string
  child_id: string
  session_id?: string
  rating: number
  review_text?: string
  is_anonymous: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  child_id?: string
  booking_id?: string
  subject?: string
  message_text: string
  is_read: boolean
  is_system_message: boolean
  created_at: string
  updated_at: string
}

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helper functions
export const getUserProfile = async (authUserId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single()
  
  return { data, error }
}

export const getProfessionalProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('professional_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  return { data, error }
}

export const getChildren = async (parentId: string) => {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', parentId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const getProfessionals = async (filters?: {
  specializations?: string[]
  location?: string
  rating?: number
}) => {
  let query = supabase
    .from('professional_profiles')
    .select(`
      *,
      user_profiles!inner(full_name, avatar_url, address)
    `)
    .eq('is_verified', true)
  
  if (filters?.specializations?.length) {
    query = query.overlaps('specializations', filters.specializations)
  }
  
  if (filters?.rating) {
    query = query.gte('rating', filters.rating)
  }
  
  const { data, error } = await query.order('rating', { ascending: false })
  
  return { data, error }
}

export const getBookings = async (userId: string, role: 'parent' | 'professional') => {
  const column = role === 'parent' ? 'parent_id' : 'professional_id'
  
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      children(name, age, conditions),
      user_profiles!parent_id(full_name, phone_number, email),
      professional_profiles!professional_id(
        user_profiles!inner(full_name, avatar_url)
      )
    `)
    .eq(column, userId)
    .order('session_date', { ascending: true })
  
  return { data, error }
}

export const createBooking = async (bookingData: Partial<Booking>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert(bookingData)
    .select()
    .single()
  
  return { data, error }
}

export const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ 
      status,
      responded_at: status !== 'pending' ? new Date().toISOString() : undefined,
      confirmed_at: status === 'confirmed' ? new Date().toISOString() : undefined
    })
    .eq('id', bookingId)
    .select()
    .single()
  
  return { data, error }
}

export const createAssessment = async (assessmentData: Partial<Assessment>) => {
  const { data, error } = await supabase
    .from('assessments')
    .insert(assessmentData)
    .select()
    .single()
  
  return { data, error }
}

export const getAssessments = async (childId: string) => {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('child_id', childId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}