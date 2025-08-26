/*
  # Interventions System Implementation

  1. New Enums
    - `intervention_status` (active, completed, paused, discontinued)

  2. New Tables
    - `intervention_categories`
      - `id` (uuid, primary key)
      - `name` (text, category name)
      - `description` (text, category description)
      - `color` (text, for UI display)
      - `sort_order` (integer, for ordering)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `interventions`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key to intervention_categories)
      - `name` (text, intervention name)
      - `description` (text, detailed description)
      - `abbreviation` (text, short form like ABA, NET, etc.)
      - `age_range` (text, suitable age range)
      - `target_conditions` (text array, conditions this intervention helps)
      - `session_duration_min` (integer, minimum session duration)
      - `session_duration_max` (integer, maximum session duration)
      - `frequency_recommendation` (text, recommended frequency)
      - `evidence_level` (text, research evidence level)
      - `is_active` (boolean, whether intervention is available)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `child_interventions`
      - `id` (uuid, primary key)
      - `child_id` (uuid, foreign key to children)
      - `intervention_id` (uuid, foreign key to interventions)
      - `professional_id` (uuid, foreign key to user_profiles)
      - `start_date` (date, when intervention started)
      - `end_date` (date, when intervention ended, nullable)
      - `status` (intervention_status enum)
      - `goals` (text array, specific goals for this intervention)
      - `progress_notes` (text, ongoing progress notes)
      - `effectiveness_rating` (integer, 1-10 scale)
      - `frequency` (text, actual frequency being used)
      - `is_active` (boolean, currently active)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `session_interventions`
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key to sessions)
      - `intervention_id` (uuid, foreign key to interventions)
      - `duration_minutes` (integer, time spent on this intervention)
      - `effectiveness_rating` (integer, 1-10 scale for this session)
      - `notes` (text, session-specific notes)
      - `goals_addressed` (text array, which goals were worked on)
      - `materials_used` (text array, materials/tools used)
      - `child_response` (text, how child responded)
      - `created_at` (timestamp)

  3. Security
    - Enable RLS on all new tables
    - Add policies for parents, professionals, and admins
    - Ensure data privacy and access control

  4. Performance
    - Add indexes for frequently queried columns
    - GIN indexes for array fields
    - Composite indexes for complex queries

  5. Data Population
    - Insert all intervention categories and interventions
    - Populate with comprehensive intervention data
*/

-- Create intervention_status enum
CREATE TYPE intervention_status AS ENUM ('active', 'completed', 'paused', 'discontinued');

-- Create intervention_categories table
CREATE TABLE IF NOT EXISTS intervention_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  color text NOT NULL DEFAULT '#6B7280',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create interventions table
CREATE TABLE IF NOT EXISTS interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES intervention_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  abbreviation text,
  age_range text NOT NULL DEFAULT '0-18 years',
  target_conditions text[] DEFAULT '{}',
  session_duration_min integer NOT NULL DEFAULT 30,
  session_duration_max integer NOT NULL DEFAULT 90,
  frequency_recommendation text NOT NULL DEFAULT 'Weekly',
  evidence_level text NOT NULL DEFAULT 'Moderate',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create child_interventions table
CREATE TABLE IF NOT EXISTS child_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  intervention_id uuid NOT NULL REFERENCES interventions(id) ON DELETE CASCADE,
  professional_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  status intervention_status DEFAULT 'active',
  goals text[] DEFAULT '{}',
  progress_notes text,
  effectiveness_rating integer CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 10),
  frequency text DEFAULT 'Weekly',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create session_interventions table
CREATE TABLE IF NOT EXISTS session_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  intervention_id uuid NOT NULL REFERENCES interventions(id) ON DELETE CASCADE,
  duration_minutes integer NOT NULL DEFAULT 30,
  effectiveness_rating integer CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 10),
  notes text,
  goals_addressed text[] DEFAULT '{}',
  materials_used text[] DEFAULT '{}',
  child_response text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE intervention_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_interventions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for intervention_categories
CREATE POLICY "Public can view active intervention categories"
  ON intervention_categories
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage intervention categories"
  ON intervention_categories
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin'
  ));

