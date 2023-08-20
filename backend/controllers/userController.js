import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/jwt.js";

const registerUser = asyncHandler(async (req,res) => {
   const {name,email,password} = req.body;
   console.log(req.body);
   // res.json({"sda":"asdf"})

   const existsUser = await User.findOne({email});
   if(existsUser){
      res.status(400).json({msg:"user exists"})
   }else{
      const createdUser = await User.create({name,email,password});
      if(createdUser){
         generateToken(res, createdUser._id)
         res.status(201).json({
            _id:createdUser._id,
            name:createdUser.name,
            email:createdUser.email,
         });
      }else{
         res.status(400).json({msg:"Invalid data"})
      }
   }
})

const loginUser = asyncHandler(async (req,res) => {
   const {email,password} = req.body;

   const existsUser = await User.findOne({email});
   if(!existsUser){
      res.status(401).json({msg:"Invalid Data"})
   }else{
      if(await existsUser.matchPassword(password)){
         generateToken(res, existsUser._id)
         res.status(201).json({
            _id:existsUser._id,
            name:existsUser.name,
            email:existsUser.email,
         });
      }else{
         res.status(401).json({msg:"Invalid data"})
      }
   }
})

const logoutUser = asyncHandler(async (req,res) => {
   res.cookie('jwt','', {
      httpOnly:true,
      maxAge: new Date(0)
   })
   res.status(200).json({"msg":"logged out successfully"})
})

export {
   registerUser,
   loginUser,
   logoutUser
}