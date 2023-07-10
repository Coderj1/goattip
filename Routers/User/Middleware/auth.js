const express = require('express')
const router = express.Router()
const jwt  = require('jsonwebtoken')
const User = require('../models/SignUpmodels')

router.post('/login', async (req,res)  => {
    const  { email, password } = req.body  
    
          const user = await User.findOne({email: email})
            if(user) {
                if (password === user.password ) {

                    const secretKey = process.env.JWTPRIVATEKEY
                    
                    const payload = {email: email}

                    const token = jwt.sign(payload, secretKey, { expiresIn: '4h' })
                      res.status(200).json({message: "User Logged In" , user, token})                
                }else{
                    res.status(400).json({message: "Password Incorrect"})
                }
            }else{
                res.status(401).json({message:"User Doesnot Exist"})
            }
})

router.post('/forgot', async (req,res)  => {
            const  { email, password, cpassword } = req.body  
              const user = await User.findOne({email: email})
                if(user) {
                  if(password === cpassword){
                    
                  const fetch = await User.findOneAndUpdate({password})
                  if(!fetch){
                    return res.status(400).json({msg:'Change failed.....'})
                  }
                  res.status(200).json(fetch)               
                }     
              }else{
                res.status(401).json({message:"User Doesnot Exist"})
              }
})

router.get('/profil', async (req, res, next)  => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token){
        return res.status(401).json({msg: 'Unauthorized'})
    } 
    else{
      try {
        const secretKey = process.env.JWTPRIVATEKEY

        const payload = jwt.verify(token, secretKey)

        const profile = await User.findOne({email: payload.email})

        if(profile) {
          res.status(401).json({msg: 'User not found'})
        }else{
          res.status(200).json(profile)
        }
        next()
      } catch (errr) {
        res.status(401).json({message:'Loading..................'})       
      }
    }
  })
module.exports = router;