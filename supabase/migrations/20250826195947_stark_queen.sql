/*
  # Insert Sample Professionals Data

  1. New Data
    - Insert sample user profiles for professionals
    - Insert professional profiles with specializations, credentials, etc.
    - Insert services offered by each professional
    - Insert availability schedules for each professional

  2. Security
    - All data inserted respects existing RLS policies
    - Professional profiles are marked as verified for demo purposes

  3. Sample Data Includes
    - 12 verified professionals across Mindanao
    - Various specializations (Speech Therapy, OT, Psychology, etc.)
    - Complete professional profiles with credentials
    - Service offerings with rates and descriptions
    - Weekly availability schedules
*/

-- Insert sample user profiles for professionals
INSERT INTO user_profiles (id, role, full_name, phone_number, address, avatar_url, is_verified, is_active, preferred_language, timezone) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'professional', 'Dr. Maria Santos-Cruz', '+63 917 123 4567', 'Cagayan de Oro City, Misamis Oriental', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440011', 'professional', 'Dr. Jose Miguel Reyes', '+63 917 234 5678', 'Davao City, Davao del Sur', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440012', 'professional', 'Ms. Ana Luz Fernandez', '+63 917 345 6789', 'Malaybalay City, Bukidnon', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440013', 'professional', 'Ms. Grace Villanueva-Tan', '+63 917 456 7890', 'General Santos City, South Cotabato', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440014', 'professional', 'Dr. Roberto Dela Cruz', '+63 917 567 8901', 'Butuan City, Agusan del Norte', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440015', 'professional', 'Ms. Jennifer Lim-Garcia', '+63 917 678 9012', 'Iligan City, Lanao del Norte', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440016', 'professional', 'Ms. Catherine Morales-Dizon', '+63 917 789 0123', 'Valencia City, Bukidnon', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440017', 'professional', 'Dr. Mark Anthony Gonzales', '+63 917 890 1234', 'Kidapawan City, Cotabato', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440018', 'professional', 'Ms. Rosalie Magbanua-Torres', '+63 917 901 2345', 'Koronadal City, South Cotabato', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440019', 'professional', 'Ms. Aileen Delos Santos', '+63 917 012 3456', 'Zamboanga City, Zamboanga del Sur', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440020', 'professional', 'Dr. Patricia Ramos-Aquino', '+63 917 123 4560', 'Dipolog City, Zamboanga del Norte', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila'),
('550e8400-e29b-41d4-a716-446655440021', 'professional', 'Ms. Michelle Cabrera-Yap', '+63 917 234 5601', 'Pagadian City, Zamboanga del Sur', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 'en', 'Asia/Manila')
ON CONFLICT (id) DO NOTHING;

-- Insert professional profiles
INSERT INTO professional_profiles (
  id, title, specializations, hourly_rate, experience_years, bio, credentials, 
  languages, is_verified, rating, review_count, total_sessions, completed_sessions,
  response_rate, completion_rate, average_response_time, consultation_fee,
  service_areas, verification_status
) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Licensed Speech-Language Pathologist', 
 ARRAY['Speech and Language Therapy', 'Autism Spectrum Disorders', 'Communication Disorders'], 
 1500.00, 12, 
 'Dedicated speech-language pathologist with over 12 years of experience helping children with communication disorders. Specializes in autism spectrum disorders and developmental delays. Fluent in Filipino, English, and Cebuano.',
 ARRAY['Licensed Speech-Language Pathologist (PRC)', 'Master''s in Speech Pathology - University of the Philippines', 'ABA Certification', 'PECS Level 2 Certified'],
 ARRAY['Filipino', 'English', 'Cebuano'], true, 4.90, 127, 1247, 1223, 98.00, 98.00, 120, 2000.00,
 ARRAY['Cagayan de Oro City', 'Misamis Oriental'], 'approved'),

