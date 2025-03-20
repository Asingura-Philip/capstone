const express = require('express')
const app = express()
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send('capstone')
})



app.listen(4040,()=>{
    console.log(`server running on port 4040`)
})