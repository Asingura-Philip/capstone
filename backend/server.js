const express = require('express')
const app = express()
const connection = require('./models/db')
require('dotenv').config()

const jobs = require('./routes/jobroutes')


app.use('/',jobs)

app.get('/',(req,res)=>{
    res.send('capstone')
})





app.listen(4040,()=>{
    console.log(`server running on port 4040`)
})