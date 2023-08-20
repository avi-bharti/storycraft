import Blog from "../models/blogModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const listBlogs = asyncHandler(async (req,res) => {
   const filter = req.query.userOnly === 'yes' ? {author: await getUserId(req,res)} : {};
   const blogs = await Blog.find({...filter}).populate('author', 'name');
   res.status(200).json(blogs)
})

const getPostDetails = asyncHandler(async (req,res) => {
   const slug = req.params.slug;
   const blog = await Blog.findOne({slug});
   res.status(200).json(blog);
})

const saveBlog = asyncHandler(async (req,res) => {
   const {title,slug,description,post,tags} = req.body;
   const author = req.user._id;
   const blog = await Blog.create({title,slug,description,post,tags,author});
   if(blog){
      res.status(201).json({message:"blog Savved"})
   }else{
      res.status(400).json({message:"invalid data"})

   }
})

const updateBlog = asyncHandler(async (req,res) => {
   const blogId = req.params.id;
   const {title,slug,description,post,tags} = req.body;

   const blog = await Blog.findById(blogId);
   if(blog){
      blog.title = title;
      blog.slug = slug;
      blog.description = description;
      blog.post = post;
      blog.tags = tags;

      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog)
   }else{
      res.status(400).json({message:"invalid data"})

   }
})

const deletePost = asyncHandler (async (req,res) => {
   const id = req.params.id;

   await Blog.findByIdAndDelete(id);
   res.status(200).json({message:'deleted successfully'});
})

const getUserId = async(req,res) => {
   let token = req.cookies.jwt;

   if(token){
      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         req.user =await User.findById(decoded.userId).select('-password')
         return req.user._id
      } catch (error) {
         res.status(401);
         throw new Error('Not authorized, token failed')
      }
   }else{
      res.status(401);
      throw new Error('Not authorized no token')
   }
}

export {
   listBlogs,
   saveBlog,
   getPostDetails,
   updateBlog,
   deletePost
}