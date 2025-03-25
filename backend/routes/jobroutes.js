const express = require('express')
const router = express.Router()
const connection = require('../models/db')

router.get('/jobs',(req,res)=>{
    connection.query('SELECT * FROM jobs',(err,results)=>{
        if(err){
            console.log('error:',err)
            return res.status(500).send('database error')
        }
        res.json(results)
    })
})

router.get('/job-seeker-dashboard', (req, res) => {
    connection.query('SELECT * FROM jobs', (error, results) => {
        if (error) {
            console.error('Error fetching jobs:', error);
            res.status(500).json({ error: 'Failed to fetch jobs' });
            return;
        }
        res.json(results);
    });
});

router.get('/job/:id', (req, res) => {
    const jobId = parseInt(req.params.id);
    connection.query('SELECT * FROM jobs WHERE id = ?', [jobId], (error, results) => {
        if (error) {
            console.error('Error fetching job:', error);
            res.status(500).json({ error: 'Failed to fetch job' });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]); // Send the first (and only) result
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    });
});



router.post('/test',(req,res)=>{
    console.log(req.body)
})

module.exports = router