('550e8400-e29b-41d4-a716-446655440011', 'Developmental Pediatrician',
 ARRAY['Developmental Therapy', 'Autism Spectrum Disorders', 'ADHD Support', 'Early Intervention'],
 2000.00, 15,
 'Board-certified developmental pediatrician specializing in autism spectrum disorders and ADHD. Provides comprehensive developmental assessments and treatment planning for children with special needs.',
 ARRAY['Board Certified Developmental Pediatrician', 'Doctor of Medicine - University of Santo Tomas', 'Fellowship in Developmental Pediatrics - Philippine Children''s Medical Center', 'ADHD Specialist Certification'],
 ARRAY['Filipino', 'English', 'Bisaya'], true, 4.80, 89, 892, 856, 96.00, 96.00, 240, 3000.00,
 ARRAY['Davao City', 'Davao del Sur'], 'approved'),

('550e8400-e29b-41d4-a716-446655440012', 'Licensed Occupational Therapist',
 ARRAY['Occupational Therapy (OT)', 'Sensory Integration Therapy', 'Motor Skills Development'],
 1300.00, 8,
 'Licensed occupational therapist passionate about helping children develop essential life skills. Specializes in sensory integration and fine motor development for children with autism and developmental delays.',
 ARRAY['Licensed Occupational Therapist (PRC)', 'Bachelor of Science in Occupational Therapy - Mindanao State University', 'Sensory Integration Certification', 'Pediatric OT Specialist'],
 ARRAY['Filipino', 'English', 'Hiligaynon'], true, 4.70, 156, 743, 698, 94.00, 94.00, 180, 1800.00,
 ARRAY['Malaybalay City', 'Bukidnon'], 'approved'),

('550e8400-e29b-41d4-a716-446655440013', 'Special Education Teacher (SPED)',
 ARRAY['Special Education', 'Applied Behavior Analysis (ABA)', 'Social Skills Training', 'Academic Skills'],
 1000.00, 10,
 'Experienced special education teacher with expertise in ABA and academic skill development. Dedicated to creating inclusive learning environments for children with diverse learning needs.',
 ARRAY['Licensed Professional Teacher (LPT)', 'Master''s in Special Education - Central Mindanao University', 'ABA Therapist Certification', 'Autism Specialist Certificate'],
 ARRAY['Filipino', 'English', 'Cebuano'], true, 4.60, 203, 1156, 1121, 97.00, 97.00, 60, 1500.00,
 ARRAY['General Santos City', 'South Cotabato'], 'approved'),

('550e8400-e29b-41d4-a716-446655440014', 'Clinical Psychologist',
 ARRAY['Behavioral Therapy', 'Autism Spectrum Disorders', 'ADHD Support', 'Parent Training and Support'],
 1800.00, 18,
 'Clinical psychologist specializing in autism spectrum disorders and behavioral interventions. Extensive experience in family therapy and parent training programs.',
 ARRAY['Licensed Psychologist (PRC)', 'PhD in Clinical Psychology - Ateneo de Davao University', 'Board Certified Behavior Analyst (BCBA)', 'Family Therapy Certification'],
 ARRAY['Filipino', 'English', 'Bisaya'], true, 4.80, 94, 567, 539, 95.00, 95.00, 360, 3500.00,
 ARRAY['Butuan City', 'Agusan del Norte'], 'approved'),

('550e8400-e29b-41d4-a716-446655440015', 'Physical Therapist',
 ARRAY['Motor Skills Development', 'Developmental Therapy', 'Early Intervention'],
 1200.00, 6,
 'Licensed physical therapist focused on pediatric development and motor skills enhancement. Experienced in working with children with cerebral palsy, developmental delays, and motor coordination issues.',
 ARRAY['Licensed Physical Therapist (PRC)', 'Bachelor of Science in Physical Therapy - Mindanao State University', 'Pediatric Physical Therapy Certification', 'NDT Certification'],
 ARRAY['Filipino', 'English', 'Maranao'], true, 4.50, 78, 445, 409, 92.00, 92.00, 240, 1600.00,
 ARRAY['Iligan City', 'Lanao del Norte'], 'approved'),

('550e8400-e29b-41d4-a716-446655440016', 'Registered Behavior Technician (RBT)',
 ARRAY['Applied Behavior Analysis (ABA)', 'Behavioral Therapy', 'Social Skills Training'],
 800.00, 4,
 'Certified behavior technician specializing in ABA therapy for children with autism. Passionate about creating positive learning environments and supporting families in their journey.',
 ARRAY['Registered Behavior Technician (RBT)', 'Bachelor of Science in Psychology - Central Mindanao University', 'ABA Training Certificate', 'First Aid/CPR Certified'],
 ARRAY['Filipino', 'English', 'Cebuano'], true, 4.40, 112, 623, 598, 96.00, 96.00, 120, 1200.00,
 ARRAY['Valencia City', 'Bukidnon'], 'approved'),

