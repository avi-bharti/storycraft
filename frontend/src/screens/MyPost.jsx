import { useGetPostsQuery,useDeletePostMutation} from "../slices/blogApiSlice";
import { Link } from "react-router-dom";
import { formatDate } from "../uitls/date";

const MyPost = () => {
   const {data:blogs,refetch} = useGetPostsQuery({userOnly:'yes'});
   const [deletePost] = useDeletePostMutation();
   const handleDelete = async (postId) => {
      // e.preventDefault();
      if(window.confirm('Are you sure?')){
        await deletePost(postId);
        refetch();
      }
   }
   return ( 
      <>
         <h3 className="title">My Blogs</h3>
         <table className="table">
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Created on</th>
                  <th>Edited on</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
            {blogs && blogs.map((blog) => (
               <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.slug}</td>
                  <td>{formatDate(blog.createdAt)}</td>
                  <td>{formatDate(blog.updatedAt)}</td>
                  <td>
                     <Link className="btn btn-user" to={`/${blog.slug}`}>View</Link>
                     <Link className="btn btn-user" to={`/${blog.slug}/edit`}>Edit</Link>
                     <span className="btn btn-user" onClick={() => handleDelete(blog._id)}>Delete</span>
                  </td>
               </tr>
            ))}
            </tbody>
         </table>
      </>
   );
}
 
export default MyPost;