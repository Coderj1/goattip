const express = require('express')
const router = express.Router()
const jwt  = require('jsonwebtoken')
const Admins = require('../models/SignUpmodels')

router.post('/adminlogin', async (req,res)  => {
    const  { admin, password } = req.body  
    
          const Admin = await Admins.findOne({admin: admin})
            if(Admin) {
                if (password === Admin.password ) {

                    const secretKey = process.env.JWTPRIVATEKEY
                    
                    const payload = {admin: admin}

                    const token = jwt.sign(payload, secretKey, { expiresIn: '4h' })
                      res.status(200).json({message: "Admin Logged In" , Admin, token})                
                }else{
                    res.status(400).json({message: "Password Incorrect"})
                }
            }else{
                res.status(401).json({message:"Admin Doesnot Exist"})
            }
})
module.exports = router;