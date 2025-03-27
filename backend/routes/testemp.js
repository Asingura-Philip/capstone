const express = require("express");
const connection = require("../models/db");  // Import the database connection
const router = express.Router();


router.post("/employer/jobs", (req, res) => {
    const { title, location, company ,user_id} = req.body;  // Removed description field
    const userId = req.user.user_id; // Use authenticated user's ID
  
    const query = `
      INSERT INTO jobs (title, location, company, user_id)
      VALUES (?, ?, ?, ?);
    `;
  
    connection.query(query, [title, location, company, userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error posting job" });
      }
      res.status(201).json({ message: "Job posted successfully", jobId: results.insertId });
    });
  });
  
  router.get("/employer/jobs", (req, res) => {
    const userId = req.user.user_id;  // Use authenticated user's ID
  
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
  
  router.get("/employer/applications", (req, res) => {
    const userId = req.user.user_id;  // Use authenticated user's ID
  
    const query = `
      SELECT a.*, j.title AS job_title, j.company AS job_company
      FROM applications a
      JOIN jobs j ON a.job_id = j.job_id
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
  
  router.put("/employer/profile", (req, res) => {
    const { fullname, email, contact, field } = req.body;
    const userId = req.user.user_id;  // Use authenticated user's ID
  
    const query = `
      UPDATE users
      SET fullname = ?, email = ?, contact = ?, field = ?
      WHERE user_id = ? AND userType = 'employer';
    `;
  
    connection.query(query, [fullname, email, contact, field, userId], (err, results) => {
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
  

module.exports = router