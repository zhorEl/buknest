/*
  # Comprehensive BukNEST Database Schema

  This migration creates the complete database schema for the BukNEST platform,
  supporting all features shown in the UI components.

  ## 1. Custom Types
  - user_role: parent, professional, admin
  - session_type: home_visit, online  
  - session_status: scheduled, completed, cancelled, rescheduled
  - assessment_type: ai_preassessment, professional
  - severity_level: mild, moderate, severe
  - verification_status: pending, approved, rejected, under_review
  - booking_status: pending, accepted, confirmed, completed, cancelled, declined

  ## 2. Core Tables
  - user_profiles: Base user information for all user types
  - professional_profiles: Extended professional data with ratings and specializations
  - children: Child profiles with conditions and progress tracking
  - services: Professional service offerings with pricing
  - availability: Professional scheduling availability
  - bookings: Session booking requests with comprehensive tracking
  - sessions: Actual therapy sessions with detailed information
  - assessments: AI and professional assessments with recommendations
  - session_reports: Progress reports for completed sessions
  - reviews: Professional ratings and reviews from parents
  - messages: Communication system between users
  - verification_documents: Professional verification file tracking
  - milestones: Child development milestone tracking

  ## 3. Security
  - Row Level Security (RLS) enabled on all tables
  - Comprehensive policies for each user role
  - Secure data access based on relationships and ownership

  ## 4. Performance
  - Strategic indexes on frequently queried columns
  - GIN indexes for array fields
  - Composite indexes for complex queries

  ## 5. Automation
  - Auto-update triggers for updated_at columns
  - Automatic user profile creation on signup
  - Professional rating calculations
  - Child progress score updates
*/

-- Create custom types (with existence checks)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('parent', 'professional', 'admin');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'session_type') THEN
    CREATE TYPE session_type AS ENUM ('home_visit', 'online');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'session_status') THEN
    CREATE TYPE session_status AS ENUM ('scheduled', 'completed', 'cancelled', 'rescheduled');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'assessment_type') THEN
    CREATE TYPE assessment_type AS ENUM ('ai_preassessment', 'professional');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'severity_level') THEN
    CREATE TYPE severity_level AS ENUM ('mild', 'moderate', 'severe');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'verification_status') THEN
    CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected', 'under_review');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
    CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'confirmed', 'completed', 'cancelled', 'declined');
  END IF;
END $$;

-- Create or update updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create or update user profile creation trigger function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'parent'::user_role)
  );
  RETURN NEW;
END;
$$ language 'plpgsql' security definer;

-- Create user_profiles table (enhanced)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'parent',
  full_name text NOT NULL,
  phone_number text,
  address text,
  avatar_url text,
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  date_of_birth date,
  emergency_contact text,
  preferred_language text DEFAULT 'en',
  timezone text DEFAULT 'Asia/Manila',
  notification_preferences jsonb DEFAULT '{"email": true, "sms": false, "push": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add missing columns to existing user_profiles table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'is_active') THEN
    ALTER TABLE user_profiles ADD COLUMN is_active boolean DEFAULT true;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'date_of_birth') THEN
    ALTER TABLE user_profiles ADD COLUMN date_of_birth date;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'emergency_contact') THEN
    ALTER TABLE user_profiles ADD COLUMN emergency_contact text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'preferred_language') THEN
    ALTER TABLE user_profiles ADD COLUMN preferred_language text DEFAULT 'en';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'timezone') THEN
    ALTER TABLE user_profiles ADD COLUMN timezone text DEFAULT 'Asia/Manila';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'notification_preferences') THEN
    ALTER TABLE user_profiles ADD COLUMN notification_preferences jsonb DEFAULT '{"email": true, "sms": false, "push": true}'::jsonb;
  END IF;
END $$;

