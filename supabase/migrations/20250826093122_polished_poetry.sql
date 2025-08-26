/*
  # Create Interventions Table and Related Schema

  1. New Tables
    - `intervention_categories`
      - `id` (uuid, primary key)
      - `name` (text, category name)
      - `description` (text, category description)
      - `color` (text, for UI display)
      - `created_at` (timestamp)

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
      - `status` (enum: active, completed, paused, discontinued)
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

  2. New Enums
    - `intervention_status` (active, completed, paused, discontinued)

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
    - Populate with the provided intervention data
*/

-- Create intervention status enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'intervention_status') THEN
    CREATE TYPE intervention_status AS ENUM ('active', 'completed', 'paused', 'discontinued');
  END IF;
END $$;

-- Create intervention categories table
CREATE TABLE IF NOT EXISTS intervention_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  color text DEFAULT '#6B7280',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create interventions table
CREATE TABLE IF NOT EXISTS interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES intervention_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  abbreviation text,
  age_range text,
  target_conditions text[] DEFAULT '{}',
  session_duration_min integer DEFAULT 30,
  session_duration_max integer DEFAULT 90,
  frequency_recommendation text,
  evidence_level text DEFAULT 'established',
  prerequisites text,
  contraindications text,
  materials_needed text[] DEFAULT '{}',
  training_required boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create child interventions table (tracks which interventions each child is receiving)
CREATE TABLE IF NOT EXISTS child_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  intervention_id uuid NOT NULL REFERENCES interventions(id) ON DELETE CASCADE,
  professional_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  status intervention_status DEFAULT 'active',
  goals text[] DEFAULT '{}',
  progress_notes text,
  effectiveness_rating integer CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 10),
  frequency text,
  intensity text,
  duration_weeks integer,
  parent_involvement_level text,
  home_practice_required boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(child_id, intervention_id, professional_id)
);

-- Create session interventions table (tracks interventions used in each session)
CREATE TABLE IF NOT EXISTS session_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  intervention_id uuid NOT NULL REFERENCES interventions(id) ON DELETE CASCADE,
  child_intervention_id uuid REFERENCES child_interventions(id) ON DELETE SET NULL,
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  effectiveness_rating integer CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 10),
  notes text,
  goals_addressed text[] DEFAULT '{}',
  materials_used text[] DEFAULT '{}',
  child_response text,
  parent_feedback text,
  modifications_made text,
  next_session_plan text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all new tables
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
    WHERE id = auth.uid() AND role = 'admin'
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
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS Policies for child_interventions
CREATE POLICY "Parents can view interventions for their children"
  ON child_interventions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM children 
    WHERE id = child_interventions.child_id AND parent_id = auth.uid()
  ));

CREATE POLICY "Professionals can view and manage interventions for their clients"
  ON child_interventions
  FOR ALL
  TO authenticated
  USING (professional_id = auth.uid());

CREATE POLICY "Professionals can insert interventions for accessible children"
  ON child_interventions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    professional_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM children 
      WHERE id = child_interventions.child_id
    )
  );

CREATE POLICY "Admins can view all child interventions"
  ON child_interventions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND role = 'admin'
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
    WHERE id = session_interventions.session_id AND professional_id = auth.uid()
  ));

CREATE POLICY "Admins can view all session interventions"
  ON session_interventions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_interventions_category_id ON interventions(category_id);
CREATE INDEX IF NOT EXISTS idx_interventions_target_conditions ON interventions USING gin(target_conditions);
CREATE INDEX IF NOT EXISTS idx_interventions_is_active ON interventions(is_active);

CREATE INDEX IF NOT EXISTS idx_child_interventions_child_id ON child_interventions(child_id);
CREATE INDEX IF NOT EXISTS idx_child_interventions_professional_id ON child_interventions(professional_id);
CREATE INDEX IF NOT EXISTS idx_child_interventions_intervention_id ON child_interventions(intervention_id);
CREATE INDEX IF NOT EXISTS idx_child_interventions_status ON child_interventions(status);
CREATE INDEX IF NOT EXISTS idx_child_interventions_is_active ON child_interventions(is_active);

CREATE INDEX IF NOT EXISTS idx_session_interventions_session_id ON session_interventions(session_id);
CREATE INDEX IF NOT EXISTS idx_session_interventions_intervention_id ON session_interventions(intervention_id);
CREATE INDEX IF NOT EXISTS idx_session_interventions_child_intervention_id ON session_interventions(child_intervention_id);

