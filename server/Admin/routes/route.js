const express = require('express')
const router = express.Router()
const Admins = require('../models/SignUpmodels')

// Register Detail (With the Post request Query)

router.post('/admin', async (req, res) => {
  
  // try catch For validation and verification on Detail Registration
    try {
        const { admin, password } = req.body
        
        const existingpost = await Admins.findOne({ admin })
        
        if(existingpost) {
          return res.status(400).json({message: "Post already exist"})
        }else{
          let post = new Admins({ admin, password})
        post = await post.save()
        res.json(post)
        res.send("Sucessfully")
        }
      } catch(e) {
      }
    })

    // Get statement Query (Fetch all data in DB)

router.get('/fetch', async (req, res) => {
  try {
    const fetch = await Admins.find({})
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})


// Get statement Query (Fetch Specific data in DB)

router.get('/fetch/:admin', async (req, res) => {
  try {
    const {admin:Admin} = req.params
    const fetch = await Admins.findOne({admin:Admin})
  if(!fetch){
    return res.status(400).json({msg:'admin Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

// Delete Statement Query (For a specific Data in DB)

router.delete('/delete/:admin', async (req, res) => {
  try {
    const {admin:Admin} = req.params
    const fetch = await Admins.findOneAndDelete({admin:Admin})
  if(!fetch){
    return res.status(400).json({msg:'admin Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

//Update statement Query (For a Specific Dta in DB) 

router.patch('/patch/:admin', async (req, res) => {
  try {
    const {admin:Admin} = req.params
    const fetch = await Admins.findOneAndUpdate({admin:Admin}, req.body,{
      new:true, 
      runValidators:true,
    })
  if(!fetch){
    return res.status(400).json({msg:'admin Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

    module.exports = router