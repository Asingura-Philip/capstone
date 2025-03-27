const express = require('express')
const router = express.Router()
const connection = require('../models/db')

// // Route to fetch Employer's Profile
// router.get("/employer/profile", (req, res) => {
//     const employerId = req.user.id; // Assuming you're using middleware for authentication
//     // Fetch employer profile from database
//     connection.query("SELECT * FROM employers WHERE employer_id = ?", [employerId], (err, result) => {
//         if (err) return res.status(500).json({ error: "Error fetching profile" });
//         res.json(result[0]);
//     });
// });

// // Route to edit/update Employer's Profile
// router.put("/employer/profile", (req, res) => {
//     const { name, contact, company_name } = req.body;
//     const employerId = req.user.id; // Assuming you're using middleware for authentication
//     connection.query(
//         "UPDATE employers SET fullname = ?, contact = ?, company_name = ? WHERE employer_id = ?",
//         [name, contact, company_name, employerId],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: "Error updating profile" });
//             res.json({ message: "Profile updated successfully" });
//         }
//     );
// });

// // Route to post a job
// router.post("/employer/jobs", (req, res) => {
//     const { title, description, location, company } = req.body;
//     const employerId = req.user.id; // Assuming you're using middleware for authentication
//     connection.query(
//         "INSERT INTO jobs (employer_id, title, description, location, company) VALUES (?, ?, ?, ?, ?)",
//         [employerId, title, description, location, company],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: "Error posting job" });
//             res.json({ message: "Job posted successfully", job_id: result.insertId });
//         }
//     );
// });

// // Route to fetch all job applications for the employer
// router.get("/employer/applications", (req, res) => {
//     const employerId = req.user.id;
//     connection.query(
//         "SELECT * FROM job_applications WHERE job_id IN (SELECT job_id FROM jobs WHERE employer_id = ?)",
//         [employerId],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: "Error fetching applications" });
//             res.json(result);
//         }
//     );
// });





// Route to fetch Employer's Profile (without authentication)
router.get("/employer/profile/:employerId", (req, res) => {
    const employerId = req.params.employerId; // Get employerId from URL parameters
    connection.query("SELECT * FROM employers WHERE employer_id = ?", [employerId], (err, result) => {
        if (err) return res.status(500).json({ error: "Error fetching profile" });
        if (result.length === 0) return res.status(404).json({error: "Employer not found"})
        res.json(result[0]);
    });
});

// Route to edit/update Employer's Profile (without authentication - use with caution!)
router.put("/employer/profile/:employerId", (req, res) => {
    const { name, contact, company_name } = req.body;
    const employerId = req.params.employerId; // Get employerId from URL parameters
    connection.query(
        "UPDATE employers SET fullname = ?, contact = ?, company_name = ? WHERE employer_id = ?",
        [name, contact, company_name, employerId],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error updating profile" });
            res.json({ message: "Profile updated successfully" });
        }
    );
});

// Route to post a job (without authentication - use with caution!)
router.post("/employer/jobs/:employerId", (req, res) => {
    const { title, description, location, company } = req.body;
    const employerId = req.params.employerId; // Get employerId from URL parameters
    connection.query(
        "INSERT INTO jobs (employer_id, title, description, location, company) VALUES (?, ?, ?, ?, ?)",
        [employerId, title, description, location, company],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error posting job" });
            res.json({ message: "Job posted successfully", job_id: result.insertId });
        }
    );
});

// Route to fetch all job applications for the employer (without authentication)
router.get("/employer/applications/:employerId", (req, res) => {
    const employerId = req.params.employerId;
    connection.query(
        "SELECT * FROM job_applications WHERE job_id IN (SELECT job_id FROM jobs WHERE employer_id = ?)",
        [employerId],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error fetching applications" });
            res.json(result);
        }
    );
});

module.exports = router;


module.exports = router