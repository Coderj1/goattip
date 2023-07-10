/* const express = require('express')
const router = express.Router()
const User = require('../models/SignUpmodels')


router.get( async (req, res) => {
  try {
    const fetch = await User.find({})
    res.status(200).json({fetch})
  } catch (error) {
    res.status(500).json({error})
  }
})


module.exports = router
*/