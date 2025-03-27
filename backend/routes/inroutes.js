const express = require("express");
const connection = require("../models/db");  // Import the database connection
const router = express.Router();

// POST a new job
router.post("/employer/jobs", (req, res) => {
  const { title, description, location, company, userId } = req.body;

  const query = `
    INSERT INTO jobs (title, description, location, company, user_id)
    VALUES (?, ?, ?, ?, ?);
  `;

  connection.query(query, [title, description, location, company, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error posting job" });
    }
    res.status(201).json({ message: "Job posted successfully", jobId: results.insertId });
  });
});



// GET all jobs posted by an employer
router.get("/employer/jobs", (req, res) => {
  const userId = req.user.user_id;  // assuming employer is authenticated and their ID is available

  const query = `
    SELECT * FROM jobs
    WHERE user_id = ?;
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching jobs" });
    }
    res.status(200).json(results);
  });
});

// GET all applications for jobs posted by an employer
router.get("/employer/applications", (req, res) => {
  const userId = req.user.user_id;  // assuming employer is authenticated and their ID is available

  const query = `
    SELECT a.*, j.title AS job_title, j.company AS job_company
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE j.user_id = ?;
  `;

  connection.query(query, [userId], (err, results) => {
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
  const userId = req.user.user_id;  // assuming employer is authenticated and their ID is available

  const query = `
    UPDATE users
    SET name = ?, email = ?, contact = ?, company = ?
    WHERE id = ? AND usertype = 'employer';
  `;

  connection.query(query, [name, email, contact, company, userId], (err, results) => {
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
