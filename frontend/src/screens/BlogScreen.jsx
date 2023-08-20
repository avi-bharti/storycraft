import { useParams } from "react-router-dom";
import { useGetPostDetailsQuery } from "../slices/blogApiSlice";

const BlogScreen = () => {
   const {slug} = useParams();
   const {data:post, isLoading,error} = useGetPostDetailsQuery(slug);
   
   return (  
      <>
         {isLoading ? <h2>Loading</h2> : error ? <h2>{error?.data?.message}</h2> : <>
            <h2>{post.title}</h2>
            <p className="post-details"><pre>{post.post}</pre></p>
         </>}
      </>
   );
}
 
export default BlogScreen;