-- RLS Policies for interventions
CREATE POLICY "Public can view active interventions"
  ON interventions
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage interventions"
  ON interventions
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin'
  ));

-- RLS Policies for child_interventions
CREATE POLICY "Parents can view interventions for their children"
  ON child_interventions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM children
    WHERE children.id = child_interventions.child_id AND children.parent_id = auth.uid()
  ));

CREATE POLICY "Professionals can view and manage assigned interventions"
  ON child_interventions
  FOR ALL
  TO authenticated
  USING (professional_id = auth.uid());

CREATE POLICY "Parents can create interventions for their children"
  ON child_interventions
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM children
    WHERE children.id = child_interventions.child_id AND children.parent_id = auth.uid()
  ));

CREATE POLICY "Admins can view all child interventions"
  ON child_interventions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin'
  ));

-- RLS Policies for session_interventions
CREATE POLICY "Parents can view session interventions for their children"
  ON session_interventions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM sessions s
    JOIN children c ON s.child_id = c.id
    WHERE s.id = session_interventions.session_id AND c.parent_id = auth.uid()
  ));

CREATE POLICY "Professionals can manage session interventions for their sessions"
  ON session_interventions
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM sessions
    WHERE sessions.id = session_interventions.session_id AND sessions.professional_id = auth.uid()
  ));

CREATE POLICY "Admins can view all session interventions"
  ON session_interventions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'admin'
  ));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_intervention_categories_sort_order ON intervention_categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_intervention_categories_is_active ON intervention_categories(is_active);

CREATE INDEX IF NOT EXISTS idx_interventions_category_id ON interventions(category_id);
CREATE INDEX IF NOT EXISTS idx_interventions_is_active ON interventions(is_active);
CREATE INDEX IF NOT EXISTS idx_interventions_target_conditions ON interventions USING gin(target_conditions);

CREATE INDEX IF NOT EXISTS idx_child_interventions_child_id ON child_interventions(child_id);
CREATE INDEX IF NOT EXISTS idx_child_interventions_intervention_id ON child_interventions(intervention_id);
CREATE INDEX IF NOT EXISTS idx_child_interventions_professional_id ON child_interventions(professional_id);
CREATE INDEX IF NOT EXISTS idx_child_interventions_status ON child_interventions(status);
CREATE INDEX IF NOT EXISTS idx_child_interventions_is_active ON child_interventions(is_active);

CREATE INDEX IF NOT EXISTS idx_session_interventions_session_id ON session_interventions(session_id);
CREATE INDEX IF NOT EXISTS idx_session_interventions_intervention_id ON session_interventions(intervention_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_intervention_categories_updated_at
  BEFORE UPDATE ON intervention_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interventions_updated_at
  BEFORE UPDATE ON interventions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_child_interventions_updated_at
  BEFORE UPDATE ON child_interventions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert intervention categories
INSERT INTO intervention_categories (name, description, color, sort_order) VALUES
('Behavioral Interventions', 'Evidence-based behavioral approaches for skill development and behavior modification', '#EF4444', 1),
('Communication Interventions', 'Therapies focused on developing speech, language, and communication skills', '#3B82F6', 2),
('Developmental Interventions', 'Comprehensive approaches targeting overall developmental milestones', '#10B981', 3),
('Sensory and Motor Interventions', 'Therapies addressing sensory processing and motor skill development', '#F59E0B', 4),
('Educational Interventions', 'Academic and learning support strategies for children with special needs', '#8B5CF6', 5),
('Family and Support Interventions', 'Programs that involve and support families and caregivers', '#EC4899', 6);

-- Insert interventions
INSERT INTO interventions (category_id, name, description, abbreviation, age_range, target_conditions, session_duration_min, session_duration_max, frequency_recommendation, evidence_level) VALUES
-- Behavioral Interventions
((SELECT id FROM intervention_categories WHERE name = 'Behavioral Interventions'), 
 'Applied Behavior Analysis', 
 'Comprehensive behavioral intervention using principles of learning theory to increase helpful behaviors and reduce harmful ones.',
 'ABA', 
 '2-18 years',
 '{"Autism Spectrum Disorder", "Developmental Delays", "Behavioral Issues", "ADHD"}',
 60, 180, '20-40 hours per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Behavioral Interventions'), 
 'Natural Environment Teaching', 
 'Teaching approach that uses naturally occurring opportunities and activities to promote learning.',
 'NET', 
 '2-12 years',
 '{"Autism Spectrum Disorder", "Developmental Delays", "Social Communication Disorder"}',
 30, 90, '3-5 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Behavioral Interventions'), 
 'Discrete Trial Training', 
 'Structured teaching method that breaks down skills into small, discrete components.',
 'DTT', 
 '2-10 years',
 '{"Autism Spectrum Disorder", "Intellectual Disability", "Learning Disabilities"}',
 45, 120, '5-7 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Behavioral Interventions'), 
 'Functional Behavior Assessment', 
 'Systematic process to identify the purpose or function of problem behaviors.',
 'FBA', 
 '3-18 years',
 '{"Behavioral Issues", "Autism Spectrum Disorder", "ADHD", "Oppositional Defiant Disorder"}',
 90, 180, 'As needed', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Behavioral Interventions'), 
 'Positive Behavior Support', 
 'Proactive approach to eliminate problem behaviors by teaching new skills and making changes to environment.',
 'PBS', 
 '2-18 years',
 '{"Behavioral Issues", "Autism Spectrum Disorder", "Intellectual Disability"}',
 60, 120, '2-3 times per week', 'High'),

