const express = require('express')
const router = express.Router()
const connection = require('../models/db')



// Route to fetch Job Seeker's Profile
router.get("/jobseeker/profile", (req, res) => {
    const seekerId = req.user.id; // Assuming you're using middleware for authentication
    connection.query("SELECT * FROM job_seekers WHERE seeker_id = ?", [seekerId], (err, result) => {
        if (err) return res.status(500).json({ error: "Error fetching profile" });
        res.json(result[0]);
    });
});

// Route to edit/update Job Seeker's Profile
router.put("/jobseeker/profile", (req, res) => {
    const { name, contact, field } = req.body;
    const seekerId = req.user.id; // Assuming you're using middleware for authentication
    connection.query(
        "UPDATE job_seekers SET fullname = ?, contact = ?, field = ? WHERE seeker_id = ?",
        [name, contact, field, seekerId],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error updating profile" });
            res.json({ message: "Profile updated successfully" });
        }
    );
});

// Route to search for available jobs
router.get("/jobs", (req, res) => {
    connection.query("SELECT * FROM jobs", (err, result) => {
        if (err) return res.status(500).json({ error: "Error fetching jobs" });
        res.json(result);
    });
});

// Route to apply for a job
router.post("/jobseeker/apply", (req, res) => {
    const { job_id, applicant_name, applicant_email } = req.body;
    connection.query(
        "INSERT INTO job_applications (job_id, applicant_name, applicant_email) VALUES (?, ?, ?)",
        [job_id, applicant_name, applicant_email],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error applying for job" });
            res.json({ message: "Application submitted successfully", application_id: result.insertId });
        }
    );
});

// Route to fetch job seeker's work experience
router.get("/jobseeker/work-experience", (req, res) => {
    const seekerId = req.user.id;
    connection.query("SELECT * FROM work_experience WHERE seeker_id = ?", [seekerId], (err, result) => {
        if (err) return res.status(500).json({ error: "Error fetching work experience" });
        res.json(result);
    });
});

// Route to add work experience
router.post("/jobseeker/work-experience", (req, res) => {
    const { jobTitle, company, startDate, endDate } = req.body;
    const seekerId = req.user.id;
    connection.query(
        "INSERT INTO work_experience (seeker_id, job_title, company, start_date, end_date) VALUES (?, ?, ?, ?, ?)",
        [seekerId, jobTitle, company, startDate, endDate],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error adding work experience" });
            res.json({ message: "Work experience added successfully" });
        }
    );
});


module.exports = router