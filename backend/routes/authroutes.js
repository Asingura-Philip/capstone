const express = require ('express')
// const app = express()
const router = express.Router()
// const connection = require('../models/db')
// const bcrypt = require('bcrypt');

// router.get('/signup',(req,res)=>{
//     res.send('signup page')
// })

// router.post('/signup',(req,res)=>{
//     console.log(req.body)
//     const { fullname ,contact ,email ,field ,userType ,password } = req.body;

//     // Check if user already exists
//     connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Database error' });
//         }

//         if (results.length > 0) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert new user into the database
//         const sql ="INSERT INTO users (fullname,contact,email,field,userType,password) VALUES(?,?,?,?,?,?)"
//         const values = [
//             req.body.fullname,
//             req.body.contact,
//             req.body.email,
//             req.body.field,
//             req.body.userType,
//             hashedPassword
//         ]
//         connection.query(sql,values,(err,results)=>{
//             if(err){
//                 return res.json('error',err)
//             }
//             console.log(results)
//             return res.json(results)
//         })
//         // connection.query('INSERT INTO users (full_name ,contact ,email ,user_field ,user_type,password) VALUES (?, ?, ?,?,?,?)', 
//         // [fullname ,contact ,email ,field ,userType , hashedPassword], (err, result) => {
//         //     if (err) {
//         //         return res.status(500).json({ message: 'Database error' });
//         //     }

//         //     res.status(201).json({ message: 'User created successfully' });
//         // });
//     });

// })  

router.post('/signup',(req,res)=>{
    console.log(req.body)
})


module.exports = router