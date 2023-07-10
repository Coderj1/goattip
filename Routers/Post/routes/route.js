const express = require('express')
const router = express.Router()
const Post = require('../models/SignUpmodels')

// Register Detail (With the Post request Query)

router.post('/mypost', async (req, res) => {
  
  // try catch For validation and verification on Detail Registration
    try {
        const { date,time,league,game,match, tip,score } = req.body
        
          let post = new Post({ date,time,league,game,match, tip, score })
        post = await post.save()
        res.json(post)
        res.send("New Post added Sucessfully")
      } catch(e) {
      }
    })

    // Get statement Query (Fetch all data in DB)

router.get('/fetch', async (req, res) => {
  try {
    const fetch = await Post.find({})
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})


// Get statement Query (Fetch Specific data in DB)

router.get('/fetch/:game', async (req, res) => {
  try {
    const {game:Game} = req.params
    const fetch = await Post.findOne({game:Game})
  if(!fetch){
    return res.status(400).json({msg:'match Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

// Delete Statement Query (For a specific Data in DB)

router.delete('/delete/:match', async (req, res) => {
  try {
    const {match:Match} = req.params
    const fetch = await Post.findOneAndDelete({match:Match})
  if(!fetch){
    return res.status(400).json({msg:'match Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

//Update statement Query (For a Specific Dta in DB) 

router.patch('/patch/:match', async (req, res) => {
  try {
    const {match:Match} = req.params
    const fetch = await Post.findOneAndUpdate({match:Match}, req.body,{
      new:true, 
      runValidators:true,
    })
  if(!fetch){
    return res.status(400).json({msg:'match Doesnot Exist in DB'})
  }
    res.status(200).json(fetch)
  } catch (error) {
    res.status(500).json({error})
  }
})

    module.exports = router