-- Communication Interventions
((SELECT id FROM intervention_categories WHERE name = 'Communication Interventions'), 
 'Speech and Language Therapy', 
 'Professional therapy to improve speech production, language comprehension, and communication skills.',
 'SLT', 
 '1-18 years',
 '{"Speech Delay", "Language Delay", "Autism Spectrum Disorder", "Cerebral Palsy", "Hearing Impairment"}',
 30, 60, '2-3 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Communication Interventions'), 
 'Picture Exchange Communication System', 
 'Augmentative communication system that teaches functional communication using pictures.',
 'PECS', 
 '2-12 years',
 '{"Autism Spectrum Disorder", "Nonverbal", "Severe Communication Delays"}',
 30, 60, '3-5 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Communication Interventions'), 
 'Augmentative and Alternative Communication', 
 'Methods to supplement or replace speech for individuals with communication impairments.',
 'AAC', 
 '2-18 years',
 '{"Cerebral Palsy", "Autism Spectrum Disorder", "Intellectual Disability", "Speech Disorders"}',
 45, 90, '2-4 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Communication Interventions'), 
 'Verbal Behavior Intervention', 
 'ABA-based approach focusing on teaching language as behavior with specific functions.',
 'VB', 
 '2-10 years',
 '{"Autism Spectrum Disorder", "Language Delays", "Communication Disorders"}',
 45, 90, '4-6 times per week', 'High'),

-- Developmental Interventions
((SELECT id FROM intervention_categories WHERE name = 'Developmental Interventions'), 
 'Early Start Denver Model', 
 'Comprehensive behavioral early intervention for young children with autism.',
 'ESDM', 
 '1-4 years',
 '{"Autism Spectrum Disorder", "Pervasive Developmental Disorder"}',
 60, 120, '15-25 hours per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Developmental Interventions'), 
 'DIR/Floortime', 
 'Developmental approach that builds healthy foundations for social, emotional, and intellectual capacities.',
 'DIR', 
 '1-12 years',
 '{"Autism Spectrum Disorder", "Developmental Delays", "Sensory Processing Disorder"}',
 45, 90, '3-5 times per week', 'Moderate'),

((SELECT id FROM intervention_categories WHERE name = 'Developmental Interventions'), 
 'JASPER Intervention', 
 'Joint Attention, Symbolic Play, Engagement and Regulation intervention for autism.',
 'JASPER', 
 '2-8 years',
 '{"Autism Spectrum Disorder", "Social Communication Disorder"}',
 45, 75, '2-3 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Developmental Interventions'), 
 'Social Skills Training', 
 'Structured programs to teach appropriate social behaviors and interaction skills.',
 'SST', 
 '3-18 years',
 '{"Autism Spectrum Disorder", "ADHD", "Social Anxiety", "Developmental Delays"}',
 45, 90, '1-2 times per week', 'Moderate'),