-- Add missing columns to existing children table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'gender') THEN
    ALTER TABLE children ADD COLUMN gender text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'favorite_activities') THEN
    ALTER TABLE children ADD COLUMN favorite_activities text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'communication_style') THEN
    ALTER TABLE children ADD COLUMN communication_style text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'behavioral_triggers') THEN
    ALTER TABLE children ADD COLUMN behavioral_triggers text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'calming_strategies') THEN
    ALTER TABLE children ADD COLUMN calming_strategies text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'current_goals') THEN
    ALTER TABLE children ADD COLUMN current_goals text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'current_professionals') THEN
    ALTER TABLE children ADD COLUMN current_professionals text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'emergency_contact') THEN
    ALTER TABLE children ADD COLUMN emergency_contact text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'school_info') THEN
    ALTER TABLE children ADD COLUMN school_info text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'medical_history') THEN
    ALTER TABLE children ADD COLUMN medical_history text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'allergies') THEN
    ALTER TABLE children ADD COLUMN allergies text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'medications') THEN
    ALTER TABLE children ADD COLUMN medications text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'avatar_url') THEN
    ALTER TABLE children ADD COLUMN avatar_url text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'progress_score') THEN
    ALTER TABLE children ADD COLUMN progress_score integer DEFAULT 0 CHECK (progress_score >= 0 AND progress_score <= 100);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'total_sessions') THEN
    ALTER TABLE children ADD COLUMN total_sessions integer DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'completed_sessions') THEN
    ALTER TABLE children ADD COLUMN completed_sessions integer DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'children' AND column_name = 'is_active') THEN
    ALTER TABLE children ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;

-- Add missing columns to existing professional_profiles table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'profession') THEN
    ALTER TABLE professional_profiles ADD COLUMN profession text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'languages') THEN
    ALTER TABLE professional_profiles ADD COLUMN languages text[] DEFAULT '{"English"}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'education') THEN
    ALTER TABLE professional_profiles ADD COLUMN education text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'certifications') THEN
    ALTER TABLE professional_profiles ADD COLUMN certifications text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'availability_hours') THEN
    ALTER TABLE professional_profiles ADD COLUMN availability_hours jsonb DEFAULT '{"start": "09:00", "end": "17:00"}'::jsonb;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'service_areas') THEN
    ALTER TABLE professional_profiles ADD COLUMN service_areas text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'max_travel_distance') THEN
    ALTER TABLE professional_profiles ADD COLUMN max_travel_distance integer DEFAULT 50;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'verification_status') THEN
    ALTER TABLE professional_profiles ADD COLUMN verification_status verification_status DEFAULT 'pending';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'verification_notes') THEN
    ALTER TABLE professional_profiles ADD COLUMN verification_notes text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'rating') THEN
    ALTER TABLE professional_profiles ADD COLUMN rating numeric(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'review_count') THEN
    ALTER TABLE professional_profiles ADD COLUMN review_count integer DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'total_sessions') THEN
    ALTER TABLE professional_profiles ADD COLUMN total_sessions integer DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'completed_sessions') THEN
    ALTER TABLE professional_profiles ADD COLUMN completed_sessions integer DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'response_rate') THEN
    ALTER TABLE professional_profiles ADD COLUMN response_rate numeric(5,2) DEFAULT 0.00 CHECK (response_rate >= 0 AND response_rate <= 100);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'completion_rate') THEN
    ALTER TABLE professional_profiles ADD COLUMN completion_rate numeric(5,2) DEFAULT 0.00 CHECK (completion_rate >= 0 AND completion_rate <= 100);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'average_response_time') THEN
    ALTER TABLE professional_profiles ADD COLUMN average_response_time integer DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'is_accepting_new_clients') THEN
    ALTER TABLE professional_profiles ADD COLUMN is_accepting_new_clients boolean DEFAULT true;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'consultation_fee') THEN
    ALTER TABLE professional_profiles ADD COLUMN consultation_fee numeric(10,2) DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professional_profiles' AND column_name = 'cancellation_policy') THEN
    ALTER TABLE professional_profiles ADD COLUMN cancellation_policy text;
  END IF;
END $$;

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  rate numeric(10,2) NOT NULL CHECK (rate >= 0),
  duration integer NOT NULL CHECK (duration > 0),
  session_type text[] NOT NULL DEFAULT '{"home_visit", "online"}',
  max_sessions integer DEFAULT 10 CHECK (max_sessions > 0),
  category text,
  age_range text,
  prerequisites text,
  materials_needed text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create availability table
CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  max_sessions_per_day integer DEFAULT 8,
  break_duration integer DEFAULT 15,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(professional_id, day_of_week)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  session_date date NOT NULL,
  session_time time NOT NULL,
  duration integer NOT NULL DEFAULT 60 CHECK (duration > 0),
  session_type session_type NOT NULL DEFAULT 'online',
  status booking_status DEFAULT 'pending',
  notes text,
  special_requirements text,
  address text,
  meeting_link text,
  rate numeric(10,2) NOT NULL CHECK (rate >= 0),
  total_amount numeric(10,2) NOT NULL CHECK (total_amount >= 0),
  payment_status text DEFAULT 'pending',
  payment_method text,
  cancellation_reason text,
  rescheduled_from uuid REFERENCES bookings(id),
  requested_at timestamptz DEFAULT now(),
  responded_at timestamptz,
  confirmed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update existing sessions table or create if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'sessions') THEN
    CREATE TABLE sessions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
      parent_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
      professional_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
      child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
      session_date date NOT NULL,
      session_time time NOT NULL,
      duration integer NOT NULL DEFAULT 60 CHECK (duration > 0),
      session_type session_type NOT NULL DEFAULT 'online',
      status session_status DEFAULT 'scheduled',
      notes text,
      preparation_notes text,
      address text,
      meeting_link text,
      recording_url text,
      materials_used text[] DEFAULT '{}',
      homework_assigned text,
      next_session_recommendations text,
      started_at timestamptz,
      completed_at timestamptz,
      actual_duration integer,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  ELSE
    -- Add missing columns to existing sessions table
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'booking_id') THEN
      ALTER TABLE sessions ADD COLUMN booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'preparation_notes') THEN
      ALTER TABLE sessions ADD COLUMN preparation_notes text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'recording_url') THEN
      ALTER TABLE sessions ADD COLUMN recording_url text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'materials_used') THEN
      ALTER TABLE sessions ADD COLUMN materials_used text[] DEFAULT '{}';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'homework_assigned') THEN
      ALTER TABLE sessions ADD COLUMN homework_assigned text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'next_session_recommendations') THEN
      ALTER TABLE sessions ADD COLUMN next_session_recommendations text;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'started_at') THEN
      ALTER TABLE sessions ADD COLUMN started_at timestamptz;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'completed_at') THEN
      ALTER TABLE sessions ADD COLUMN completed_at timestamptz;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sessions' AND column_name = 'actual_duration') THEN
      ALTER TABLE sessions ADD COLUMN actual_duration integer;
    END IF;
  END IF;
END $$;

