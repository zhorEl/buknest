import { createClient } from '@supabase/supabase-js'
import type { Child } from '../types/index'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface UserProfile {
  id: string
  role: 'parent' | 'professional' | 'admin'
  full_name: string
  phone_number?: string
  address?: string
  avatar_url?: string
  is_verified: boolean
  created_at: string
  updated_at: string
  is_active: boolean
  date_of_birth?: string
  emergency_contact?: string
  preferred_language: string
  timezone: string
  notification_preferences: {
    sms: boolean
    push: boolean
    email: boolean
  }
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
  session_type: 'home_visit' | 'online'
  status: 'pending' | 'accepted' | 'confirmed' | 'completed' | 'cancelled' | 'declined'
  notes?: string
  special_requirements?: string
  address?: string
  meeting_link?: string
  rate: number
  total_amount: number
  payment_status: string
  payment_method?: string
  cancellation_reason?: string
  rescheduled_from?: string
  requested_at: string
  responded_at?: string
  confirmed_at?: string
  cancelled_at?: string
  created_at: string
  updated_at: string
}

export interface InterventionCategory {
  id: string
  name: string
  description: string
  color: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Intervention {
  id: string
  category_id: string
  name: string
  description: string
  short_description: string
  age_range_min: number
  age_range_max: number
  typical_duration_weeks: number
  sessions_per_week: number
  session_duration_minutes: number
  evidence_level: 'high' | 'moderate' | 'emerging' | 'limited'
  target_conditions: string[]
  prerequisites?: string
  materials_needed: string[]
  training_required: boolean
  certification_needed: boolean
  parent_involvement_level: 'low' | 'moderate' | 'high'
  home_practice_required: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ChildIntervention {
  id: string
  child_id: string
  intervention_id: string
  professional_id?: string
  status: 'active' | 'completed' | 'paused' | 'discontinued'
  start_date: string
  end_date?: string
  goals: string[]
  progress_notes?: string
  effectiveness_rating?: number
  frequency: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Re-export Child type
export type { Child }

// Auth functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
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

// User Profile functions
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}

export const createUserProfile = async (profile: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert(profile)
    .select()
    .single()
  
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Children functions
export const getChildren = async (parentId: string): Promise<Child[]> => {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', parentId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching children:', error)
    return []
  }
  
  return data || []
}

export const createChild = async (child: Partial<Child>) => {
  const { data, error } = await supabase
    .from('children')
    .insert(child)
    .select()
    .single()
  
  return { data, error }
}

export const updateChild = async (childId: string, updates: Partial<Child>) => {
  const { data, error } = await supabase
    .from('children')
    .update(updates)
    .eq('id', childId)
    .select()
    .single()
  
  return { data, error }
}

// Booking functions
export const getBookings = async (userId: string, userRole: string): Promise<Booking[]> => {
  let query = supabase.from('bookings').select('*')
  
  if (userRole === 'parent') {
    query = query.eq('parent_id', userId)
  } else if (userRole === 'professional') {
    query = query.eq('professional_id', userId)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
  
  return data || []
}

export const createBooking = async (booking: Partial<Booking>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single()
  
  return { data, error }
}

export const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', bookingId)
    .select()
    .single()
  
  return { data, error }
}

// Intervention functions
export const getInterventionCategories = async (): Promise<InterventionCategory[]> => {
  const { data, error } = await supabase
    .from('intervention_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  
  if (error) {
    console.error('Error fetching intervention categories:', error)
    return []
  }
  
  return data || []
}

export const getInterventions = async (categoryId?: string): Promise<Intervention[]> => {
  let query = supabase
    .from('interventions')
    .select(`
      *,
      intervention_categories (
        name,
        color
      )
    `)
    .eq('is_active', true)
  
  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }
  
  const { data, error } = await query.order('name')
  
  if (error) {
    console.error('Error fetching interventions:', error)
    return []
  }
  
  return data || []
}

export const getChildInterventions = async (childId: string): Promise<ChildIntervention[]> => {
  const { data, error } = await supabase
    .from('child_interventions')
    .select(`
      *,
      interventions (
        name,
        description,
        category_id,
        intervention_categories (
          name,
          color
        )
      ),
      user_profiles!child_interventions_professional_id_fkey (
        full_name
      )
    `)
    .eq('child_id', childId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching child interventions:', error)
    return []
  }
  
  return data || []
}

export const createChildIntervention = async (childIntervention: Partial<ChildIntervention>) => {
  const { data, error } = await supabase
    .from('child_interventions')
    .insert(childIntervention)
    .select()
    .single()
  
  return { data, error }
}

export const updateChildIntervention = async (id: string, updates: Partial<ChildIntervention>) => {
  const { data, error } = await supabase
    .from('child_interventions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}