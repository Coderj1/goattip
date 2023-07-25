const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  
  username:{
    type:String,
    required: true,
    maxlength:50
  },
  email:{
    type:String,
    required: true,
    maxlength:50
  },
  contact:{
    type:String,
    required: true,
    maxlength:50
  },
  password:{
    type:String,
    required:true
  }
 
});
const User = mongoose.model("User", UserSchema)
module.exports = User;