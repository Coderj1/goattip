const { date } = require('joi');
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  time:{
    type:String,
    required: true,
    maxlength:50
  },
  league:{
    type:String,
    required:true,
  },
  game:{
    type:String,
    required:true,
  },
  match:{
    type:String,
    required:true,
  },
  tip:{
    type:String,
    required:true,
  },
  score:{
    type:String,
  },
  date:{
    type:String,
    required:true,
  }
})


const Post= mongoose.model("Post", postSchema)
module.exports = Post;