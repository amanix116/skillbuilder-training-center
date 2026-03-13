-- Create Training Center Database
-- This SQL file sets up the complete database schema for the Digital Training Center

-- Create Database
CREATE DATABASE IF NOT EXISTS training_center_db;
USE training_center_db;

-- Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration VARCHAR(50),
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  course_id INT,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
  INDEX idx_course (course_id),
  INDEX idx_email (email)
);

-- Trainers Table
CREATE TABLE IF NOT EXISTS trainers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  photo LONGTEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Insert Sample Admin (placeholder hashed password)
INSERT IGNORE INTO admins (email, password) VALUES 
('admin@trainingcenter.com', '$2a$10$xwr64iOWcyK/ZjmW90f13e6YdldCLz/94RL7ZwvpaY4Nve5IQ.3Pm');

-- Insert Sample Courses
INSERT IGNORE INTO courses (title, description, duration, price) VALUES
('Web Development Fundamentals', 'Learn the basics of HTML, CSS, and JavaScript to build responsive websites.', '8 weeks', 199.99),
('React.js Advanced', 'Master React hooks, state management, and modern frontend architecture.', '10 weeks', 249.99),
('Node.js & Express', 'Build scalable backend applications with Node.js and Express framework.', '8 weeks', 200.09),
('Full Stack Development', 'Complete journey from frontend to backend with real-world projects.', '16 weeks', 399.99),
('UI/UX Design Principles', 'Learn design fundamentals, wireframing, prototyping, and user research.', '6 weeks', 179.99);

-- Insert Sample Trainers
INSERT IGNORE INTO trainers (name, role, bio) VALUES
('John Smith', 'Senior Web Developer', 'Expert in full-stack web development with 10+ years experience'),
('Sarah Johnson', 'UI/UX Designer', 'Award-winning designer specializing in user-centered design'),
('Mike Wilson', 'DevOps Engineer', 'Cloud infrastructure and deployment specialist'),
('Emily Davis', 'Full Stack Developer', 'Passionate about building scalable web applications'),
('Alex Chen', 'Data Science Lead', 'Data scientist with expertise in machine learning');

-- Create Indexes for better query performance
CREATE INDEX idx_application_course ON applications(course_id);
CREATE INDEX idx_application_email ON applications(email);
CREATE INDEX idx_contact_email ON contacts(email);

-- Display confirmation
SELECT 'Database initialized successfully!' as status;
SELECT COUNT(*) as admin_count FROM admins;
SELECT COUNT(*) as course_count FROM courses;
SELECT COUNT(*) as trainer_count FROM trainers;