-- Create update triggers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_intervention_categories_updated_at'
  ) THEN
    CREATE TRIGGER update_intervention_categories_updated_at
      BEFORE UPDATE ON intervention_categories
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_interventions_updated_at'
  ) THEN
    CREATE TRIGGER update_interventions_updated_at
      BEFORE UPDATE ON interventions
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_child_interventions_updated_at'
  ) THEN
    CREATE TRIGGER update_child_interventions_updated_at
      BEFORE UPDATE ON child_interventions
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert intervention categories
INSERT INTO intervention_categories (name, description, color, sort_order) VALUES
  ('Behavioral Intervention', 'Evidence-based behavioral approaches for autism and developmental disorders', '#EF4444', 1),
  ('Developmental and Social Skills', 'Interventions focused on social communication and developmental milestones', '#3B82F6', 2),
  ('Language and Communication', 'Speech, language, and communication intervention approaches', '#10B981', 3),
  ('Sensory and Motor', 'Sensory integration and motor skills development interventions', '#F59E0B', 4),
  ('Academic and Learning Skills', 'Educational and cognitive intervention strategies', '#8B5CF6', 5),
  ('Family and Environmental Support', 'Family-centered and environmental intervention approaches', '#EC4899', 6)
ON CONFLICT (name) DO NOTHING;

