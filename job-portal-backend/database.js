const express = require("express");
var cors = require('cors')
const mysql = require("mysql2");


// Create an instance of Express
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors())
// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "abc123456", 
  database: "job_portal",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Admin Operations

// Add a new job listing
app.post("/admin/add-job", (req, res) => {
    const { title, description, location, salary, contact_email } = req.body;
  
    if (!title || !description || !location || !salary || !contact_email) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    const query = `INSERT INTO jobs (title, description, location, salary, contact_email) VALUES (?, ?, ?, ?, ?) `;
    db.query(query, [title, description, location, salary, contact_email], (err, results) => {
      if (err) {
        console.error("Error adding job:", err);
        return res.status(500).json({ error: "Error adding job" });
      }
      res.status(201).json({ message: "Job added successfully", jobId: results.insertId });
    });
  });
  

// List all job listings
app.get("/admin/jobs", (req, res) => {
  const query = "SELECT * FROM jobs";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).send("Error fetching jobs");
    }
    res.json(results);
  });
});

// Candidate Operations

// Fetch available job listings
app.get("/jobs", (req, res) => {
  const query = "SELECT * FROM jobs";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).send("Error fetching jobs");
    }
    res.json(results);
  });
});

// Apply for a job
app.post("/apply", (req, res) => {
  const { candidate_name, contact, job_id } = req.body;

  const query = `
    INSERT INTO applications (candidate_name, contact, job_id)
    VALUES (?, ?, ?)
  `;
  db.query(query, [candidate_name, contact, job_id], (err, results) => {
    if (err) {
      console.error("Error applying for job:", err);
      return res.status(500).send("Error applying for job");
    }
    res.status(201).send("Application submitted successfully");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
