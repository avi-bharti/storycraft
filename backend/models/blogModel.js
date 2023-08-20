import mongoose, { Mongoose } from "mongoose";

const blogSchema = mongoose.Schema({
   title:{
      type:String,
      required:true
   },
   slug:{
      type:String,
      required:true,
      unique:true
   },
   description:{
      type:String,
      required:true
   },
   post:{
      type:String,
      required:true
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'User'
   },
   tags: {
      type: String,
      required:true
   }
},{timestamps:true});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;