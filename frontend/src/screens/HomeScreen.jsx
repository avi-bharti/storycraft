import { useGetPostsQuery } from "../slices/blogApiSlice";
import {Link} from 'react-router-dom';
import { formatDate } from "../uitls/date";
const HomeScreen = () => {
   const {data:blogs, isLoading} = useGetPostsQuery({userOnly:'no'});
   return (  
      <>
      {isLoading ? <h3>Loading</h3> : <>
      {blogs.map((blog) => (
         <div key={blog._id} className="blog-box">
            <div>
            <h1 className="blog-title">{blog.title}</h1>
            <small>By {blog.author.name} on {formatDate(blog.createdAt)}</small>
            <p>{blog.description}</p>
            </div>
            <Link className="btn" to={`${blog.slug}`} >Read More</Link>
         </div>
      ))}
      </>}
      </>
   );
}
 
export default HomeScreen;