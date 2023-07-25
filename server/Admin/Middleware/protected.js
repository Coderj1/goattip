const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/SignUpmodels')
const router = express.Router()

// Middleware function to authenticate token
router.get('/profile', async (req, res, next)  => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
      return res.status(401).json({msg: 'Unauthorized'})
  } 
  else{
    try {
      
      const secretKey = process.env.JWTPRIVATEKEY
      const decode = jwt.verify(token, secretKey)

      req.email = decode.email

      const userprof = await User.findOne({ email: req.email})

      if(!userprof) {
          return res.status(404).json({message: 'User not Found'})
      }
      return res.status(404).json(userprof)
    } catch (errr) {
      res.status(401).json({message:'Loading....................'})       
    }
  }
})
module.exports = router;