((SELECT id FROM intervention_categories WHERE name = 'Developmental Interventions'), 
 'TEACCH Method', 
 'Structured teaching approach using visual supports and environmental modifications.',
 'TEACCH', 
 '3-18 years',
 '{"Autism Spectrum Disorder", "Intellectual Disability"}',
 60, 120, '3-5 times per week', 'High'),

-- Sensory and Motor Interventions
((SELECT id FROM intervention_categories WHERE name = 'Sensory and Motor Interventions'), 
 'Occupational Therapy', 
 'Therapy to help children develop skills needed for daily living and academic success.',
 'OT', 
 '1-18 years',
 '{"Sensory Processing Disorder", "Autism Spectrum Disorder", "Cerebral Palsy", "Developmental Delays"}',
 45, 90, '2-3 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Sensory and Motor Interventions'), 
 'Sensory Integration Therapy', 
 'Therapy to help children process and respond to sensory information more effectively.',
 'SI', 
 '2-12 years',
 '{"Sensory Processing Disorder", "Autism Spectrum Disorder", "ADHD"}',
 45, 75, '2-3 times per week', 'Moderate'),

((SELECT id FROM intervention_categories WHERE name = 'Sensory and Motor Interventions'), 
 'Motor Planning and Coordination', 
 'Interventions to improve gross and fine motor skills and coordination.',
 'MPC', 
 '2-16 years',
 '{"Developmental Coordination Disorder", "Cerebral Palsy", "Autism Spectrum Disorder"}',
 45, 90, '2-3 times per week', 'Moderate'),

-- Educational Interventions
((SELECT id FROM intervention_categories WHERE name = 'Educational Interventions'), 
 'STAR Program', 
 'Structured Teaching in ABA for Autism and Related disabilities program.',
 'STAR', 
 '3-12 years',
 '{"Autism Spectrum Disorder", "Learning Disabilities", "Intellectual Disability"}',
 60, 120, '4-6 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Educational Interventions'), 
 'Functional Academic Skills', 
 'Teaching practical academic skills needed for daily life and independence.',
 'FAS', 
 '6-18 years',
 '{"Intellectual Disability", "Autism Spectrum Disorder", "Learning Disabilities"}',
 45, 90, '3-5 times per week', 'Moderate'),

((SELECT id FROM intervention_categories WHERE name = 'Educational Interventions'), 
 'Cognitive Behavioral Therapy', 
 'Therapy approach that helps children identify and change negative thought patterns and behaviors.',
 'CBT', 
 '6-18 years',
 '{"Anxiety Disorders", "Depression", "ADHD", "Behavioral Issues"}',
 45, 60, '1-2 times per week', 'High'),

-- Family and Support Interventions
((SELECT id FROM intervention_categories WHERE name = 'Family and Support Interventions'), 
 'Parent Training and Support', 
 'Programs to educate and support parents in implementing interventions at home.',
 'PTS', 
 'All ages',
 '{"Autism Spectrum Disorder", "ADHD", "Behavioral Issues", "Developmental Delays"}',
 60, 120, '1-2 times per week', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Family and Support Interventions'), 
 'Team Collaboration and Coordination', 
 'Coordinated approach involving multiple professionals working together.',
 'TCC', 
 'All ages',
 '{"Complex Needs", "Multiple Disabilities", "Autism Spectrum Disorder"}',
 90, 180, 'Monthly', 'Moderate'),

((SELECT id FROM intervention_categories WHERE name = 'Family and Support Interventions'), 
 'IEP Development and Support', 
 'Assistance with Individualized Education Program planning and implementation.',
 'IEP', 
 '3-18 years',
 '{"Learning Disabilities", "Autism Spectrum Disorder", "Intellectual Disability", "ADHD"}',
 90, 180, 'Quarterly', 'High'),

((SELECT id FROM intervention_categories WHERE name = 'Family and Support Interventions'), 
 'Daily Living Skills Training', 
 'Teaching essential life skills for independence and self-care.',
 'DLS', 
 '3-18 years',
 '{"Autism Spectrum Disorder", "Intellectual Disability", "Developmental Delays"}',
 45, 90, '2-4 times per week', 'Moderate');