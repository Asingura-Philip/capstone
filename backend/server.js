const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const connection = require('./models/db')
require('dotenv').config()





app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const jobs = require('./routes/jobroutes')
const auth = require('./routes/authroutes')


app.use('/',jobs)
app.use('/',auth)
app.get('/',(req,res)=>{
    res.send('capstone')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });



app.listen(4040,()=>{
    console.log(`server running on port 4040`)
})