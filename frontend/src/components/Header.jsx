import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../slices/authSlice';
import {useLogoutUserMutation} from '../slices/userApiSlice';

const Header = () => {
   const {userInfo} = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [logoutUser] = useLogoutUserMutation();
   const handleLogout = async () => {
      try {
         await logoutUser().unwrap();
         dispatch(logout())
         navigate('/')
      } catch (error) {
         alert(error.message)
      }
   }
   return (  
      <header>
         <div className="container header">

         <h1><Link to='/'>StoryCraft</Link></h1>
         <nav>
            <ul>
               {!userInfo ? (
                  <>
                     <li><Link to='/login'>Login</Link></li>
                     <li><Link to='/register'>Register</Link></li>
                  </>
               ) : (
                  <>
                     <li><Link to='/create'>Add a Post</Link></li>
                     <li><span onClick={handleLogout}>Logout</span></li>
                     <li><Link to='/mypost'>My Blogs</Link></li>
                  </>
               )}
               
               
            </ul>
         </nav>
         </div>

      </header>
   );
}
 
export default Header;