import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
dotenv.config({})


export const register = async (req,res)=>{
    try {
      // console.log("Body:", req.body);
      // console.log("File:", req.file);
      const { fullname, email, phoneNumber, password, role } = req.body;

      if (!fullname || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({
          message: "All fields are required",
          success: false,
        });
      }

      
      const file = req.file;
      if(!file){
        return res.status(400).json({
          message: "Profile photo is required",
          success: false,
        });
      }
      //uploading files to cloudinary
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader
        .upload(fileUri.content)
        .catch((error) => {
          console.log(error);
        });

      //console.log(cloudResponse);

      //to check if the user with same email exists already
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists with this email",
          success: false,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: {
          profilePhoto: cloudResponse.secure_url,
        },
      });

      return res.status(201).json({
        message: "Account created successfully",
        success: true,
      });
    }
    catch (error) {
        console.log(error)
    }
}

export const login = async (req,res) => {
    try {
        const {email,password,role} = req.body

        if (!email || !password || !role) {
          return res.status(400).json({
            message: "All fields are required",
            success: false,
          });
        }

        let user = await User.findOne({ email });

        if (!user) {
          return res.status(400).json({
            message: "Incorrect email or password",
            success: false,
          });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
              message: "Incorrect password",
              success: false,
            });
        }

        //checking if role is correct or not
        if(role !== user.role){
            return res.status(400).json({
              message: "Account doesn't exist with current role ",
              success: false,
            });
        }

        const tokenData ={
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn: '1d'});

        user = {
            _id : user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res
        .status(200)
        .cookie("token",token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite: 'strict'})
        .json({
            message: `Welcome ${user.fullname}`,
            user,
            success : true
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req,res) => {
    try {
        res
        .status(200)
        .cookie("token","",{maxAge:0})
        .json({
            message:"Logged out successfully",
            success: true
        })
    } 
    catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req,res) => {
  console.log(req.body)
    try {
      const {
        fullname,
        email,
        phoneNumber,
        bio,
        interests,
        age,
        gender,
        income,
        location,
      } = req.body;

      const file = req.file;

      if (!file) {
        return res.status(404).json({
          message: "Document is required",
          success: false,
        });
      }

      //uploading files to cloudinary
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader
        .upload(fileUri.content)
        .catch((error) => {
          console.log(error);
        })

        console.log(cloudResponse);
        

      //to convert interests from string to array format
      let interestsArray;
      if (interests) interestsArray = interests.split(",");

      const userId = req.id; //middleware authentication

      let user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }

      //updating user profile
      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (interests) user.profile.interests = interestsArray;
      if (age) user.profile.age = age;
      if (gender) user.profile.gender = gender;
      if (income) user.profile.income = income;
      if (location) user.profile.location = location;
      
      if (cloudResponse) 
        {user.profile.documents = cloudResponse.secure_url 
          user.profile.documentsOriginalName = file.originalname
        }
        
      await user.save();

      user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };
      return res.status(200).json({
        message: "Profile updated successfully",
        user,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
    
}