('550e8400-e29b-41d4-a716-446655440017', 'Developmental Pediatrician',
 ARRAY['Developmental Therapy', 'Autism Spectrum Disorders', 'ADHD Support', 'Early Intervention'],
 2500.00, 20,
 'Senior developmental pediatrician with two decades of experience in diagnosing and treating children with developmental disorders. Advocates for early intervention and family-centered care.',
 ARRAY['Board Certified Developmental Pediatrician', 'Doctor of Medicine - Davao Medical School Foundation', 'Fellowship in Developmental Pediatrics - Philippine General Hospital', 'Autism Diagnostic Certification'],
 ARRAY['Filipino', 'English', 'Hiligaynon'], true, 4.90, 67, 234, 232, 99.00, 99.00, 480, 4500.00,
 ARRAY['Kidapawan City', 'Cotabato'], 'approved'),

('550e8400-e29b-41d4-a716-446655440018', 'Early Intervention Specialist',
 ARRAY['Early Intervention', 'Developmental Therapy', 'Parent Training and Support', 'Motor Skills Development'],
 1100.00, 9,
 'Early intervention specialist dedicated to supporting infants and toddlers with developmental delays. Strong advocate for family-centered intervention and community-based services.',
 ARRAY['Early Intervention Specialist Certification', 'Master''s in Special Education - Notre Dame University', 'Infant Development Specialist', 'Family Service Coordination Certificate'],
 ARRAY['Filipino', 'English', 'Hiligaynon', 'T''boli'], true, 4.60, 145, 789, 734, 93.00, 93.00, 180, 1500.00,
 ARRAY['Koronadal City', 'South Cotabato'], 'approved'),

('550e8400-e29b-41d4-a716-446655440019', 'Music Therapist',
 ARRAY['Developmental Therapy', 'Social Skills Training', 'Communication Disorders', 'Sensory Integration Therapy'],
 1000.00, 7,
 'Certified music therapist using music as a therapeutic tool to enhance communication, social skills, and emotional expression in children with special needs.',
 ARRAY['Board Certified Music Therapist', 'Bachelor of Music Therapy - University of the Philippines', 'Neurologic Music Therapy Certification', 'Autism Music Therapy Specialist'],
 ARRAY['Filipino', 'English', 'Chavacano', 'Cebuano'], true, 4.70, 91, 512, 466, 91.00, 91.00, 300, 1200.00,
 ARRAY['Zamboanga City', 'Zamboanga del Sur'], 'approved'),

('550e8400-e29b-41d4-a716-446655440020', 'Child Psychiatrist',
 ARRAY['Behavioral Therapy', 'ADHD Support', 'Autism Spectrum Disorders', 'Parent Training and Support'],
 2200.00, 14,
 'Board-certified child psychiatrist specializing in neurodevelopmental disorders. Provides comprehensive psychiatric evaluation and medication management for children with complex needs.',
 ARRAY['Board Certified Child Psychiatrist', 'Doctor of Medicine - Ateneo School of Medicine', 'Residency in Psychiatry - National Center for Mental Health', 'Child Psychiatry Fellowship - Philippine General Hospital'],
 ARRAY['Filipino', 'English', 'Cebuano'], true, 4.80, 73, 298, 292, 98.00, 98.00, 720, 3500.00,
 ARRAY['Dipolog City', 'Zamboanga del Norte'], 'approved'),

('550e8400-e29b-41d4-a716-446655440021', 'Art Therapist',
 ARRAY['Developmental Therapy', 'Social Skills Training', 'Communication Disorders', 'Behavioral Therapy'],
 900.00, 5,
 'Creative arts therapist using visual arts to help children express emotions and develop communication skills. Specializes in working with non-verbal children and those with emotional regulation challenges.',
 ARRAY['Registered Art Therapist', 'Master''s in Art Therapy - De La Salle University', 'Play Therapy Certification', 'Trauma-Informed Care Certificate'],
 ARRAY['Filipino', 'English', 'Cebuano'], true, 4.50, 86, 387, 344, 89.00, 89.00, 240, 1100.00,
 ARRAY['Pagadian City', 'Zamboanga del Sur'], 'approved')
