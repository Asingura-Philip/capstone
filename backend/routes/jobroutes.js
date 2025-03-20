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



module.exports = router