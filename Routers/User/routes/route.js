const express = require('express')
const router = express.Router()
const User = require('../models/SignUpmodels')

// Register Detail (With the Post request Query)

router.post('/register', async (req, res) => {
  

  // try catch For validation and verification on Detail Registration
    try {
        const { username, email, contact, password  } = req.body
        
        const existinguser = await User.findOne({email})
        
        if(existinguser) {
          return res.status(400).json({message: "Email already exist"})
        }
  
        let user = new User({ username, email, contact, password })
        user = await user.save()
        res.json({message: 'User Registerd',user})
        
        res.send("User Registered Sucessfully")
      } catch(e) {
      }
    })

    // Get statement Query (Fetch all data in DB)

router.get('/GetUser', async (req, res) => {
  try {
    const fetch = await User.find({})
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

// Get statement Query (Fetch Specific data in DB)

router.get('/fetch/:username', async (req, res) => {
  try {
    const {username:Username} = req.params
    const fetch = await User.findOne({username:Username})
  if(!fetch){
    return res.status(400).json({msg:'Field Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

// Delete Statement Query (For a specific Data in DB)

router.delete('/delete/:username', async (req, res) => {
  try {
    const {username:Username} = req.params
    const fetch = await User.findOneAndDelete({username:Username})
  if(!fetch){
    return res.status(400).json({msg:'User Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

//Update statement Query (For a Specific Dta in DB) 

router.patch('/patch/:username', async (req, res) => {
  try {
    const {username:Username} = req.params
    const fetch = await User.findOneAndUpdate({username:Username}, req.body,{
      new:true, 
      runValidators:true,
    })
  if(!fetch){
    return res.status(400).json({msg:'User Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

    module.exports = router