ON CONFLICT (id) DO NOTHING;

-- Insert services for each professional
INSERT INTO services (professional_id, name, description, rate, duration, session_type, category, age_range, is_active) VALUES
-- Dr. Maria Santos-Cruz services
('550e8400-e29b-41d4-a716-446655440010', 'Speech Assessment', 'Comprehensive speech and language evaluation', 2000.00, 90, ARRAY['home_visit', 'online'], 'Assessment', '2-18 years', true),
('550e8400-e29b-41d4-a716-446655440010', 'Individual Speech Therapy', 'One-on-one speech therapy sessions', 1500.00, 60, ARRAY['home_visit', 'online'], 'Therapy', '2-18 years', true),
('550e8400-e29b-41d4-a716-446655440010', 'Parent Consultation', 'Guidance for parents on home practice', 1200.00, 45, ARRAY['online'], 'Consultation', 'All ages', true),

-- Dr. Jose Miguel Reyes services
('550e8400-e29b-41d4-a716-446655440011', 'Developmental Assessment', 'Comprehensive developmental evaluation', 3000.00, 120, ARRAY['home_visit'], 'Assessment', '0-18 years', true),
('550e8400-e29b-41d4-a716-446655440011', 'ADHD Consultation', 'ADHD assessment and management planning', 2500.00, 90, ARRAY['home_visit', 'online'], 'Consultation', '3-18 years', true),
('550e8400-e29b-41d4-a716-446655440011', 'Follow-up Consultation', 'Progress review and treatment adjustment', 2000.00, 60, ARRAY['online'], 'Consultation', 'All ages', true),

-- Ms. Ana Luz Fernandez services
('550e8400-e29b-41d4-a716-446655440012', 'OT Assessment', 'Occupational therapy evaluation', 1800.00, 90, ARRAY['home_visit'], 'Assessment', '1-18 years', true),
('550e8400-e29b-41d4-a716-446655440012', 'Sensory Integration Therapy', 'Individual sensory integration sessions', 1300.00, 60, ARRAY['home_visit', 'online'], 'Therapy', '2-12 years', true),

-- Ms. Grace Villanueva-Tan services
('550e8400-e29b-41d4-a716-446655440013', 'Educational Assessment', 'Academic skills and learning needs evaluation', 1500.00, 120, ARRAY['home_visit'], 'Assessment', '3-18 years', true),
('550e8400-e29b-41d4-a716-446655440013', 'ABA Therapy Session', 'Applied behavior analysis therapy', 1000.00, 60, ARRAY['home_visit', 'online'], 'Therapy', '2-18 years', true),

-- Dr. Roberto Dela Cruz services
('550e8400-e29b-41d4-a716-446655440014', 'Psychological Assessment', 'Comprehensive psychological evaluation', 3500.00, 150, ARRAY['home_visit'], 'Assessment', '3-18 years', true),
('550e8400-e29b-41d4-a716-446655440014', 'Behavioral Therapy', 'Individual behavioral intervention sessions', 1800.00, 60, ARRAY['home_visit', 'online'], 'Therapy', '3-18 years', true),

-- Ms. Jennifer Lim-Garcia services
('550e8400-e29b-41d4-a716-446655440015', 'Motor Skills Assessment', 'Gross and fine motor skills evaluation', 1600.00, 90, ARRAY['home_visit'], 'Assessment', '1-18 years', true),
('550e8400-e29b-41d4-a716-446655440015', 'Physical Therapy Session', 'Individual motor development therapy', 1200.00, 60, ARRAY['home_visit'], 'Therapy', '1-18 years', true),

-- Ms. Catherine Morales-Dizon services
('550e8400-e29b-41d4-a716-446655440016', 'ABA Therapy Session', 'Applied behavior analysis intervention', 1200.00, 90, ARRAY['home_visit', 'online'], 'Therapy', '2-18 years', true),
('550e8400-e29b-41d4-a716-446655440016', 'Social Skills Group', 'Group social skills training', 800.00, 60, ARRAY['home_visit'], 'Therapy', '4-12 years', true),

