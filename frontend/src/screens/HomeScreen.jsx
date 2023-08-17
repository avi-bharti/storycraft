import { useGetPostsQuery } from "../slices/blogApiSlice";

const HomeScreen = () => {
   const {data:blogs, isLoading} = useGetPostsQuery();
   return (  
      <>
      <h1>HomeScreen</h1>
      {isLoading ? <h3>Loading</h3> : <>
      {blogs.map((blog) => (
         <div key={blog._id}>
            <h1>{blog.title}</h1>
         </div>
      ))}
      </>}
      </>
   );
}
 
export default HomeScreen;