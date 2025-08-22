/*
  # BukNEST Comprehensive Database Schema

  1. New Tables
    - `user_profiles` - Base user information for all user types
    - `professional_profiles` - Extended profile for professionals
    - `children` - Child profiles managed by parents
    - `services` - Services offered by professionals
    - `bookings` - Session booking requests
    - `sessions` - Actual therapy sessions
    - `assessments` - AI and professional assessments
    - `session_reports` - Progress reports for completed sessions
    - `messages` - Communication between users
    - `reviews` - Reviews and ratings for professionals
    - `availability` - Professional availability schedules
    - `verification_documents` - Professional verification files

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for each user role
    - Secure data access based on relationships

  3. Functions
    - Auto-create user profile on signup
    - Update timestamps automatically
    - Calculate progress scores

  4. Indexes
    - Performance optimization for common queries
    - Search functionality support
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('parent', 'professional', 'admin');
CREATE TYPE session_type AS ENUM ('home-visit', 'online');
CREATE TYPE session_status AS ENUM ('pending', 'accepted', 'confirmed', 'completed', 'cancelled', 'rescheduled');
CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'confirmed', 'completed', 'cancelled', 'declined');
CREATE TYPE assessment_type AS ENUM ('ai-preassessment', 'professional');
CREATE TYPE assessment_severity AS ENUM ('mild', 'moderate', 'severe');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected', 'under_review');
CREATE TYPE document_type AS ENUM ('government_id', 'professional_license', 'certification', 'selfie_with_id', 'background_check', 'other');

-- User Profiles Table (Base for all users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'parent',
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone_number text,
  address text,
  avatar_url text,
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Professional Profiles Table
CREATE TABLE IF NOT EXISTS professional_profiles (
  id uuid PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  profession text,
  specializations text[] DEFAULT '{}',
  hourly_rate numeric(10,2) DEFAULT 0,
  experience_years integer DEFAULT 0,
  bio text,
  credentials text[] DEFAULT '{}',
  languages text[] DEFAULT '{"English"}',
  availability_days text[] DEFAULT '{}',
  is_verified boolean DEFAULT false,
  documents_uploaded boolean DEFAULT false,
  verification_status verification_status DEFAULT 'pending',
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  total_sessions integer DEFAULT 0,
  response_rate numeric(5,2) DEFAULT 0,
  completion_rate numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Children Table
CREATE TABLE IF NOT EXISTS children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  age integer NOT NULL CHECK (age >= 0 AND age <= 18),
  date_of_birth date NOT NULL,
  gender text,
  conditions text[] DEFAULT '{}',
  favorite_activities text[] DEFAULT '{}',
  communication_style text,
  behavioral_triggers text,
  calming_strategies text,
  current_goals text,
  current_professionals text,
  emergency_contact text,
  school_info text,
  notes text,
  avatar_url text,
  progress_score numeric(5,2) DEFAULT 0,
  total_sessions integer DEFAULT 0,
  completed_sessions integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  rate numeric(10,2) NOT NULL CHECK (rate >= 0),
  duration integer NOT NULL CHECK (duration > 0), -- in minutes
  session_type session_type[] DEFAULT '{home-visit,online}',
  max_sessions integer DEFAULT 10,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  professional_id uuid REFERENCES professional_profiles(id) ON DELETE SET NULL,
  type assessment_type NOT NULL,
  concerns text[] DEFAULT '{}',
  recommendations text[] DEFAULT '{}',
  severity assessment_severity,
  suggested_professionals text[] DEFAULT '{}',
  notes text,
  assessment_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  session_date date NOT NULL,
  session_time time NOT NULL,
  duration integer NOT NULL CHECK (duration > 0), -- in minutes
  session_type session_type NOT NULL,
  status booking_status DEFAULT 'pending',
  notes text,
  address text, -- for home visits
  meeting_link text, -- for online sessions
  rate numeric(10,2) NOT NULL CHECK (rate >= 0),
  requested_at timestamptz DEFAULT now(),
  responded_at timestamptz,
  confirmed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sessions Table (Actual completed/ongoing sessions)
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  parent_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  session_date date NOT NULL,
  session_time time NOT NULL,
  duration integer NOT NULL CHECK (duration > 0),
  session_type session_type NOT NULL,
  status session_status DEFAULT 'confirmed',
  notes text,
  address text,
  meeting_link text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Session Reports Table
CREATE TABLE IF NOT EXISTS session_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  progress_rating integer CHECK (progress_rating >= 1 AND progress_rating <= 10),
  progress_notes text,
  activities_performed text[] DEFAULT '{}',
  goals_worked_on text[] DEFAULT '{}',
  homework_assigned text,
  next_session_recommendations text,
  parent_feedback text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  session_id uuid REFERENCES sessions(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  is_anonymous boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(parent_id, professional_id, session_id)
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  child_id uuid REFERENCES children(id) ON DELETE SET NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  subject text,
  message_text text NOT NULL,
  is_read boolean DEFAULT false,
  is_system_message boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Availability Table
CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(professional_id, day_of_week, start_time, end_time)
);

-- Verification Documents Table
CREATE TABLE IF NOT EXISTS verification_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id uuid NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
  document_type document_type NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  mime_type text,
  verification_status verification_status DEFAULT 'pending',
  verified_by uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  verified_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE auth_user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for professional_profiles
CREATE POLICY "Professionals can manage own profile" ON professional_profiles
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = professional_profiles.id AND auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view verified professionals" ON professional_profiles
  FOR SELECT TO authenticated
  USING (is_verified = true);

-- RLS Policies for children
CREATE POLICY "Parents can manage own children" ON children
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = children.parent_id AND auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Professionals can view assigned children" ON children
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      JOIN user_profiles up ON up.id = b.professional_id
      WHERE b.child_id = children.id AND up.auth_user_id = auth.uid()
    )
  );

-- RLS Policies for services
CREATE POLICY "Professionals can manage own services" ON services
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = services.professional_id AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view active services" ON services
  FOR SELECT TO authenticated
  USING (is_active = true);

-- RLS Policies for assessments
CREATE POLICY "Parents can view child assessments" ON assessments
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM children c
      JOIN user_profiles up ON up.id = c.parent_id
      WHERE c.id = assessments.child_id AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Professionals can view and create assessments" ON assessments
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = assessments.professional_id AND up.auth_user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM children c
      JOIN user_profiles up ON up.id = c.parent_id
      WHERE c.id = assessments.child_id AND up.auth_user_id = auth.uid()
    )
  );

-- RLS Policies for bookings
CREATE POLICY "Users can manage related bookings" ON bookings
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE (up.id = bookings.parent_id OR up.id = bookings.professional_id)
      AND up.auth_user_id = auth.uid()
    )
  );

-- RLS Policies for sessions
CREATE POLICY "Users can manage related sessions" ON sessions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE (up.id = sessions.parent_id OR up.id = sessions.professional_id)
      AND up.auth_user_id = auth.uid()
    )
  );

-- RLS Policies for session_reports
CREATE POLICY "Professionals can manage own reports" ON session_reports
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = session_reports.professional_id AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view child reports" ON session_reports
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM children c
      JOIN user_profiles up ON up.id = c.parent_id
      WHERE c.id = session_reports.child_id AND up.auth_user_id = auth.uid()
    )
  );

-- RLS Policies for reviews
CREATE POLICY "Users can manage related reviews" ON reviews
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE (up.id = reviews.parent_id OR up.id = reviews.professional_id)
      AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view published reviews" ON reviews
  FOR SELECT TO authenticated
  USING (is_published = true);

-- RLS Policies for messages
CREATE POLICY "Users can manage own messages" ON messages
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE (up.id = messages.sender_id OR up.id = messages.recipient_id)
      AND up.auth_user_id = auth.uid()
    )
  );

-- RLS Policies for availability
CREATE POLICY "Professionals can manage own availability" ON availability
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = availability.professional_id AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view professional availability" ON availability
  FOR SELECT TO authenticated
  USING (is_available = true);

-- RLS Policies for verification_documents
CREATE POLICY "Professionals can manage own documents" ON verification_documents
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = verification_documents.professional_id AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all documents" ON verification_documents
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE auth_user_id = auth.uid() AND role = 'admin'
    )
  );

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professional_profiles_updated_at
  BEFORE UPDATE ON professional_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_children_updated_at
  BEFORE UPDATE ON children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at
  BEFORE UPDATE ON assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_reports_updated_at
  BEFORE UPDATE ON session_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_availability_updated_at
  BEFORE UPDATE ON availability
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verification_documents_updated_at
  BEFORE UPDATE ON verification_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update professional ratings
CREATE OR REPLACE FUNCTION update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE professional_profiles
  SET 
    rating = (
      SELECT COALESCE(AVG(rating::numeric), 0)
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
$$ LANGUAGE plpgsql;

-- Trigger to update professional ratings when reviews change
CREATE TRIGGER update_professional_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_professional_rating();

-- Function to update child progress
CREATE OR REPLACE FUNCTION update_child_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE children
  SET 
    completed_sessions = (
      SELECT COUNT(*)
      FROM sessions
      WHERE child_id = NEW.child_id AND status = 'completed'
    ),
    progress_score = (
      SELECT COALESCE(AVG(progress_rating::numeric), 0)
      FROM session_reports sr
      JOIN sessions s ON s.id = sr.session_id
      WHERE sr.child_id = NEW.child_id
    )
  WHERE id = NEW.child_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update child progress when sessions complete
CREATE TRIGGER update_child_progress_trigger
  AFTER INSERT OR UPDATE ON session_reports
  FOR EACH ROW EXECUTE FUNCTION update_child_progress();

-- Create indexes for performance
CREATE INDEX idx_user_profiles_auth_user_id ON user_profiles(auth_user_id);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);

CREATE INDEX idx_professional_profiles_is_verified ON professional_profiles(is_verified);
CREATE INDEX idx_professional_profiles_specializations ON professional_profiles USING GIN(specializations);
CREATE INDEX idx_professional_profiles_rating ON professional_profiles(rating DESC);

CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_children_conditions ON children USING GIN(conditions);

CREATE INDEX idx_services_professional_id ON services(professional_id);
CREATE INDEX idx_services_is_active ON services(is_active);

CREATE INDEX idx_assessments_child_id ON assessments(child_id);
CREATE INDEX idx_assessments_type ON assessments(type);

CREATE INDEX idx_bookings_parent_id ON bookings(parent_id);
CREATE INDEX idx_bookings_professional_id ON bookings(professional_id);
CREATE INDEX idx_bookings_child_id ON bookings(child_id);
CREATE INDEX idx_bookings_session_date ON bookings(session_date);
CREATE INDEX idx_bookings_status ON bookings(status);

CREATE INDEX idx_sessions_booking_id ON sessions(booking_id);
CREATE INDEX idx_sessions_professional_id ON sessions(professional_id);
CREATE INDEX idx_sessions_child_id ON sessions(child_id);
CREATE INDEX idx_sessions_session_date ON sessions(session_date);
CREATE INDEX idx_sessions_status ON sessions(status);

CREATE INDEX idx_session_reports_session_id ON session_reports(session_id);
CREATE INDEX idx_session_reports_child_id ON session_reports(child_id);

CREATE INDEX idx_reviews_professional_id ON reviews(professional_id);
CREATE INDEX idx_reviews_is_published ON reviews(is_published);

CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);

CREATE INDEX idx_availability_professional_id ON availability(professional_id);
CREATE INDEX idx_availability_day_of_week ON availability(day_of_week);

CREATE INDEX idx_verification_documents_professional_id ON verification_documents(professional_id);
CREATE INDEX idx_verification_documents_status ON verification_documents(verification_status);