-- Dr. Mark Anthony Gonzales services
('550e8400-e29b-41d4-a716-446655440017', 'Comprehensive Developmental Assessment', 'Full developmental evaluation and diagnosis', 4500.00, 180, ARRAY['home_visit'], 'Assessment', '0-18 years', true),
('550e8400-e29b-41d4-a716-446655440017', 'Developmental Consultation', 'Treatment planning and family guidance', 2500.00, 90, ARRAY['home_visit', 'online'], 'Consultation', 'All ages', true),

-- Ms. Rosalie Magbanua-Torres services
('550e8400-e29b-41d4-a716-446655440018', 'Early Intervention Assessment', 'Developmental screening for infants and toddlers', 1500.00, 90, ARRAY['home_visit'], 'Assessment', '0-3 years', true),
('550e8400-e29b-41d4-a716-446655440018', 'Family-Centered Therapy', 'Home-based early intervention services', 1100.00, 75, ARRAY['home_visit'], 'Therapy', '0-5 years', true),

-- Ms. Aileen Delos Santos services
('550e8400-e29b-41d4-a716-446655440019', 'Music Therapy Assessment', 'Musical and developmental assessment', 1200.00, 60, ARRAY['home_visit', 'online'], 'Assessment', '2-18 years', true),
('550e8400-e29b-41d4-a716-446655440019', 'Individual Music Therapy', 'One-on-one music therapy sessions', 1000.00, 45, ARRAY['home_visit', 'online'], 'Therapy', '2-18 years', true),

-- Dr. Patricia Ramos-Aquino services
('550e8400-e29b-41d4-a716-446655440020', 'Psychiatric Evaluation', 'Comprehensive mental health assessment', 3500.00, 120, ARRAY['home_visit'], 'Assessment', '5-18 years', true),
('550e8400-e29b-41d4-a716-446655440020', 'Medication Management', 'Psychiatric medication consultation', 2200.00, 60, ARRAY['home_visit', 'online'], 'Consultation', '5-18 years', true),

-- Ms. Michelle Cabrera-Yap services
('550e8400-e29b-41d4-a716-446655440021', 'Art Therapy Assessment', 'Creative expression and emotional assessment', 1100.00, 75, ARRAY['home_visit'], 'Assessment', '3-18 years', true),
('550e8400-e29b-41d4-a716-446655440021', 'Individual Art Therapy', 'Creative arts therapy sessions', 900.00, 60, ARRAY['home_visit', 'online'], 'Therapy', '3-18 years', true)
ON CONFLICT (professional_id, name) DO NOTHING;

-- Insert availability for each professional
INSERT INTO availability (professional_id, day_of_week, start_time, end_time, is_available, max_sessions_per_day) VALUES
-- Dr. Maria Santos-Cruz (Monday, Tuesday, Wednesday, Friday)
('550e8400-e29b-41d4-a716-446655440010', 1, '09:00', '17:00', true, 6),
('550e8400-e29b-41d4-a716-446655440010', 2, '09:00', '17:00', true, 6),
('550e8400-e29b-41d4-a716-446655440010', 3, '09:00', '17:00', true, 6),
('550e8400-e29b-41d4-a716-446655440010', 5, '09:00', '17:00', true, 6),

-- Dr. Jose Miguel Reyes (Monday, Wednesday, Thursday, Saturday)
('550e8400-e29b-41d4-a716-446655440011', 1, '08:00', '16:00', true, 4),
('550e8400-e29b-41d4-a716-446655440011', 3, '08:00', '16:00', true, 4),
('550e8400-e29b-41d4-a716-446655440011', 4, '08:00', '16:00', true, 4),
('550e8400-e29b-41d4-a716-446655440011', 6, '08:00', '14:00', true, 3),

-- Ms. Ana Luz Fernandez (Tuesday, Wednesday, Thursday, Friday)
('550e8400-e29b-41d4-a716-446655440012', 2, '10:00', '18:00', true, 7),
('550e8400-e29b-41d4-a716-446655440012', 3, '10:00', '18:00', true, 7),
('550e8400-e29b-41d4-a716-446655440012', 4, '10:00', '18:00', true, 7),
('550e8400-e29b-41d4-a716-446655440012', 5, '10:00', '18:00', true, 7),

