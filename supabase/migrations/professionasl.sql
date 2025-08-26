Failed migration 

/*
  # Insert Sample Professionals with Authentication

  1. New Data
    - Creates auth users for 12 sample professionals
    - Inserts user profiles with complete information
    - Adds professional profiles with specializations and credentials
    - Creates services for each professional
    - Sets up availability schedules

  2. Security
    - Maintains RLS policies
    - Creates proper auth users first
    - Links profiles correctly

  3. Sample Data
    - 12 verified professionals across different specializations
    - Complete contact information and credentials
    - Service offerings with realistic pricing
    - Weekly availability schedules
*/

-- Insert auth users first (this bypasses RLS as it's system level)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES 
  ('550e8400-e29b-41d4-a716-446655440010', '00000000-0000-0000-0000-000000000000', 'sarah.johnson@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440011', '00000000-0000-0000-0000-000000000000', 'maria.rodriguez@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440012', '00000000-0000-0000-0000-000000000000', 'michael.chen@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440013', '00000000-0000-0000-0000-000000000000', 'jennifer.smith@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440014', '00000000-0000-0000-0000-000000000000', 'david.kim@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440015', '00000000-0000-0000-0000-000000000000', 'anna.martinez@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440016', '00000000-0000-0000-0000-000000000000', 'robert.taylor@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440017', '00000000-0000-0000-0000-000000000000', 'lisa.wong@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440018', '00000000-0000-0000-0000-000000000000', 'carlos.santos@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440019', '00000000-0000-0000-0000-000000000000', 'patricia.garcia@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440020', '00000000-0000-0000-0000-000000000000', 'james.wilson@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', ''),
  ('550e8400-e29b-41d4-a716-446655440021', '00000000-0000-0000-0000-000000000000', 'elena.reyes@buknest.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- Insert user profiles
INSERT INTO user_profiles (
  id,
  role,
  full_name,
  phone_number,
  address,
  avatar_url,
  is_verified,
  is_active,
  preferred_language,
  timezone
) VALUES 
  ('550e8400-e29b-41d4-a716-446655440010', 'professional', 'Dr. Sarah Johnson', '+63 917 123 4567', 'Cagayan de Oro City, Misamis Oriental', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440011', 'professional', 'Maria Rodriguez', '+63 918 234 5678', 'Davao City, Davao del Sur', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440012', 'professional', 'Dr. Michael Chen', '+63 919 345 6789', 'Butuan City, Agusan del Norte', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440013', 'professional', 'Jennifer Smith', '+63 920 456 7890', 'Valencia City, Bukidnon', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440014', 'professional', 'Dr. David Kim', '+63 921 567 8901', 'Iligan City, Lanao del Norte', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440015', 'professional', 'Anna Martinez', '+63 922 678 9012', 'General Santos City, South Cotabato', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440016', 'professional', 'Dr. Robert Taylor', '+63 923 789 0123', 'Malaybalay City, Bukidnon', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440017', 'professional', 'Lisa Wong', '+63 924 890 1234', 'Zamboanga City, Zamboanga del Sur', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440018', 'professional', 'Dr. Carlos Santos', '+63 925 901 2345', 'Dipolog City, Zamboanga del Norte', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440019', 'professional', 'Patricia Garcia', '+63 926 012 3456', 'Cotabato City, Maguindanao', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440020', 'professional', 'Dr. James Wilson', '+63 927 123 4567', 'Marawi City, Lanao del Sur', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
  ('550e8400-e29b-41d4-a716-446655440021', 'professional', 'Elena Reyes', '+63 928 234 5678', 'Surigao City, Surigao del Norte', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila')
ON CONFLICT (id) DO NOTHING;

-- Insert professional profiles
INSERT INTO professional_profiles (
  id,
  title,
  specializations,
  hourly_rate,
  experience_years,
  bio,
  credentials,
  languages,
  profession,
  education,
  certifications,
  service_areas,
  is_verified,
  verification_status,
  rating,
  review_count,
  total_sessions,
  completed_sessions,
  response_rate,
  completion_rate,
  average_response_time,
  is_accepting_new_clients,
  consultation_fee
) VALUES 
  ('550e8400-e29b-41d4-a716-446655440010', 'Speech-Language Pathologist', ARRAY['Speech Therapy', 'Language Development', 'Autism Support'], 1500, 8, 'Specialized in pediatric speech therapy with extensive experience in autism spectrum disorders and language delays.', ARRAY['Licensed Speech-Language Pathologist', 'Certified Autism Specialist'], ARRAY['English', 'Filipino'], 'Speech-Language Pathologist', 'Master of Science in Speech-Language Pathology, University of the Philippines', ARRAY['CAS - Certified Autism Specialist', 'PROMPT Certified'], ARRAY['Cagayan de Oro', 'Misamis Oriental'], true, 'approved', 4.9, 127, 856, 823, 98.5, 96.2, 120, true, 2000),
  ('550e8400-e29b-41d4-a716-446655440011', 'Occupational Therapist', ARRAY['Occupational Therapy', 'Sensory Integration', 'Fine Motor Skills'], 1200, 6, 'Passionate about helping children develop independence through sensory integration and fine motor skill development.', ARRAY['Licensed Occupational Therapist', 'Sensory Integration Certified'], ARRAY['English', 'Spanish', 'Filipino'], 'Occupational Therapist', 'Bachelor of Science in Occupational Therapy, Ateneo de Davao University', ARRAY['SI Certified - Sensory Integration', 'NDT Certified'], ARRAY['Davao City', 'Davao del Sur'], true, 'approved', 4.8, 98, 642, 615, 97.2, 95.8, 180, true, 1800),
  ('550e8400-e29b-41d4-a716-446655440012', 'Developmental Pediatrician', ARRAY['Developmental Assessment', 'Autism Diagnosis', 'ADHD Treatment'], 2500, 12, 'Board-certified developmental pediatrician specializing in comprehensive assessments and early intervention planning.', ARRAY['Board Certified Pediatrician', 'Developmental-Behavioral Pediatrics'], ARRAY['English', 'Mandarin', 'Filipino'], 'Developmental Pediatrician', 'Doctor of Medicine, University of the Philippines College of Medicine', ARRAY['Board Certification in Pediatrics', 'Fellowship in Developmental-Behavioral Pediatrics'], ARRAY['Butuan City', 'Agusan del Norte'], true, 'approved', 4.9, 156, 1243, 1198, 99.1, 96.4, 240, true, 3500),
  ('550e8400-e29b-41d4-a716-446655440013', 'Special Education Teacher', ARRAY['Special Education', 'Learning Disabilities', 'Behavioral Support'], 800, 5, 'Dedicated special education teacher with expertise in individualized education programs and behavioral interventions.', ARRAY['Licensed Professional Teacher', 'Special Education Specialist'], ARRAY['English', 'Filipino'], 'Special Education Teacher', 'Bachelor of Elementary Education Major in Special Education, Central Mindanao University', ARRAY['LPT - Licensed Professional Teacher', 'SPED Specialist Certification'], ARRAY['Valencia City', 'Bukidnon'], true, 'approved', 4.7, 89, 534, 512, 94.8, 95.9, 360, true, 1000),
  ('550e8400-e29b-41d4-a716-446655440014', 'Physical Therapist', ARRAY['Physical Therapy', 'Motor Development', 'Cerebral Palsy'], 1300, 7, 'Experienced physical therapist focusing on pediatric motor development and neurological conditions.', ARRAY['Licensed Physical Therapist', 'Pediatric Specialist'], ARRAY['English', 'Korean', 'Filipino'], 'Physical Therapist', 'Doctor of Physical Therapy, Mindanao State University', ARRAY['RPT - Registered Physical Therapist', 'Pediatric Physical Therapy Certification'], ARRAY['Iligan City', 'Lanao del Norte'], true, 'approved', 4.8, 112, 723, 698, 96.5, 96.5, 200, true, 1600),
  ('550e8400-e29b-41d4-a716-446655440015', 'Behavioral Therapist', ARRAY['ABA Therapy', 'Behavioral Intervention', 'Autism Support'], 1100, 4, 'Certified ABA therapist specializing in evidence-based behavioral interventions for children with autism.', ARRAY['Board Certified Behavior Analyst', 'ABA Certified'], ARRAY['English', 'Filipino'], 'Behavioral Therapist', 'Master of Arts in Applied Behavior Analysis, University of San Carlos', ARRAY['BCBA - Board Certified Behavior Analyst', 'RBT Supervisor Certification'], ARRAY['General Santos', 'South Cotabato'], true, 'approved', 4.6, 76, 456, 434, 93.2, 95.2, 300, true, 1400),
  ('550e8400-e29b-41d4-a716-446655440016', 'Child Psychologist', ARRAY['Child Psychology', 'Developmental Assessment', 'Family Therapy'], 1800, 10, 'Licensed psychologist with extensive experience in child development and family-centered therapeutic approaches.', ARRAY['Licensed Psychologist', 'Child Development Specialist'], ARRAY['English', 'Filipino'], 'Child Psychologist', 'Doctor of Psychology, Xavier University', ARRAY['RPsy - Registered Psychologist', 'Child Development Associate'], ARRAY['Malaybalay', 'Bukidnon'], true, 'approved', 4.9, 134, 892, 856, 98.8, 95.9, 150, true, 2200),
  ('550e8400-e29b-41d4-a716-446655440017', 'Music Therapist', ARRAY['Music Therapy', 'Creative Arts', 'Emotional Regulation'], 900, 3, 'Creative and compassionate music therapist helping children express themselves and develop skills through music.', ARRAY['Certified Music Therapist', 'Creative Arts Specialist'], ARRAY['English', 'Filipino'], 'Music Therapist', 'Bachelor of Music Therapy, University of the Philippines', ARRAY['MT-BC - Music Therapist Board Certified', 'Creative Arts Therapy Certification'], ARRAY['Zamboanga City', 'Zamboanga del Sur'], true, 'approved', 4.5, 67, 234, 221, 91.8, 94.4, 480, true, 1200),
  ('550e8400-e29b-41d4-a716-446655440018', 'Early Intervention Specialist', ARRAY['Early Intervention', 'Developmental Delays', 'Family Support'], 1000, 6, 'Specialized in early intervention services for infants and toddlers with developmental delays and their families.', ARRAY['Early Intervention Specialist', 'Family Support Certified'], ARRAY['English', 'Filipino'], 'Early Intervention Specialist', 'Master of Science in Early Childhood Special Education, Mindanao State University', ARRAY['EIS - Early Intervention Specialist', 'Family-Centered Practice Certification'], ARRAY['Dipolog City', 'Zamboanga del Norte'], true, 'approved', 4.7, 91, 567, 543, 95.7, 95.8, 240, true, 1300),
  ('550e8400-e29b-41d4-a716-446655440019', 'Art Therapist', ARRAY['Art Therapy', 'Creative Expression', 'Trauma Recovery'], 950, 4, 'Certified art therapist using creative expression to help children process emotions and develop communication skills.', ARRAY['Registered Art Therapist', 'Trauma-Informed Care'], ARRAY['English', 'Filipino'], 'Art Therapist', 'Master of Arts in Art Therapy, De La Salle University', ARRAY['ATR - Art Therapist Registered', 'Trauma-Informed Care Certification'], ARRAY['Cotabato City', 'Maguindanao'], true, 'approved', 4.6, 54, 198, 189, 92.6, 95.5, 420, true, 1250),
  ('550e8400-e29b-41d4-a716-446655440020', 'Social Worker', ARRAY['Family Support', 'Case Management', 'Resource Coordination'], 750, 9, 'Licensed social worker specializing in family support services and resource coordination for special needs families.', ARRAY['Licensed Social Worker', 'Case Management Certified'], ARRAY['English', 'Filipino'], 'Social Worker', 'Master of Social Work, Mindanao State University', ARRAY['RSW - Registered Social Worker', 'Case Management Certification'], ARRAY['Marawi City', 'Lanao del Sur'], true, 'approved', 4.8, 103, 678, 651, 97.3, 96.0, 180, true, 1000),
  ('550e8400-e29b-41d4-a716-446655440021', 'Nutritionist', '+63 929 345 6789', 'Surigao City, Surigao del Norte', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila')
ON CONFLICT (id) DO NOTHING;

-- Insert services for each professional
INSERT INTO services (
  professional_id,
  name,
  description,
  rate,
  duration,
  session_type,
  category,
  age_range,
  is_active
) VALUES 
  -- Dr. Sarah Johnson (Speech-Language Pathologist)
  ('550e8400-e29b-41d4-a716-446655440010', 'Speech Therapy Assessment', 'Comprehensive speech and language evaluation', 2000, 90, ARRAY['home_visit', 'online'], 'Assessment', '2-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440010', 'Individual Speech Therapy', 'One-on-one speech therapy sessions', 1500, 60, ARRAY['home_visit', 'online'], 'Therapy', '2-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440010', 'Autism Communication Support', 'Specialized communication therapy for autism', 1600, 60, ARRAY['home_visit', 'online'], 'Therapy', '2-12 years', true),
  
  -- Maria Rodriguez (Occupational Therapist)
  ('550e8400-e29b-41d4-a716-446655440011', 'Occupational Therapy Assessment', 'Comprehensive OT evaluation', 1800, 90, ARRAY['home_visit', 'online'], 'Assessment', '1-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440011', 'Sensory Integration Therapy', 'Sensory processing and integration sessions', 1200, 45, ARRAY['home_visit'], 'Therapy', '2-12 years', true),
  ('550e8400-e29b-41d4-a716-446655440011', 'Fine Motor Skills Training', 'Development of fine motor and writing skills', 1100, 45, ARRAY['home_visit', 'online'], 'Therapy', '3-15 years', true),
  
  -- Dr. Michael Chen (Developmental Pediatrician)
  ('550e8400-e29b-41d4-a716-446655440012', 'Developmental Assessment', 'Comprehensive developmental evaluation', 3500, 120, ARRAY['home_visit', 'online'], 'Assessment', '0-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440012', 'Autism Diagnostic Evaluation', 'Complete autism spectrum assessment', 4000, 150, ARRAY['home_visit', 'online'], 'Assessment', '1-12 years', true),
  ('550e8400-e29b-41d4-a716-446655440012', 'ADHD Assessment', 'Comprehensive ADHD evaluation', 3000, 90, ARRAY['home_visit', 'online'], 'Assessment', '4-18 years', true),
  
  -- Jennifer Smith (Special Education Teacher)
  ('550e8400-e29b-41d4-a716-446655440013', 'Educational Assessment', 'Learning abilities and needs evaluation', 1000, 60, ARRAY['home_visit', 'online'], 'Assessment', '3-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440013', 'Individual Education Support', 'One-on-one educational therapy', 800, 60, ARRAY['home_visit', 'online'], 'Therapy', '3-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440013', 'Behavioral Support Planning', 'Behavioral intervention plan development', 900, 45, ARRAY['home_visit', 'online'], 'Consultation', '3-18 years', true),
  
  -- Dr. David Kim (Physical Therapist)
  ('550e8400-e29b-41d4-a716-446655440014', 'Physical Therapy Assessment', 'Comprehensive motor skills evaluation', 1600, 90, ARRAY['home_visit', 'online'], 'Assessment', '0-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440014', 'Motor Development Therapy', 'Gross motor skills development', 1300, 60, ARRAY['home_visit'], 'Therapy', '1-15 years', true),
  ('550e8400-e29b-41d4-a716-446655440014', 'Cerebral Palsy Support', 'Specialized therapy for cerebral palsy', 1400, 60, ARRAY['home_visit'], 'Therapy', '1-18 years', true),
  
  -- Anna Martinez (Behavioral Therapist)
  ('550e8400-e29b-41d4-a716-446655440015', 'ABA Assessment', 'Applied Behavior Analysis evaluation', 1400, 90, ARRAY['home_visit', 'online'], 'Assessment', '2-12 years', true),
  ('550e8400-e29b-41d4-a716-446655440015', 'Individual ABA Therapy', 'One-on-one behavioral intervention', 1100, 60, ARRAY['home_visit', 'online'], 'Therapy', '2-12 years', true),
  ('550e8400-e29b-41d4-a716-446655440015', 'Parent Training Session', 'ABA techniques training for parents', 1000, 90, ARRAY['home_visit', 'online'], 'Consultation', 'All ages', true),
  
  -- Dr. Robert Taylor (Child Psychologist)
  ('550e8400-e29b-41d4-a716-446655440016', 'Psychological Assessment', 'Comprehensive psychological evaluation', 2200, 120, ARRAY['home_visit', 'online'], 'Assessment', '3-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440016', 'Individual Therapy', 'Child-focused therapeutic sessions', 1800, 60, ARRAY['home_visit', 'online'], 'Therapy', '3-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440016', 'Family Therapy', 'Family-centered therapeutic approach', 2000, 90, ARRAY['home_visit', 'online'], 'Therapy', 'All ages', true),
  
  -- Lisa Wong (Music Therapist)
  ('550e8400-e29b-41d4-a716-446655440017', 'Music Therapy Assessment', 'Musical abilities and preferences evaluation', 1200, 60, ARRAY['home_visit', 'online'], 'Assessment', '2-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440017', 'Individual Music Therapy', 'Personalized music therapy sessions', 900, 45, ARRAY['home_visit', 'online'], 'Therapy', '2-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440017', 'Group Music Sessions', 'Social music therapy in groups', 700, 60, ARRAY['home_visit'], 'Therapy', '4-12 years', true),
  
  -- Dr. Carlos Santos (Early Intervention Specialist)
  ('550e8400-e29b-41d4-a716-446655440018', 'Early Intervention Assessment', 'Comprehensive early development evaluation', 1300, 90, ARRAY['home_visit', 'online'], 'Assessment', '0-5 years', true),
  ('550e8400-e29b-41d4-a716-446655440018', 'Family-Centered Intervention', 'Home-based early intervention', 1000, 60, ARRAY['home_visit'], 'Therapy', '0-5 years', true),
  ('550e8400-e29b-41d4-a716-446655440018', 'Parent Coaching', 'Training parents in intervention techniques', 900, 60, ARRAY['home_visit', 'online'], 'Consultation', 'All ages', true),
  
  -- Patricia Garcia (Art Therapist)
  ('550e8400-e29b-41d4-a716-446655440019', 'Art Therapy Assessment', 'Creative expression and emotional evaluation', 1250, 60, ARRAY['home_visit', 'online'], 'Assessment', '3-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440019', 'Individual Art Therapy', 'Creative therapeutic sessions', 950, 60, ARRAY['home_visit', 'online'], 'Therapy', '3-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440019', 'Trauma Recovery Art Therapy', 'Art therapy for trauma processing', 1100, 60, ARRAY['home_visit', 'online'], 'Therapy', '5-18 years', true),
  
  -- Dr. James Wilson (Social Worker)
  ('550e8400-e29b-41d4-a716-446655440020', 'Family Assessment', 'Comprehensive family needs evaluation', 1000, 90, ARRAY['home_visit', 'online'], 'Assessment', 'All ages', true),
  ('550e8400-e29b-41d4-a716-446655440020', 'Case Management', 'Ongoing family support and coordination', 750, 60, ARRAY['home_visit', 'online'], 'Consultation', 'All ages', true),
  ('550e8400-e29b-41d4-a716-446655440020', 'Resource Coordination', 'Connecting families with community resources', 600, 45, ARRAY['home_visit', 'online'], 'Consultation', 'All ages', true),
  
  -- Elena Reyes (Nutritionist)
  ('550e8400-e29b-41d4-a716-446655440021', 'Nutritional Assessment', 'Dietary needs evaluation for special needs', 800, 60, ARRAY['home_visit', 'online'], 'Assessment', '0-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440021', 'Meal Planning Consultation', 'Specialized meal planning for dietary needs', 600, 45, ARRAY['home_visit', 'online'], 'Consultation', '0-18 years', true),
  ('550e8400-e29b-41d4-a716-446655440021', 'Family Nutrition Education', 'Nutrition education for special diets', 700, 60, ARRAY['home_visit', 'online'], 'Consultation', 'All ages', true)
ON CONFLICT (id) DO NOTHING;

-- Insert availability for each professional (Monday to Friday, 9 AM to 5 PM)
INSERT INTO availability (
  professional_id,
  day_of_week,
  start_time,
  end_time,
  is_available,
  max_sessions_per_day
) VALUES 
  -- Dr. Sarah Johnson
  ('550e8400-e29b-41d4-a716-446655440010', 1, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440010', 2, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440010', 3, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440010', 4, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440010', 5, '09:00', '15:00', true, 4),
  
  -- Maria Rodriguez
  ('550e8400-e29b-41d4-a716-446655440011', 1, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440011', 2, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440011', 3, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440011', 4, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440011', 5, '08:00', '14:00', true, 5),
  
  -- Dr. Michael Chen
  ('550e8400-e29b-41d4-a716-446655440012', 1, '10:00', '18:00', true, 5),
  ('550e8400-e29b-41d4-a716-446655440012', 2, '10:00', '18:00', true, 5),
  ('550e8400-e29b-41d4-a716-446655440012', 3, '10:00', '18:00', true, 5),
  ('550e8400-e29b-41d4-a716-446655440012', 4, '10:00', '18:00', true, 5),
  ('550e8400-e29b-41d4-a716-446655440012', 6, '09:00', '13:00', true, 3),
  
  -- Jennifer Smith
  ('550e8400-e29b-41d4-a716-446655440013', 1, '07:00', '15:00', true, 8),
  ('550e8400-e29b-41d4-a716-446655440013', 2, '07:00', '15:00', true, 8),
  ('550e8400-e29b-41d4-a716-446655440013', 3, '07:00', '15:00', true, 8),
  ('550e8400-e29b-41d4-a716-446655440013', 4, '07:00', '15:00', true, 8),
  ('550e8400-e29b-41d4-a716-446655440013', 5, '07:00', '13:00', true, 6),
  
  -- Dr. David Kim
  ('550e8400-e29b-41d4-a716-446655440014', 1, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440014', 2, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440014', 3, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440014', 4, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440014', 5, '09:00', '15:00', true, 4),
  
  -- Anna Martinez
  ('550e8400-e29b-41d4-a716-446655440015', 1, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440015', 2, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440015', 3, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440015', 4, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440015', 5, '08:00', '14:00', true, 5),
  
  -- Dr. Robert Taylor
  ('550e8400-e29b-41d4-a716-446655440016', 1, '10:00', '18:00', true, 5),
  ('550e8400-e29b-41d4-a716-446655440016', 2, '10:00', '18:00', true, 5),
  ('550e8400-e29b-41d4-a716-446655440016', 3, '10:00', '18:00', true, 5),
  ('550e8400-e29b-41d4-a716-446655440016', 4, '10:00', '18:00', true, 5),
  ('550e8400-e29b-41d4-a716-446655440016', 6, '09:00', '13:00', true, 3),
  
  -- Lisa Wong
  ('550e8400-e29b-41d4-a716-446655440017', 1, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440017', 2, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440017', 3, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440017', 4, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440017', 5, '09:00', '15:00', true, 4),
  
  -- Dr. Carlos Santos
  ('550e8400-e29b-41d4-a716-446655440018', 1, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440018', 2, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440018', 3, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440018', 4, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440018', 5, '08:00', '14:00', true, 5),
  
  -- Patricia Garcia
  ('550e8400-e29b-41d4-a716-446655440019', 1, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440019', 2, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440019', 3, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440019', 4, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440019', 5, '09:00', '15:00', true, 4),
  
  -- Dr. James Wilson
  ('550e8400-e29b-41d4-a716-446655440020', 1, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440020', 2, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440020', 3, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440020', 4, '08:00', '16:00', true, 7),
  ('550e8400-e29b-41d4-a716-446655440020', 5, '08:00', '14:00', true, 5),
  
  -- Elena Reyes
  ('550e8400-e29b-41d4-a716-446655440021', 1, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440021', 2, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440021', 3, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440021', 4, '09:00', '17:00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440021', 5, '09:00', '15:00', true, 4)
ON CONFLICT (professional_id, day_of_week) DO NOTHING;