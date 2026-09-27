USE research_portal;

INSERT INTO opportunities
(research_title, research_description, research_area, faculty_name,
 department, required_skills, available_positions,
 application_deadline, status)
VALUES
(
    'AI-Based Medical Diagnosis',
    'Research project focused on machine learning for medical diagnosis.',
    'Artificial Intelligence',
    'Dr. Ahmed Khan',
    'Computer Science',
    'Python, Machine Learning, Deep Learning',
    3,
    '2026-12-15',
    'Open'
),
(
    'Computer Vision for Agriculture',
    'Research on image processing and computer vision for crop monitoring.',
    'Computer Vision',
    'Dr. Sara Ali',
    'Artificial Intelligence',
    'Python, OpenCV, CNN',
    2,
    '2026-11-30',
    'Open'
),
(
    'Natural Language Processing',
    'Research project involving text classification and language models.',
    'NLP',
    'Dr. Bilal Ahmed',
    'Artificial Intelligence',
    'Python, NLP, Transformers',
    1,
    '2026-10-30',
    'Open'
);
