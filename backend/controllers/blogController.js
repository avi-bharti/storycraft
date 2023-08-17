import Blog from "../models/blogModel.js";

const listBlogs = async (req,res) => {
   const blogs = await Blog.find();
   res.status(200).json(blogs)
}

const saveBlog = async (req,res) => {
   const {title,slug,description,post,tags} = req.body;
   const blog = await Blog.create({title,slug,description,post,tags});
   if(blog){
      res.status(201).json({msg:"blog Savved"})
   }else{
      res.status(400).json({msg:"invalid data"})

   }
}

export {
   listBlogs,
   saveBlog
}