-- Ms. Grace Villanueva-Tan (Monday, Tuesday, Thursday, Friday)
('550e8400-e29b-41d4-a716-446655440013', 1, '08:00', '17:00', true, 8),
('550e8400-e29b-41d4-a716-446655440013', 2, '08:00', '17:00', true, 8),
('550e8400-e29b-41d4-a716-446655440013', 4, '08:00', '17:00', true, 8),
('550e8400-e29b-41d4-a716-446655440013', 5, '08:00', '17:00', true, 8),

-- Dr. Roberto Dela Cruz (Monday, Wednesday, Friday, Saturday)
('550e8400-e29b-41d4-a716-446655440014', 1, '09:00', '15:00', true, 4),
('550e8400-e29b-41d4-a716-446655440014', 3, '09:00', '15:00', true, 4),
('550e8400-e29b-41d4-a716-446655440014', 5, '09:00', '15:00', true, 4),
('550e8400-e29b-41d4-a716-446655440014', 6, '09:00', '13:00', true, 3),

-- Ms. Jennifer Lim-Garcia (Tuesday, Wednesday, Thursday, Saturday)
('550e8400-e29b-41d4-a716-446655440015', 2, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440015', 3, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440015', 4, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440015', 6, '09:00', '14:00', true, 4),

-- Ms. Catherine Morales-Dizon (Monday-Friday)
('550e8400-e29b-41d4-a716-446655440016', 1, '08:00', '17:00', true, 8),
('550e8400-e29b-41d4-a716-446655440016', 2, '08:00', '17:00', true, 8),
('550e8400-e29b-41d4-a716-446655440016', 3, '08:00', '17:00', true, 8),
('550e8400-e29b-41d4-a716-446655440016', 4, '08:00', '17:00', true, 8),
('550e8400-e29b-41d4-a716-446655440016', 5, '08:00', '17:00', true, 8),

-- Dr. Mark Anthony Gonzales (Monday, Wednesday, Friday)
('550e8400-e29b-41d4-a716-446655440017', 1, '08:00', '14:00', true, 3),
('550e8400-e29b-41d4-a716-446655440017', 3, '08:00', '14:00', true, 3),
('550e8400-e29b-41d4-a716-446655440017', 5, '08:00', '14:00', true, 3),

-- Ms. Rosalie Magbanua-Torres (Monday, Tuesday, Thursday, Friday, Saturday)
('550e8400-e29b-41d4-a716-446655440018', 1, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440018', 2, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440018', 4, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440018', 5, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440018', 6, '09:00', '14:00', true, 4),

-- Ms. Aileen Delos Santos (Monday, Wednesday, Thursday, Friday)
('550e8400-e29b-41d4-a716-446655440019', 1, '10:00', '17:00', true, 6),
('550e8400-e29b-41d4-a716-446655440019', 3, '10:00', '17:00', true, 6),
('550e8400-e29b-41d4-a716-446655440019', 4, '10:00', '17:00', true, 6),
('550e8400-e29b-41d4-a716-446655440019', 5, '10:00', '17:00', true, 6),

-- Dr. Patricia Ramos-Aquino (Tuesday, Wednesday, Friday, Saturday)
('550e8400-e29b-41d4-a716-446655440020', 2, '09:00', '15:00', true, 4),
('550e8400-e29b-41d4-a716-446655440020', 3, '09:00', '15:00', true, 4),
('550e8400-e29b-41d4-a716-446655440020', 5, '09:00', '15:00', true, 4),
('550e8400-e29b-41d4-a716-446655440020', 6, '09:00', '13:00', true, 3),

-- Ms. Michelle Cabrera-Yap (Monday, Tuesday, Wednesday, Thursday)
('550e8400-e29b-41d4-a716-446655440021', 1, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440021', 2, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440021', 3, '09:00', '16:00', true, 6),
('550e8400-e29b-41d4-a716-446655440021', 4, '09:00', '16:00', true, 6)
ON CONFLICT (professional_id, name) DO NOTHING;