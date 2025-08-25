/*
  # Comprehensive BukNEST Database Schema

  This migration creates the complete database schema for the BukNEST platform,
  including all necessary tables, relationships, security policies, and indexes
  based on the application's UI components and forms.

  ## Tables Created:
  1. **user_profiles** - Base user information for all user types
  2. **professional_profiles** - Extended profiles for therapists/professionals  
  3. **children** - Child profiles managed by parents
  4. **services** - Services offered by professionals
  5. **bookings** - Session booking requests
  6. **sessions** - Actual therapy sessions
  7. **assessments** - AI and professional assessments
  8. **session_reports** - Progress reports for completed sessions
  9. **reviews** - Reviews and ratings for professionals
  10. **messages** - Communication between users
  11. **availability** - Professional availability schedules
  12. **verification_documents** - Professional verification files

  ## Security:
  - Row Level Security (RLS) enabled on all tables
  - Comprehensive policies for each user role
  - Secure data access based on relationships and ownership

  ## Performance:
  - Indexes on frequently queried columns
  - GIN indexes for array fields
  - Composite indexes for complex queries
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('parent', 'professional', 'admin');
CREATE TYPE session_type AS ENUM ('home_visit', 'online');
CREATE TYPE session_status AS ENUM ('pending', 'accepted', 'confirmed', 'completed', 'cancelled', 'rescheduled');
CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'confirmed', 'completed', 'cancelled', 'declined');
CREATE TYPE assessment_type AS ENUM ('ai_preassessment', 'professional');
CREATE TYPE severity_level AS ENUM ('mild', 'moderate', 'severe');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected', 'under_review');
CREATE TYPE document_type AS ENUM ('government_id', 'professional_license', 'certification', 'selfie_with_id', 'background_check', 'other');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. USER PROFILES TABLE
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'parent',
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT,
    address TEXT,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    date_of_birth DATE,
    emergency_contact TEXT,
    preferred_language TEXT DEFAULT 'English',
    timezone TEXT DEFAULT 'Asia/Manila',
    notification_preferences JSONB DEFAULT '{"email": true, "sms": false, "push": true}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFESSIONAL PROFILES TABLE
CREATE TABLE IF NOT EXISTS professional_profiles (
    id UUID PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    profession TEXT,
    specializations TEXT[] DEFAULT '{}',
    hourly_rate DECIMAL(10,2) DEFAULT 0,
    experience_years INTEGER DEFAULT 0,
    bio TEXT,
    credentials TEXT[] DEFAULT '{}',
    languages TEXT[] DEFAULT '{"English"}',
    education TEXT,
    certifications TEXT[] DEFAULT '{}',
    availability_days TEXT[] DEFAULT '{}',
    availability_hours JSONB DEFAULT '{"start": "09:00", "end": "17:00"}'::jsonb,
    service_areas TEXT[] DEFAULT '{}',
    max_travel_distance INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    documents_uploaded BOOLEAN DEFAULT FALSE,
    verification_status verification_status DEFAULT 'pending',
    verification_notes TEXT,
    rating DECIMAL(3,2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    total_sessions INTEGER DEFAULT 0,
    completed_sessions INTEGER DEFAULT 0,
    response_rate DECIMAL(5,2) DEFAULT 0.0,
    completion_rate DECIMAL(5,2) DEFAULT 0.0,
    average_response_time INTEGER DEFAULT 0, -- in minutes
    is_accepting_new_clients BOOLEAN DEFAULT TRUE,
    consultation_fee DECIMAL(10,2) DEFAULT 0,
    cancellation_policy TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CHILDREN TABLE
CREATE TABLE IF NOT EXISTS children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 18),
    date_of_birth DATE NOT NULL,
    gender TEXT,
    conditions TEXT[] DEFAULT '{}',
    favorite_activities TEXT[] DEFAULT '{}',
    communication_style TEXT,
    behavioral_triggers TEXT,
    calming_strategies TEXT,
    current_goals TEXT,
    current_professionals TEXT,
    emergency_contact TEXT,
    school_info TEXT,
    medical_history TEXT,
    allergies TEXT[] DEFAULT '{}',
    medications TEXT[] DEFAULT '{}',
    notes TEXT,
    avatar_url TEXT,
    progress_score INTEGER DEFAULT 0 CHECK (progress_score >= 0 AND progress_score <= 100),
    total_sessions INTEGER DEFAULT 0,
    completed_sessions INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    rate DECIMAL(10,2) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    session_type session_type[] DEFAULT '{home_visit,online}',
    max_sessions INTEGER DEFAULT 10,
    category TEXT,
    age_range TEXT,
    prerequisites TEXT,
    materials_needed TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    max_sessions_per_day INTEGER DEFAULT 8,
    break_duration INTEGER DEFAULT 15, -- in minutes
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(professional_id, day_of_week, start_time)
);

-- 6. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    duration INTEGER NOT NULL DEFAULT 60, -- in minutes
    session_type session_type NOT NULL DEFAULT 'online',
    status booking_status DEFAULT 'pending',
    notes TEXT,
    special_requirements TEXT,
    address TEXT,
    meeting_link TEXT,
    rate DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    payment_method TEXT,
    cancellation_reason TEXT,
    rescheduled_from UUID REFERENCES bookings(id),
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    responded_at TIMESTAMPTZ,
    confirmed_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SESSIONS TABLE
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    parent_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    duration INTEGER NOT NULL DEFAULT 60,
    session_type session_type NOT NULL DEFAULT 'online',
    status session_status DEFAULT 'pending',
    notes TEXT,
    preparation_notes TEXT,
    address TEXT,
    meeting_link TEXT,
    recording_url TEXT,
    materials_used TEXT[] DEFAULT '{}',
    homework_assigned TEXT,
    next_session_recommendations TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    actual_duration INTEGER, -- actual session duration in minutes
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ASSESSMENTS TABLE
CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    professional_id UUID REFERENCES professional_profiles(id) ON DELETE SET NULL,
    type assessment_type NOT NULL DEFAULT 'ai_preassessment',
    title TEXT NOT NULL,
    concerns TEXT[] DEFAULT '{}',
    recommendations TEXT[] DEFAULT '{}',
    severity severity_level,
    suggested_professionals TEXT[] DEFAULT '{}',
    goals TEXT[] DEFAULT '{}',
    notes TEXT,
    assessment_data JSONB DEFAULT '{}'::jsonb,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SESSION REPORTS TABLE
CREATE TABLE IF NOT EXISTS session_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    progress_rating INTEGER CHECK (progress_rating >= 1 AND progress_rating <= 10),
    progress_notes TEXT,
    activities_performed TEXT[] DEFAULT '{}',
    goals_worked_on TEXT[] DEFAULT '{}',
    goals_achieved TEXT[] DEFAULT '{}',
    challenges_encountered TEXT,
    homework_assigned TEXT,
    next_session_recommendations TEXT,
    parent_feedback TEXT,
    child_engagement_level INTEGER CHECK (child_engagement_level >= 1 AND child_engagement_level <= 5),
    session_effectiveness INTEGER CHECK (session_effectiveness >= 1 AND session_effectiveness <= 5),
    attachments TEXT[] DEFAULT '{}',
    is_shared_with_parent BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
    effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
    would_recommend BOOLEAN DEFAULT TRUE,
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    professional_response TEXT,
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    child_id UUID REFERENCES children(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    subject TEXT,
    message_text TEXT NOT NULL,
    message_type TEXT DEFAULT 'general',
    priority TEXT DEFAULT 'normal',
    attachments TEXT[] DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    is_system_message BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. VERIFICATION DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professional_id UUID NOT NULL REFERENCES professional_profiles(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    verification_status verification_status DEFAULT 'pending',
    verified_by UUID REFERENCES user_profiles(id),
    verified_at TIMESTAMPTZ,
    verification_notes TEXT,
    expiry_date DATE,
    is_required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. MILESTONES TABLE
CREATE TABLE IF NOT EXISTS milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    professional_id UUID REFERENCES professional_profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    target_date DATE,
    achieved_date DATE,
    is_achieved BOOLEAN DEFAULT FALSE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    notes TEXT,
    evidence_files TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_active ON user_profiles(is_active);

CREATE INDEX IF NOT EXISTS idx_professional_profiles_specializations ON professional_profiles USING GIN(specializations);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_is_verified ON professional_profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_rating ON professional_profiles(rating DESC);
CREATE INDEX IF NOT EXISTS idx_professional_profiles_location ON professional_profiles USING GIN(service_areas);

CREATE INDEX IF NOT EXISTS idx_children_parent_id ON children(parent_id);
CREATE INDEX IF NOT EXISTS idx_children_conditions ON children USING GIN(conditions);
CREATE INDEX IF NOT EXISTS idx_children_age ON children(age);

CREATE INDEX IF NOT EXISTS idx_services_professional_id ON services(professional_id);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

CREATE INDEX IF NOT EXISTS idx_bookings_parent_id ON bookings(parent_id);
CREATE INDEX IF NOT EXISTS idx_bookings_professional_id ON bookings(professional_id);
CREATE INDEX IF NOT EXISTS idx_bookings_child_id ON bookings(child_id);
CREATE INDEX IF NOT EXISTS idx_bookings_session_date ON bookings(session_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_sessions_booking_id ON sessions(booking_id);
CREATE INDEX IF NOT EXISTS idx_sessions_professional_id ON sessions(professional_id);
CREATE INDEX IF NOT EXISTS idx_sessions_child_id ON sessions(child_id);
CREATE INDEX IF NOT EXISTS idx_sessions_session_date ON sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);

CREATE INDEX IF NOT EXISTS idx_assessments_child_id ON assessments(child_id);
CREATE INDEX IF NOT EXISTS idx_assessments_type ON assessments(type);
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_session_reports_session_id ON session_reports(session_id);
CREATE INDEX IF NOT EXISTS idx_session_reports_professional_id ON session_reports(professional_id);
CREATE INDEX IF NOT EXISTS idx_session_reports_child_id ON session_reports(child_id);

CREATE INDEX IF NOT EXISTS idx_reviews_professional_id ON reviews(professional_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_is_published ON reviews(is_published);

CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_verification_documents_professional_id ON verification_documents(professional_id);
CREATE INDEX IF NOT EXISTS idx_verification_documents_status ON verification_documents(verification_status);

CREATE INDEX IF NOT EXISTS idx_milestones_child_id ON milestones(child_id);
CREATE INDEX IF NOT EXISTS idx_milestones_is_achieved ON milestones(is_achieved);

-- Enable Row Level Security
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

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for professional_profiles
CREATE POLICY "Professionals can view own profile" ON professional_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Professionals can update own profile" ON professional_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Professionals can insert own profile" ON professional_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public can view verified professional profiles" ON professional_profiles
    FOR SELECT USING (is_verified = true);

CREATE POLICY "Admins can manage all professional profiles" ON professional_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for children
CREATE POLICY "Parents can manage own children" ON children
    FOR ALL USING (
        parent_id = auth.uid()
    );

CREATE POLICY "Professionals can view children they work with" ON children
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM sessions s
            WHERE s.child_id = children.id AND s.professional_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM bookings b
            WHERE b.child_id = children.id AND b.professional_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all children" ON children
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for services
CREATE POLICY "Professionals can manage own services" ON services
    FOR ALL USING (professional_id = auth.uid());

CREATE POLICY "Public can view active services" ON services
    FOR SELECT USING (is_active = true);

-- RLS Policies for availability
CREATE POLICY "Professionals can manage own availability" ON availability
    FOR ALL USING (professional_id = auth.uid());

CREATE POLICY "Public can view professional availability" ON availability
    FOR SELECT USING (is_available = true);

-- RLS Policies for bookings
CREATE POLICY "Parents can manage own bookings" ON bookings
    FOR ALL USING (parent_id = auth.uid());

CREATE POLICY "Professionals can manage bookings for their services" ON bookings
    FOR ALL USING (professional_id = auth.uid());

CREATE POLICY "Admins can view all bookings" ON bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for sessions
CREATE POLICY "Parents can view sessions for their children" ON sessions
    FOR SELECT USING (parent_id = auth.uid());

CREATE POLICY "Professionals can manage their sessions" ON sessions
    FOR ALL USING (professional_id = auth.uid());

CREATE POLICY "Admins can view all sessions" ON sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for assessments
CREATE POLICY "Parents can view assessments for their children" ON assessments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM children c
            WHERE c.id = assessments.child_id AND c.parent_id = auth.uid()
        )
    );

CREATE POLICY "Parents can create assessments for their children" ON assessments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM children c
            WHERE c.id = assessments.child_id AND c.parent_id = auth.uid()
        )
    );

CREATE POLICY "Professionals can view and create assessments" ON assessments
    FOR ALL USING (
        professional_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM sessions s
            WHERE s.child_id = assessments.child_id AND s.professional_id = auth.uid()
        )
    );

-- RLS Policies for session_reports
CREATE POLICY "Professionals can manage their session reports" ON session_reports
    FOR ALL USING (professional_id = auth.uid());

CREATE POLICY "Parents can view reports for their children" ON session_reports
    FOR SELECT USING (
        is_shared_with_parent = true AND
        EXISTS (
            SELECT 1 FROM children c
            WHERE c.id = session_reports.child_id AND c.parent_id = auth.uid()
        )
    );

-- RLS Policies for reviews
CREATE POLICY "Parents can manage their reviews" ON reviews
    FOR ALL USING (parent_id = auth.uid());

CREATE POLICY "Professionals can view reviews about them" ON reviews
    FOR SELECT USING (professional_id = auth.uid());

CREATE POLICY "Public can view published reviews" ON reviews
    FOR SELECT USING (is_published = true);

-- RLS Policies for messages
CREATE POLICY "Users can view their messages" ON messages
    FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their sent messages" ON messages
    FOR UPDATE USING (sender_id = auth.uid());

-- RLS Policies for verification_documents
CREATE POLICY "Professionals can manage their verification documents" ON verification_documents
    FOR ALL USING (professional_id = auth.uid());

CREATE POLICY "Admins can manage all verification documents" ON verification_documents
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for milestones
CREATE POLICY "Parents can view milestones for their children" ON milestones
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM children c
            WHERE c.id = milestones.child_id AND c.parent_id = auth.uid()
        )
    );

CREATE POLICY "Professionals can manage milestones for their clients" ON milestones
    FOR ALL USING (
        professional_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM sessions s
            WHERE s.child_id = milestones.child_id AND s.professional_id = auth.uid()
        )
    );

-- Create triggers for updated_at columns
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

CREATE TRIGGER update_availability_updated_at
    BEFORE UPDATE ON availability
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at
    BEFORE UPDATE ON assessments
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

CREATE TRIGGER update_verification_documents_updated_at
    BEFORE UPDATE ON verification_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_milestones_updated_at
    BEFORE UPDATE ON milestones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, full_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'parent')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update professional rating
CREATE OR REPLACE FUNCTION update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE professional_profiles
    SET 
        rating = (
            SELECT COALESCE(AVG(rating::DECIMAL), 0)
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update professional rating when review is added/updated
CREATE OR REPLACE TRIGGER update_professional_rating_trigger
    AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_professional_rating();

-- Function to update child progress score
CREATE OR REPLACE FUNCTION update_child_progress()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE children
    SET 
        progress_score = (
            SELECT COALESCE(AVG(progress_rating * 10), 0)
            FROM session_reports sr
            JOIN sessions s ON s.id = sr.session_id
            WHERE s.child_id = NEW.child_id
            AND sr.progress_rating IS NOT NULL
        ),
        completed_sessions = (
            SELECT COUNT(*)
            FROM sessions
            WHERE child_id = NEW.child_id AND status = 'completed'
        )
    WHERE id = NEW.child_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update child progress when session report is added
CREATE OR REPLACE TRIGGER update_child_progress_trigger
    AFTER INSERT OR UPDATE ON session_reports
    FOR EACH ROW EXECUTE FUNCTION update_child_progress();