-- Insert specific interventions
INSERT INTO interventions (category_id, name, description, abbreviation, age_range, target_conditions, session_duration_min, session_duration_max, frequency_recommendation, evidence_level) VALUES
  -- Behavioral Interventions
  ((SELECT id FROM intervention_categories WHERE name = 'Behavioral Intervention'), 
   'Applied Behavior Analysis', 
   'Comprehensive behavioral intervention using principles of learning theory to increase helpful behaviors and reduce harmful behaviors',
   'ABA', 
   '2-18 years', 
   '{"Autism Spectrum Disorder", "ADHD", "Behavioral Issues", "Developmental Delays"}',
   60, 180, 
   '20-40 hours per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Behavioral Intervention'), 
   'Natural Environment Teaching', 
   'Teaching approach that uses naturally occurring activities and environments to promote learning',
   'NET', 
   '2-12 years', 
   '{"Autism Spectrum Disorder", "Developmental Delays", "Language Delays"}',
   30, 90, 
   '3-5 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Behavioral Intervention'), 
   'Discrete Trial Training', 
   'Structured teaching method that breaks down skills into small, discrete components',
   'DTT', 
   '2-10 years', 
   '{"Autism Spectrum Disorder", "Intellectual Disabilities", "Learning Disabilities"}',
   45, 120, 
   '5-7 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Behavioral Intervention'), 
   'Functional Behavior Assessment and Intervention', 
   'Process to understand the purpose of challenging behaviors and develop effective interventions',
   'FBA', 
   '3-18 years', 
   '{"Autism Spectrum Disorder", "ADHD", "Behavioral Issues", "Emotional Disorders"}',
   60, 120, 
   'As needed', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Behavioral Intervention'), 
   'Positive Behavior Support', 
   'Comprehensive approach to address challenging behaviors through environmental modifications and skill building',
   'PBS', 
   '2-18 years', 
   '{"Autism Spectrum Disorder", "ADHD", "Behavioral Issues", "Intellectual Disabilities"}',
   45, 90, 
   '2-4 times per week', 
   'well-established'),

  -- Developmental and Social Skills
  ((SELECT id FROM intervention_categories WHERE name = 'Developmental and Social Skills'), 
   'Joint Attention, Symbolic Play, Engagement and Regulation', 
   'Naturalistic intervention targeting core social communication skills through play-based activities',
   'JASPER', 
   '2-8 years', 
   '{"Autism Spectrum Disorder", "Social Communication Disorders", "Developmental Delays"}',
   45, 75, 
   '2-3 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Developmental and Social Skills'), 
   'Social Skills Training', 
   'Structured intervention to teach social interaction skills and peer relationships',
   'SST', 
   '4-18 years', 
   '{"Autism Spectrum Disorder", "ADHD", "Social Anxiety", "Asperger Syndrome"}',
   45, 90, 
   '1-2 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Developmental and Social Skills'), 
   'Structured Teaching', 
   'Educational approach using visual supports and structured environments to promote independence',
   'TEACCH', 
   '3-18 years', 
   '{"Autism Spectrum Disorder", "Intellectual Disabilities", "Learning Disabilities"}',
   60, 120, 
   '3-5 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Developmental and Social Skills'), 
   'Developmental, Individual-differences, Relationship-based Model', 
   'Child-led intervention focusing on emotional connections and individual developmental differences',
   'DIR/Floortime', 
   '2-12 years', 
   '{"Autism Spectrum Disorder", "Developmental Delays", "Sensory Processing Disorders"}',
   45, 90, 
   '3-5 times per week', 
   'emerging'),

  ((SELECT id FROM intervention_categories WHERE name = 'Developmental and Social Skills'), 
   'Early Start Denver Model', 
   'Comprehensive early intervention combining ABA and developmental approaches through play',
   'ESDM', 
   '1-4 years', 
   '{"Autism Spectrum Disorder", "Developmental Delays"}',
   60, 120, 
   '15-25 hours per week', 
   'well-established'),

  -- Language and Communication
  ((SELECT id FROM intervention_categories WHERE name = 'Language and Communication'), 
   'Verbal Behavior Intervention', 
   'Language intervention based on Skinner\'s analysis of verbal behavior and ABA principles',
   'VB', 
   '2-12 years', 
   '{"Autism Spectrum Disorder", "Language Delays", "Speech Delays"}',
   45, 90, 
   '3-5 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Language and Communication'), 
   'Speech and Language Therapy', 
   'Professional therapy to improve speech production, language comprehension, and communication skills',
   'SLT', 
   '1-18 years', 
   '{"Speech Delays", "Language Delays", "Autism Spectrum Disorder", "Hearing Impairments"}',
   30, 60, 
   '1-3 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Language and Communication'), 
   'Picture Exchange Communication System', 
   'Augmentative communication system using pictures to develop functional communication skills',
   'PECS', 
   '2-12 years', 
   '{"Autism Spectrum Disorder", "Nonverbal", "Severe Language Delays"}',
   30, 60, 
   '3-5 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Language and Communication'), 
   'Augmentative and Alternative Communication', 
   'Communication methods to supplement or replace speech for individuals with communication impairments',
   'AAC', 
   '2-18 years', 
   '{"Autism Spectrum Disorder", "Cerebral Palsy", "Intellectual Disabilities", "Speech Disorders"}',
   45, 90, 
   '2-4 times per week', 
   'well-established'),

  -- Sensory and Motor
  ((SELECT id FROM intervention_categories WHERE name = 'Sensory and Motor'), 
   'Occupational Therapy', 
   'Therapeutic intervention to develop daily living skills, fine motor skills, and sensory processing',
   'OT', 
   '1-18 years', 
   '{"Sensory Processing Disorders", "Autism Spectrum Disorder", "ADHD", "Developmental Delays"}',
   45, 90, 
   '1-3 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Sensory and Motor'), 
   'Sensory Integration Therapy', 
   'Therapeutic approach to help children process and respond to sensory information more effectively',
   'SI', 
   '2-12 years', 
   '{"Sensory Processing Disorders", "Autism Spectrum Disorder", "ADHD"}',
   45, 75, 
   '2-3 times per week', 
   'emerging'),

  ((SELECT id FROM intervention_categories WHERE name = 'Sensory and Motor'), 
   'Motor Planning Training', 
   'Intervention to improve the ability to plan and execute motor movements',
   'MPT', 
   '3-15 years', 
   '{"Dyspraxia", "Autism Spectrum Disorder", "Developmental Coordination Disorder"}',
   45, 75, 
   '2-3 times per week', 
   'promising'),

  -- Academic and Learning Skills
  ((SELECT id FROM intervention_categories WHERE name = 'Academic and Learning Skills'), 
   'Strategies for Teaching based on Autism Research', 
   'Comprehensive curriculum and teaching strategies specifically designed for children with autism',
   'STAR', 
   '3-12 years', 
   '{"Autism Spectrum Disorder", "Learning Disabilities"}',
   60, 120, 
   '5 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Academic and Learning Skills'), 
   'Functional Academic Skills Instruction', 
   'Teaching academic skills that have practical application in daily life',
   'FASI', 
   '6-18 years', 
   '{"Intellectual Disabilities", "Autism Spectrum Disorder", "Learning Disabilities"}',
   45, 90, 
   '3-5 times per week', 
   'established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Academic and Learning Skills'), 
   'Cognitive Behavioral Therapy', 
   'Therapeutic approach to address thoughts, feelings, and behaviors for high-functioning individuals',
   'CBT', 
   '8-18 years', 
   '{"High-Functioning Autism", "Anxiety Disorders", "Depression", "ADHD"}',
   45, 60, 
   '1-2 times per week', 
   'well-established'),

  -- Family and Environmental Support
  ((SELECT id FROM intervention_categories WHERE name = 'Family and Environmental Support'), 
   'Parent-mediated Intervention', 
   'Training parents to implement intervention strategies in natural environments',
   'PMI', 
   '1-12 years', 
   '{"Autism Spectrum Disorder", "Developmental Delays", "Language Delays"}',
   60, 90, 
   '1-2 times per week', 
   'well-established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Family and Environmental Support'), 
   'Interdisciplinary Team Collaboration', 
   'Coordinated approach involving multiple professionals working together',
   'ITC', 
   '1-18 years', 
   '{"Complex Developmental Disorders", "Multiple Disabilities", "Autism Spectrum Disorder"}',
   90, 180, 
   'Monthly meetings', 
   'established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Family and Environmental Support'), 
   'Individualized Education Program Development', 
   'Development and implementation of customized educational plans',
   'IEP', 
   '3-18 years', 
   '{"Learning Disabilities", "Autism Spectrum Disorder", "Intellectual Disabilities", "ADHD"}',
   90, 180, 
   'Annual review', 
   'established'),

  ((SELECT id FROM intervention_categories WHERE name = 'Family and Environmental Support'), 
   'Daily Living Skills Training', 
   'Teaching practical life skills for increased independence',
   'DLST', 
   '3-18 years', 
   '{"Autism Spectrum Disorder", "Intellectual Disabilities", "Developmental Delays"}',
   45, 90, 
   '2-4 times per week', 
   'established')
ON CONFLICT (name) DO NOTHING;