-- Create session_reports table
CREATE TABLE IF NOT EXISTS session_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  progress_rating integer CHECK (progress_rating >= 1 AND progress_rating <= 10),
  progress_notes text,
  activities_performed text[] DEFAULT '{}',
  goals_worked_on text[] DEFAULT '{}',
  goals_achieved text[] DEFAULT '{}',
  challenges_encountered text,
  homework_assigned text,
  next_session_recommendations text,
  parent_feedback text,
  child_engagement_level integer CHECK (child_engagement_level >= 1 AND child_engagement_level <= 10),
  session_effectiveness integer CHECK (session_effectiveness >= 1 AND session_effectiveness <= 10),
  attachments text[] DEFAULT '{}',
  is_shared_with_parent boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  session_id uuid REFERENCES sessions(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  communication_rating integer CHECK (communication_rating >= 1 AND communication_rating <= 5),
  punctuality_rating integer CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  effectiveness_rating integer CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
  would_recommend boolean DEFAULT true,
  is_anonymous boolean DEFAULT false,
  is_published boolean DEFAULT true,
  professional_response text,
  helpful_votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  child_id uuid REFERENCES children(id) ON DELETE SET NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  session_id uuid REFERENCES sessions(id) ON DELETE SET NULL,
  subject text,
  message_text text NOT NULL,
  message_type text DEFAULT 'general',
  priority text DEFAULT 'normal',
  attachments text[] DEFAULT '{}',
  is_read boolean DEFAULT false,
  is_system_message boolean DEFAULT false,
  read_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create verification_documents table
CREATE TABLE IF NOT EXISTS verification_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  mime_type text,
  verification_status verification_status DEFAULT 'pending',
  verified_by uuid REFERENCES user_profiles(id),
  verified_at timestamptz,
  verification_notes text,
  expiry_date date,
  is_required boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  professional_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  category text,
  target_date date,
  achieved_date date,
  is_achieved boolean DEFAULT false,
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  notes text,
  evidence_files text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies

-- User Profiles Policies (keep existing ones)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can view own profile') THEN
    CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can insert own profile') THEN
    CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Admins can view all profiles') THEN
    CREATE POLICY "Admins can view all profiles" ON user_profiles FOR SELECT TO authenticated 
    USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;
END $$;

-- Services Policies
CREATE POLICY "Professionals can manage own services" ON services FOR ALL TO authenticated 
USING (professional_id = auth.uid());

CREATE POLICY "Public can view active services" ON services FOR SELECT TO authenticated 
USING (is_active = true);

-- Availability Policies
CREATE POLICY "Professionals can manage own availability" ON availability FOR ALL TO authenticated 
USING (professional_id = auth.uid());

CREATE POLICY "Public can view professional availability" ON availability FOR SELECT TO authenticated 
USING (is_available = true);

-- Bookings Policies
CREATE POLICY "Parents can manage own bookings" ON bookings FOR ALL TO authenticated 
USING (parent_id = auth.uid());

CREATE POLICY "Professionals can view and update their bookings" ON bookings FOR ALL TO authenticated 
USING (professional_id = auth.uid());

CREATE POLICY "Admins can view all bookings" ON bookings FOR SELECT TO authenticated 
USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Session Reports Policies
CREATE POLICY "Professionals can manage own session reports" ON session_reports FOR ALL TO authenticated 
USING (professional_id = auth.uid());

CREATE POLICY "Parents can view reports for their children" ON session_reports FOR SELECT TO authenticated 
USING (EXISTS (SELECT 1 FROM children WHERE id = session_reports.child_id AND parent_id = auth.uid()));

-- Reviews Policies
CREATE POLICY "Parents can create reviews for their sessions" ON reviews FOR INSERT TO authenticated 
WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Parents can view and update own reviews" ON reviews FOR ALL TO authenticated 
USING (parent_id = auth.uid());

CREATE POLICY "Professionals can view reviews about them" ON reviews FOR SELECT TO authenticated 
USING (professional_id = auth.uid());

CREATE POLICY "Public can view published reviews" ON reviews FOR SELECT TO authenticated 
USING (is_published = true);

-- Messages Policies
CREATE POLICY "Users can view own messages" ON messages FOR SELECT TO authenticated 
USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON messages FOR INSERT TO authenticated 
WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update own sent messages" ON messages FOR UPDATE TO authenticated 
USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Verification Documents Policies
CREATE POLICY "Professionals can manage own verification documents" ON verification_documents FOR ALL TO authenticated 
USING (professional_id = auth.uid());

CREATE POLICY "Admins can view all verification documents" ON verification_documents FOR SELECT TO authenticated 
USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Milestones Policies
CREATE POLICY "Parents can view milestones for their children" ON milestones FOR SELECT TO authenticated 
USING (EXISTS (SELECT 1 FROM children WHERE id = milestones.child_id AND parent_id = auth.uid()));

CREATE POLICY "Professionals can manage milestones for their clients" ON milestones FOR ALL TO authenticated 
USING (professional_id = auth.uid() OR EXISTS (
  SELECT 1 FROM children WHERE id = milestones.child_id AND parent_id = auth.uid()
));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_verified ON user_profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_active ON user_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

CREATE INDEX IF NOT EXISTS idx_professional_profiles_is_verified ON professional_profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_rating ON professional_profiles(rating);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_specializations ON professional_profiles USING GIN(specializations);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_service_areas ON professional_profiles USING GIN(service_areas);

CREATE INDEX IF NOT EXISTS idx_children_parent_id ON children(parent_id);
CREATE INDEX IF NOT EXISTS idx_children_is_active ON children(is_active);
CREATE INDEX IF NOT EXISTS idx_children_conditions ON children USING GIN(conditions);
CREATE INDEX IF NOT EXISTS idx_children_age ON children(age);

CREATE INDEX IF NOT EXISTS idx_services_professional_id ON services(professional_id);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_rate ON services(rate);

CREATE INDEX IF NOT EXISTS idx_availability_professional_id ON availability(professional_id);
CREATE INDEX IF NOT EXISTS idx_availability_day_of_week ON availability(day_of_week);

CREATE INDEX IF NOT EXISTS idx_bookings_parent_id ON bookings(parent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_professional_id ON bookings(professional_id);
CREATE INDEX IF NOT EXISTS idx_bookings_child_id ON bookings(child_id);
CREATE INDEX IF NOT EXISTS idx_bookings_session_date ON bookings(session_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_sessions_professional_id ON sessions(professional_id);
CREATE INDEX IF NOT EXISTS idx_sessions_child_id ON sessions(child_id);
CREATE INDEX IF NOT EXISTS idx_sessions_session_date ON sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);

CREATE INDEX IF NOT EXISTS idx_assessments_child_id ON assessments(child_id);
CREATE INDEX IF NOT EXISTS idx_assessments_type ON assessments(type);

CREATE INDEX IF NOT EXISTS idx_session_reports_session_id ON session_reports(session_id);
CREATE INDEX IF NOT EXISTS idx_session_reports_child_id ON session_reports(child_id);
CREATE INDEX IF NOT EXISTS idx_session_reports_professional_id ON session_reports(professional_id);

CREATE INDEX IF NOT EXISTS idx_reviews_professional_id ON reviews(professional_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_is_published ON reviews(is_published);

CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

CREATE INDEX IF NOT EXISTS idx_verification_documents_professional_id ON verification_documents(professional_id);
CREATE INDEX IF NOT EXISTS idx_verification_documents_status ON verification_documents(verification_status);

CREATE INDEX IF NOT EXISTS idx_milestones_child_id ON milestones(child_id);
CREATE INDEX IF NOT EXISTS idx_milestones_is_achieved ON milestones(is_achieved);

-- Create triggers for updated_at columns
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at') THEN
    CREATE TRIGGER update_user_profiles_updated_at
      BEFORE UPDATE ON user_profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_professional_profiles_updated_at') THEN
    CREATE TRIGGER update_professional_profiles_updated_at
      BEFORE UPDATE ON professional_profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_children_updated_at') THEN
    CREATE TRIGGER update_children_updated_at
      BEFORE UPDATE ON children
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_services_updated_at') THEN
    CREATE TRIGGER update_services_updated_at
      BEFORE UPDATE ON services
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_availability_updated_at') THEN
    CREATE TRIGGER update_availability_updated_at
      BEFORE UPDATE ON availability
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_bookings_updated_at') THEN
    CREATE TRIGGER update_bookings_updated_at
      BEFORE UPDATE ON bookings
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_sessions_updated_at') THEN
    CREATE TRIGGER update_sessions_updated_at
      BEFORE UPDATE ON sessions
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_session_reports_updated_at') THEN
    CREATE TRIGGER update_session_reports_updated_at
      BEFORE UPDATE ON session_reports
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_reviews_updated_at') THEN
    CREATE TRIGGER update_reviews_updated_at
      BEFORE UPDATE ON reviews
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_messages_updated_at') THEN
    CREATE TRIGGER update_messages_updated_at
      BEFORE UPDATE ON messages
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_verification_documents_updated_at') THEN
    CREATE TRIGGER update_verification_documents_updated_at
      BEFORE UPDATE ON verification_documents
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_milestones_updated_at') THEN
    CREATE TRIGGER update_milestones_updated_at
      BEFORE UPDATE ON milestones
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Create trigger for automatic user profile creation
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;

-- Create function to update professional ratings
CREATE OR REPLACE FUNCTION update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE professional_profiles 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews 
      WHERE professional_id = NEW.professional_id AND is_published = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews 
      WHERE professional_id = NEW.professional_id AND is_published = true
    )
  WHERE id = NEW.professional_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic rating updates
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_professional_rating_trigger') THEN
    CREATE TRIGGER update_professional_rating_trigger
      AFTER INSERT OR UPDATE OR DELETE ON reviews
      FOR EACH ROW EXECUTE FUNCTION update_professional_rating();
  END IF;
END $$;

-- Create function to update child progress
CREATE OR REPLACE FUNCTION update_child_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE children 
  SET 
    progress_score = (
      SELECT COALESCE(AVG(progress_rating * 10), 0)
      FROM session_reports 
      WHERE child_id = NEW.child_id AND progress_rating IS NOT NULL
    ),
    completed_sessions = (
      SELECT COUNT(*)
      FROM sessions 
      WHERE child_id = NEW.child_id AND status = 'completed'
    )
  WHERE id = NEW.child_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic progress updates
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_child_progress_trigger') THEN
    CREATE TRIGGER update_child_progress_trigger
      AFTER INSERT OR UPDATE ON session_reports
      FOR EACH ROW EXECUTE FUNCTION update_child_progress();
  END IF;
END $$;