-- Create database
CREATE DATABASE IF NOT EXISTS job_portal;

USE job_portal;

-- Table to store job listings
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) ,
  description TEXT ,
  location VARCHAR(255) ,
  salary DECIMAL(10, 2) ,
  contact_email VARCHAR(255) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table to store applications
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_name VARCHAR(255) NOT NULL,
  contact VARCHAR(15) NOT NULL,
  job_id INT NOT NULL,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
