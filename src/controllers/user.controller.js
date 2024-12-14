import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js"
import {User} from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontedn
    //validation - not empy
    //check if user already exists
    //check for images, check for avatar
    //upload them to cloudinary
    //create user object
    //remove password and refresh token
    //check for user creation
    //return res

    const {fullName, email, username, password} = req.body;

    if(
        [fullName, email, username, password].some( (field) => field ?.trim() === "")
     ) {
        throw new ApiError (400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path
   console.log(avatarLocalPath, coverImageLocalPath)

   if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
   }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar) {
    throw new ApiError(400, "Avatar is required")
  }

 const user = await User.create( {
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

 const createduser = await User.findById(user._id)
 .select(
    "-password -refreshToken"
 )
 if(!createduser) {
    throw new ApiError(500, "Something Went Wrong while regitering the user")
 }

 return res.status(201).json(
    new ApiResponse(200, createduser, "User registered successfully")
 )


})

export {registerUser}