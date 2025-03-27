const express = require("express");
const connection = require("../models/db");  // Import the database connection
const router = express.Router();

// POST a new job
router.post("/employer/jobs", (req, res) => {
  const { title, company,location } = req.body;

  const query = `
    INSERT INTO jobs (title, company,location)
    VALUES (?, ?, ?);
  `;

  connection.query(query, [title, company,location], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error posting job" });
    }
    res.status(201).json({ message: "Job posted successfully", jobId: results.insertId });
  });
});

// GET all jobs posted by an employer
router.get("/employer/jobs", (req, res) => {
    const employerId = req.user.email;  // assuming employer is authenticated and their ID is available
  
    const query = `
      SELECT * FROM jobs
      WHERE email = ?;
    `;
  
    connection.query(query, [employerId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching jobs" });
      }
      res.status(200).json(results);
    });
  });

// GET all applications for jobs posted by an employer
router.get("/employer/applications", (req, res) => {
    const employerId = req.user.id;  // assuming employer is authenticated and their ID is available
  
    const query = `
      SELECT a.*, j.title AS job_title, j.company AS job_company
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE j.employer_id = ?;
    `;
  
    connection.query(query, [employerId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching applications" });
      }
      res.status(200).json(results);
    });
  });

// PUT - Edit employer profile
router.put("/employer/profile", (req, res) => {
    const { name, email, contact, company } = req.body;
    const employerId = req.user.id;  // assuming employer is authenticated and their ID is available
  
    const query = `
      UPDATE employers
      SET name = ?, email = ?, contact = ?, company = ?
      WHERE id = ?;
    `;
  
    connection.query(query, [name, email, contact, company, employerId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating profile" });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Employer not found" });
      }
  
      res.status(200).json({ message: "Profile updated successfully" });
    });
  });
  
  module.exports = router;
module.exports = router;
