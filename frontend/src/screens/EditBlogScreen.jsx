import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdatePostMutation, useGetPostDetailsQuery } from "../slices/blogApiSlice";

const EditBlogScreen = () => {
   const {slug:postSlug} = useParams();

   const [title, setTitle] = useState('');
   const [blogId, setBlogId] = useState('');
   const [slug, setSlug] = useState('');
   const [description, setDescription] = useState('');
   const [post, setPost] = useState('');
   const [tags, setTags] = useState('');

   const {data:blog,refetch, isLoading,error} = useGetPostDetailsQuery(postSlug);

   const navigate = useNavigate();

   const [updatdblog, {isLoading:isUpdating}] = useUpdatePostMutation();

   useEffect(() => {
      if(blog){
         setTitle(blog.title)
         setSlug(blog.slug)
         setDescription(blog.description);
         setTags(blog.tags)
         setPost(blog.post);
         setBlogId(blog._id);
      }
   },[blog])

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await updatdblog({blogId,title,slug,description,post,tags});
         refetch();
         navigate('/')
      } catch (error) {
         alert(error?.data?.message || error.message)
      }
   }

   const checkSlug = (e) => {
      if(slug === ''){
         setSlug(title.replaceAll(' ', '_'))
      }
   }

   return (  
      <>

         {isUpdating && <h2>Updating</h2>}
         {isLoading && <h2>Processing</h2>}
         {error && <h2>Error</h2>}
         <div className="form">
         <h1>Edit Blog</h1>
         <div className="form-group">
            <div className="form-lable">Title</div>
            <input type="text" onKeyUp={checkSlug} value={title} onChange={(e) => setTitle(e.target.value)} className="title form-field" />
         </div>
         <div className="form-group">
            <div className="form-lable">slug</div>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="slug form-field" />
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
         </div>
      </>
   );
}
 
export default EditBlogScreen;