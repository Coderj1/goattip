const mongoose = require('mongoose')

const adminschema = new mongoose.Schema({
  admin:{
    type:String,
    required: true,
    maxlength:50
  },
  password:{
    type:String,
    required:true,
  }

})


const Admins = mongoose.model("Admin", adminschema)
module.exports = Admins;