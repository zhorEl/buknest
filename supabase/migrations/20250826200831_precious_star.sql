```sql
-- Temporarily drop the foreign key constraint on user_profiles.id
ALTER TABLE public.user_profiles DROP CONSTRAINT user_profiles_id_fkey;

-- Insert sample user_profiles
INSERT INTO public.user_profiles (id, role, full_name, phone_number, address, avatar_url, is_verified, is_active, date_of_birth, emergency_contact, preferred_language, timezone, notification_preferences)
VALUES
    ('550e8400-e29b-41d4-a716-446655440004', 'professional', 'Dr. Sarah Johnson', '+639171234567', '123 Main St, Bukidnon', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1985-05-10', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": false, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440005', 'professional', 'Maria Rodriguez', '+639172345678', '456 Oak Ave, Bukidnon', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1990-08-22', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": true, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440006', 'professional', 'Dr. Michael Chen', '+639173456789', '789 Pine St, Bukidnon', 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1978-11-01', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": false, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440007', 'professional', 'Jessica Lee', '+639174567890', '101 Elm St, Bukidnon', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1992-03-19', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": true, "push": false}'),
    ('550e8400-e29b-41d4-a716-446655440008', 'professional', 'David Garcia', '+639175678901', '202 Maple Ave, Bukidnon', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1980-07-07', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": false, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440009', 'professional', 'Emily White', '+639176789012', '303 Birch Ln, Bukidnon', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1995-01-25', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": true, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440010', 'professional', 'Dr. Robert Brown', '+639177890123', '404 Cedar Rd, Bukidnon', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1975-09-14', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": false, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440011', 'professional', 'Sophia Davis', '+639178901234', '505 Spruce Ct, Bukidnon', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1988-04-03', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": true, "push": false}'),
    ('550e8400-e29b-41d4-a716-446655440012', 'professional', 'Daniel Wilson', '+639179012345', '606 Willow Dr, Bukidnon', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1983-12-11', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": false, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440013', 'professional', 'Olivia Taylor', '+639170123456', '707 Poplar Ave, Bukidnon', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1991-06-28', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": true, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440014', 'professional', 'James Martinez', '+639171122334', '808 Sycamore St, Bukidnon', 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1987-02-17', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": false, "push": true}'),
    ('550e8400-e29b-41d4-a716-446655440015', 'professional', 'Ava Anderson', '+639172233445', '909 Fir Ct, Bukidnon', 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400', TRUE, TRUE, '1993-10-05', NULL, 'en', 'Asia/Manila', '{"email": true, "sms": true, "push": false}');

-- Insert sample professional_profiles
INSERT INTO public.professional_profiles (id, title, specializations, hourly_rate, experience_years, bio, credentials, availability_days, is_verified, documents_uploaded, profession, languages, education, certifications, availability_hours, service_areas, max_travel_distance, verification_status, rating, review_count, total_sessions, completed_sessions, response_rate, completion_rate, average_response_time, is_accepting_new_clients, consultation_fee, cancellation_policy)
VALUES
    ('550e8400-e29b-41d4-a716-446655440004', 'Speech-Language Pathologist', '{"Speech Therapy", "Language Delay", "Articulation"}', 1500.00, 10, 'Experienced SLP specializing in early intervention and school-aged children.', '{"PRC License #12345", "ASHA Certified"}', '{"Monday", "Wednesday", "Friday"}', TRUE, TRUE, 'Speech-Language Pathologist', '{"English", "Cebuano"}', 'MS in Speech Pathology', '{"Certified in PECS"}', '{"start": "09:00", "end": "17:00"}', '{"Bukidnon", "Cagayan de Oro"}', 50, 'approved', 4.9, 75, 200, 180, 98.00, 95.00, 120, TRUE, 500.00, '24-hour notice required'),
    ('550e8400-e29b-41d4-a716-446655440005', 'Occupational Therapist', '{"Sensory Integration", "Fine Motor Skills", "ADHD"}', 1200.00, 7, 'Passionate OT helping children develop essential life skills through play-based therapy.', '{"PRC License #67890"}', '{"Tuesday", "Thursday"}', TRUE, TRUE, 'Occupational Therapist', '{"English", "Tagalog"}', 'BS in Occupational Therapy', '{"Sensory Integration Certified"}', '{"start": "08:00", "end": "16:00"}', '{"Bukidnon", "Davao City"}', 40, 'approved', 4.8, 60, 150, 140, 95.00, 92.00, 180, TRUE, 400.00, 'Same-day cancellations incur 50% fee'),
    ('550e8400-e29b-41d4-a716-446655440006', 'Developmental Pediatrician', '{"Autism Spectrum Disorder", "Developmental Delay", "ADHD"}', 2500.00, 15, 'Board-certified Developmental Pediatrician providing comprehensive diagnostic and management services.', '{"PMA License #11223", "PAPP Certified"}', '{"Monday", "Wednesday"}', TRUE, TRUE, 'Developmental Pediatrician', '{"English"}', 'MD, Fellowship in Developmental Pediatrics', '{"Fellow of PAPP"}', '{"start": "10:00", "end": "18:00"}', '{"Bukidnon", "Cagayan de Oro", "Davao City"}', 100, 'approved', 5.0, 120, 300, 290, 100.00, 99.00, 60, TRUE, 1000.00, '48-hour notice for cancellations'),
    ('550e8400-e29b-41d4-a716-446655440007', 'Special Education Teacher', '{"Learning Disabilities", "Behavioral Management", "Academic Support"}', 1000.00, 8, 'Dedicated SPED teacher creating individualized learning plans for diverse learners.', '{"LET License #98765"}', '{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"}', TRUE, TRUE, 'Special Education Teacher (SPED)', '{"English", "Tagalog"}', 'BSED in Special Education', '{"ABA Principles Certified"}', '{"start": "09:00", "end": "17:00"}', '{"Bukidnon"}', 30, 'approved', 4.7, 45, 100, 90, 90.00, 88.00, 240, TRUE, 300.00, '24-hour notice required'),
    ('550e8400-e29b-41d4-a716-446655440008', 'Physical Therapist', '{"Gross Motor Skills", "Mobility", "Cerebral Palsy"}', 1300.00, 12, 'Experienced PT focused on improving physical function and mobility in children.', '{"PRC License #54321"}', '{"Tuesday", "Thursday", "Saturday"}', TRUE, TRUE, 'Physical Therapist', '{"English", "Hiligaynon"}', 'BS in Physical Therapy', '{"Pediatric PT Certified"}', '{"start": "08:00", "end": "16:00"}', '{"Bukidnon", "Iligan City"}', 60, 'approved', 4.9, 80, 220, 210, 97.00, 96.00, 90, TRUE, 450.00, '48-hour notice for cancellations'),
    ('550e8400-e29b-41d4-a716-446655440009', 'Child Psychologist', '{"Behavioral Issues", "Anxiety", "Emotional Regulation"}', 1800.00, 9, 'Compassionate psychologist providing mental health support for children and families.', '{"PRC License #24680"}', '{"Wednesday", "Friday"}', TRUE, TRUE, 'Child Psychologist', '{"English", "Tagalog"}', 'MA in Clinical Psychology', '{"CBT Certified"}', '{"start": "10:00", "end": "19:00"}', '{"Bukidnon", "Cagayan de Oro"}', 70, 'approved', 4.8, 55, 130, 125, 96.00, 94.00, 150, TRUE, 600.00, '24-hour notice required'),
    ('550e8400-e29b-41d4-a716-446655440010', 'Applied Behavior Analysis (ABA) Therapist', '{"Autism Spectrum Disorder", "Behavioral Intervention", "Social Skills"}', 1400.00, 6, 'Dedicated ABA therapist implementing evidence-based strategies for skill development.', '{"Registered Behavior Technician (RBT)"}', '{"Monday", "Tuesday", "Wednesday", "Thursday"}', TRUE, TRUE, 'Applied Behavior Analysis (ABA) Therapist', '{"English"}', 'BS in Psychology', '{"RBT Certified"}', '{"start": "09:00", "end": "17:00"}', '{"Bukidnon"}', 35, 'approved', 4.7, 70, 180, 170, 94.00, 90.00, 200, TRUE, 400.00, '24-hour notice required'),
    ('550e8400-e29b-41d4-a716-446655440011', 'Music Therapist', '{"Communication", "Emotional Expression", "Motor Skills"}', 1100.00, 5, 'Creative music therapist using rhythm and melody to achieve therapeutic goals.', '{"Board-Certified Music Therapist"}', '{"Monday", "Wednesday", "Friday"}', TRUE, TRUE, 'Music Therapist', '{"English"}', 'BM in Music Therapy', '{"MT-BC"}', '{"start": "10:00", "end": "18:00"}', '{"Bukidnon", "Cagayan de Oro"}', 45, 'approved', 4.9, 30, 80, 75, 98.00, 95.00, 100, TRUE, 350.00, '48-hour notice for cancellations'),
    ('550e8400-e29b-41d4-a716-446655440012', 'Art Therapist', '{"Emotional Processing", "Self-Expression", "Trauma"}', 1150.00, 6, 'Supportive art therapist facilitating healing and growth through creative expression.', '{"Registered Art Therapist"}', '{"Tuesday", "Thursday"}', TRUE, TRUE, 'Art Therapist', '{"English"}', 'MA in Art Therapy', '{"ATR-BC"}', '{"start": "09:00", "end": "17:00"}', '{"Bukidnon"}', 30, 'approved', 4.8, 25, 60, 55, 95.00, 90.00, 160, TRUE, 380.00, '24-hour notice required'),
    ('550e8400-e29b-41d4-a716-446655440013', 'Early Intervention Specialist', '{"Developmental Milestones", "Parent Coaching", "Play-Based Learning"}', 1350.00, 8, 'Specialist in early childhood development, empowering families with strategies for growth.', '{"Early Childhood Education Certified"}', '{"Monday", "Wednesday", "Friday"}', TRUE, TRUE, 'Early Intervention Specialist', '{"English", "Tagalog"}', 'BS in Early Childhood Education', '{"Certified Developmental Screener"}', '{"start": "08:00", "end": "16:00"}', '{"Bukidnon", "Davao City"}', 55, 'approved', 4.9, 65, 160, 155, 99.00, 98.00, 70, TRUE, 480.00, '24-hour notice required'),
    ('550e8400-e29b-41d4-a716-446655440014', 'Social Worker', '{"Family Support", "Advocacy", "Resource Navigation"}', 900.00, 10, 'Dedicated social worker assisting families in navigating resources and support systems.', '{"Registered Social Worker"}', '{"Tuesday", "Thursday"}', TRUE, TRUE, 'Social Worker', '{"English", "Cebuano"}', 'BS in Social Work', '{"Child Protection Certified"}', '{"start": "09:00", "end": "17:00"}', '{"Bukidnon"}', 40, 'approved', 4.7, 40, 100, 95, 92.00, 90.00, 250, TRUE, 250.00, 'Flexible cancellation policy'),
    ('550e8400-e29b-41d4-a716-446655440015', 'Educational Psychologist', '{"Assessment", "Learning Strategies", "IEP Development"}', 1900.00, 11, 'Psychologist specializing in educational assessments and learning interventions.', '{"PRC License #36912"}', '{"Monday", "Wednesday"}', TRUE, TRUE, 'Child Psychologist', '{"English"}', 'MA in Educational Psychology', '{"Licensed Psychologist"}', '{"start": "09:00", "end": "18:00"}', '{"Bukidnon", "Cagayan de Oro"}', 80, 'approved', 4.9, 50, 120, 115, 97.00, 95.00, 130, TRUE, 700.00, '48-hour notice required');

-- Insert sample services for each professional
INSERT INTO public.services (professional_id, name, description, rate, duration, session_type, max_sessions, category, age_range, prerequisites, materials_needed, is_active)
VALUES
    -- Dr. Sarah Johnson (Speech-Language Pathologist)
    ('550e8400-e29b-41d4-a716-446655440004', 'Speech Therapy Assessment', 'Comprehensive evaluation of speech and language development.', 1500.00, 90, 'both', 1, 'Assessment', '0-18 years', 'Parent intake form', '{"Assessment tools", "Toys"}', TRUE),
    ('550e8400-e29b-41d4-a716-446655440004', 'Individual Speech Therapy', 'One-on-one sessions focusing on articulation, fluency, and language skills.', 1200.00, 60, 'both', 20, 'Therapy', '0-18 years', 'Completed assessment', '{"Flashcards", "Books", "Games"}', TRUE),
    ('550e8400-e29b-41d4-a716-446655440004', 'Parent Coaching for Speech Development', 'Guidance for parents on how to support speech development at home.', 800.00, 45, 'online', 5, 'Consultation', 'All ages', 'Initial consultation', '{"Handouts", "Activity ideas"}', TRUE),

    -- Maria Rodriguez (Occupational Therapist)
    ('550e8400-e29b-41d4-a716-446655440005', 'OT Sensory Integration Session', 'Therapy focused on helping children process sensory information effectively.', 1200.00, 60, 'home_visit', 15, 'Therapy', '0-12 years', 'OT assessment', '{"Sensory toys", "Swings", "Therapy balls"}', TRUE),
    ('550e8400-e29b-41d4-a716-446655440005', 'Fine Motor Skills Development', 'Activities to improve hand-eye coordination, handwriting, and daily living skills.', 1000.00, 45, 'both', 10, 'Therapy', '3-10 years', 'Initial consultation', '{"Puzzles", "Play-doh", "Scissors"}', TRUE),

    -- Dr. Michael Chen (Developmental Pediatrician)
    ('550e8400-e29b-41d4-a716-446655440006', 'Developmental Assessment & Diagnosis', 'Comprehensive evaluation for developmental delays and disorders.', 2500.00, 120, 'both', 1, 'Assessment', '0-18 years', 'Referral if applicable', '{"Developmental scales", "Observation forms"}', TRUE),
    ('550e8400-e29b-41d4-a716-446655440006', 'Follow-up Consultation', 'Review of progress, medication management, and care plan adjustments.', 1500.00, 60, 'online', 10, 'Consultation', 'All ages', 'Previous assessment', '{"Medical records"}', TRUE),

    -- Jessica Lee (Special Education Teacher)
    ('550e8400-e29b-41d4-a716-446655440007', 'Individualized Academic Tutoring', 'Targeted support for reading, writing, and math based on IEP goals.', 1000.00, 60, 'both', 20, 'Education', '5-18 years', 'IEP or academic assessment', '{"Worksheets", "Textbooks", "Learning aids"}', TRUE),
    ('550e8400-e29b-41d4-a716-446655440007', 'Behavioral Support Coaching', 'Strategies for parents and teachers to manage challenging behaviors.', 800.00, 45, 'online', 5, 'Consultation', 'All ages', 'Behavioral assessment', '{"Behavior charts", "Tip sheets"}', TRUE),

    -- David Garcia (Physical Therapist)
    ('550e8400-e29b-41d4-a716-446655440008', 'Pediatric Physical Therapy', 'Improving gross motor skills, balance, and coordination.', 1300.00, 60, 'home_visit', 15, 'Therapy', '0-18 years', 'PT referral/assessment', '{"Therapy balls", "Cones", "Balance beams"}', TRUE),

    -- Emily White (Child Psychologist)
    ('550e8400-e29b-41d4-a716-446655440009', 'Child Counseling Session', 'Therapeutic support for emotional regulation, anxiety, and social challenges.', 1800.00, 60, 'both', 10, 'Therapy', '5-18 years', 'Initial intake', '{"Art supplies", "Play therapy tools"}', TRUE),

    -- Dr. Robert Brown (ABA Therapist)
    ('550e8400-e29b-41d4-a716-446655440010', 'ABA Therapy Session', 'Applied Behavior Analysis for skill acquisition and behavior reduction.', 1400.00, 90, 'home_visit', 25, 'Therapy', '2-10 years', 'FBA/ABA assessment', '{"Reinforcers", "Data sheets", "Visual schedules"}', TRUE),

    -- Sophia Davis (Music Therapist)
    ('550e8400-e29b-41d4-a716-446655440011', 'Individual Music Therapy', 'Using music to address communication, motor, and social goals.', 1100.00, 45, 'both', 10, 'Therapy', 'All ages', 'Initial consultation', '{"Instruments", "Songs", "Visuals"}', TRUE),

    -- Daniel Wilson (Art Therapist)
    ('550e8400-e29b-41d4-a716-446655440012', 'Individual Art Therapy', 'Facilitating self-expression and emotional processing through art.', 1150.00, 60, 'both', 10, 'Therapy', '4-18 years', 'Initial consultation', '{"Art materials", "Clay", "Paints"}', TRUE),

    -- Olivia Taylor (Early Intervention Specialist)
    ('550e8400-e29b-41d4-a716-446655440013', 'Early Intervention Home Program', 'Customized play-based strategies for infants and toddlers with developmental delays.', 1350.00, 60, 'home_visit', 12, 'Therapy', '0-3 years', 'Developmental screening', '{"Developmental toys", "Parent handouts"}', TRUE),

    -- James Martinez (Social Worker)
    ('550e8400-e29b-41d4-a716-446655440014', 'Family Support & Resource Navigation', 'Assisting families in accessing community resources and support networks.', 900.00, 60, 'both', 5, 'Consultation', 'All ages', 'Initial intake', '{"Resource directories", "Application forms"}', TRUE),

    -- Ava Anderson (Educational Psychologist)
    ('550e8400-e29b-41d4-a716-446655440015', 'Psychoeducational Assessment', 'Evaluation of cognitive, academic, and social-emotional functioning.', 1900.00, 180, 'home_visit', 1, 'Assessment', '6-18 years', 'School reports', '{"Standardized tests", "Questionnaires"}', TRUE);

-- Insert sample availability for each professional
INSERT INTO public.availability (professional_id, day_of_week, start_time, end_time, is_available, max_sessions_per_day, break_duration)
VALUES
    -- Dr. Sarah Johnson
    ('550e8400-e29b-41d4-a716-446655440004', 1, '09:00:00', '17:00:00', TRUE, 6, 15), -- Monday
    ('550e8400-e29b-41d4-a716-446655440004', 3, '09:00:00', '17:00:00', TRUE, 6, 15), -- Wednesday
    ('550e8400-e29b-41d4-a716-446655440004', 5, '09:00:00', '17:00:00', TRUE, 6, 15), -- Friday

    -- Maria Rodriguez
    ('550e8400-e29b-41d4-a716-446655440005', 2, '08:00:00', '16:00:00', TRUE, 6, 15), -- Tuesday
    ('550e8400-e29b-41d4-a716-446655440005', 4, '08:00:00', '16:00:00', TRUE, 6, 15), -- Thursday

    -- Dr. Michael Chen
    ('550e8400-e29b-41d4-a716-446655440006', 1, '10:00:00', '18:00:00', TRUE, 5, 30), -- Monday
    ('550e8400-e29b-41d4-a716-446655440006', 3, '10:00:00', '18:00:00', TRUE, 5, 30), -- Wednesday

    -- Jessica Lee
    ('550e8400-e29b-41d4-a716-446655440007', 1, '09:00:00', '17:00:00', TRUE, 7, 10), -- Monday
    ('550e8400-e29b-41d4-a716-446655440007', 2, '09:00:00', '17:00:00', TRUE, 7, 10), -- Tuesday
    ('550e8400-e29b-41d4-a716-446655440007', 3, '09:00:00', '17:00:00', TRUE, 7, 10), -- Wednesday
    ('550e8400-e29b-41d4-a716-446655440007', 4, '09:00:00', '17:00:00', TRUE, 7, 10), -- Thursday
    ('550e8400-e29b-41d4-a716-446655440007', 5, '09:00:00', '17:00:00', TRUE, 7, 10), -- Friday

    -- David Garcia
    ('550e8400-e29b-41d4-a716-446655440008', 2, '08:00:00', '16:00:00', TRUE, 6, 15), -- Tuesday
    ('550e8400-e29b-41d4-a716-446655440008', 4, '08:00:00', '16:00:00', TRUE, 6, 15), -- Thursday
    ('550e8400-e29b-41d4-a716-446655440008', 6, '09:00:00', '13:00:00', TRUE, 3, 15), -- Saturday

    -- Emily White
    ('550e8400-e29b-41d4-a716-446655440009', 3, '10:00:00', '19:00:00', TRUE, 6, 30), -- Wednesday
    ('550e8400-e29b-41d4-a716-446655440009', 5, '10:00:00', '19:00:00', TRUE, 6, 30), -- Friday

    -- Dr. Robert Brown
    ('550e8400-e29b-41d4-a716-446655440010', 1, '09:00:00', '17:00:00', TRUE, 5, 15), -- Monday
    ('550e8400-e29b-41d4-a716-446655440010', 2, '09:00:00', '17:00:00', TRUE, 5, 15), -- Tuesday
    ('550e8400-e29b-41d4-a716-446655440010', 3, '09:00:00', '17:00:00', TRUE, 5, 15), -- Wednesday
    ('550e8400-e29b-41d4-a716-446655440010', 4, '09:00:00', '17:00:00', TRUE, 5, 15), -- Thursday

    -- Sophia Davis
    ('550e8400-e29b-41d4-a716-446655440011', 1, '10:00:00', '18:00:00', TRUE, 6, 15), -- Monday
    ('550e8400-e29b-41d4-a716-446655440011', 3, '10:00:00', '18:00:00', TRUE, 6, 15), -- Wednesday
    ('550e8400-e29b-41d4-a716-446655440011', 5, '10:00:00', '18:00:00', TRUE, 6, 15), -- Friday

    -- Daniel Wilson
    ('550e8400-e29b-41d4-a716-446655440012', 2, '09:00:00', '17:00:00', TRUE, 6, 15), -- Tuesday
    ('550e8400-e29b-41d4-a716-446655440012', 4, '09:00:00', '17:00:00', TRUE, 6, 15), -- Thursday

    -- Olivia Taylor
    ('550e8400-e29b-41d4-a716-446655440013', 1, '08:00:00', '16:00:00', TRUE, 6, 15), -- Monday
    ('550e8400-e29b-41d4-a716-446655440013', 3, '08:00:00', '16:00:00', TRUE, 6, 15), -- Wednesday
    ('550e8400-e29b-41d4-a716-446655440013', 5, '08:00:00', '16:00:00', TRUE, 6, 15), -- Friday

    -- James Martinez
    ('550e8400-e29b-41d4-a716-446655440014', 2, '09:00:00', '17:00:00', TRUE, 7, 10), -- Tuesday
    ('550e8400-e29b-41d4-a716-446655440014', 4, '09:00:00', '17:00:00', TRUE, 7, 10), -- Thursday

    -- Ava Anderson
    ('550e8400-e29b-41d4-a716-446655440015', 1, '09:00:00', '18:00:00', TRUE, 6, 30), -- Monday
    ('550e8400-e29b-41d4-a716-446655440015', 3, '09:00:00', '18:00:00', TRUE, 6, 30); -- Wednesday

-- Re-add the foreign key constraint
ALTER TABLE public.user_profiles
ADD CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
```