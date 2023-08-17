import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSavePostMutation } from "../slices/blogApiSlice";

const AddBlogScreen = () => {
   const [title, setTitle] = useState('');
   const [slug, setSlug] = useState('');
   const [description, setDescription] = useState('');
   const [post, setPost] = useState('');
   const [tags, setTags] = useState('');

   const navigate = useNavigate();

   const [blog, {isLoading}] = useSavePostMutation();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await blog({title,slug,description,post,tags}).unwrap();
         navigate('/')
      } catch (error) {
         alert(error?.data?.message || error.message)
      }
   }

   return (  
      <>
         <h1>Add a Blog</h1>
         {isLoading && <h2>Processing</h2>}
         <div className="form-group">
            <div className="form-lable">Title</div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-field" />
         </div>
         <div className="form-group">
            <div className="form-lable">slug</div>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="form-field" />
         </div>
         <div className="form-group">
            <div className="form-lable">Description</div>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-field" />
         </div>
         <div className="form-group">
            <div className="form-lable">Post</div>
            <textarea value={post} onChange={(e) => setPost(e.target.value)} className="form-field" />
         </div>
         <div className="form-group">
            <div className="form-lable">tags</div>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="form-field" />
         </div>
         <div className="form-group">
            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
         </div>
      </>
   );
}
 
export default AddBlogScreen;