import { useEffect, useState } from "react";
import { useLoginUserMutation } from '../slices/userApiSlice';
import { setCredentials} from '../slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [login, {isLoading}] = useLoginUserMutation();

   const { userInfo } = useSelector((state) => state.auth);

   useEffect(() => {
      if(userInfo){
         navigate('/')
      }
   }, [navigate, userInfo])

   const handleSubmit = async(e) => {
      e.preventDefault();
      try {
         
         const res = await login({email,password}).unwrap()
         dispatch(setCredentials({...res}))
         navigate('/')
      } catch (error) {
         alert(error.error)
      }
   }
   return (  
      <>
         {isLoading && <h2>Loading...</h2>}
         <div className="form">
         <h1>Login </h1>
         <div className="form-group">
            <div className="form-lable">Email</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-field" />
         </div>
         <div className="form-group">
            <div className="form-lable">Password</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-field" />
         </div>
         <div className="form-group">
            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
         </div>
         </div>
      </>
   );
}
 
export default LoginScreen;