import { UserModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config'

export const getAllUser = async(req, res) =>{
  try{
    const users = await UserModel.find()
    res.json(users)
  } catch (err){
    return res.status(500).json({msg: err.message})
  }
}
export const register = async(req, res) =>{
  try {
    const {
      name,
      username, 
      email, 
      password,
      role,
      nationalid,
      gender,
      dob,
      phonenumber,
      address,
      passportid,
      nationality,
      creditcard,
      creditcardbrand,
      carddate
    } = req.body;

    
    const user = await UserModel.findOne({email})
    if(user) return res.status(400).json({msg: "The email already exists."})
    if(password.length < 6) 
        return res.status(400).json({msg: "Password is at least 6 characters long."})
    // Password Encryption
    const passwordHash = await bcrypt.hash(password, 10)
    if(!name) return res.status(400).json({msg: "Please enter your full name"})
    if(!username) return res.status(400).json({msg: "Please enter your user name"})
    if(!nationalid) return res.status(400).json({msg: "Please enter your id."})
    if(!gender) return res.status(400).json({msg: "Please choose your gender."})
    if(!dob) return res.status(400).json({msg: "Please enter your date of birth."})
    if(!phonenumber) return res.status(400).json({msg: "Please enter your phone number."})
    if(!address) return res.status(400).json({msg: "Please enter your address."})
    if(!passportid) return res.status(400).json({msg: "Please enter your your passport ID."})
    if(!dob) return res.status(400).json({msg: "Please enter your date of birth."})
    if(!nationality) return res.status(400).json({msg: "Please enter your nationality."})
    if(!creditcard) return res.status(400).json({msg: "Please enter your credit card number."})
    if(!creditcardbrand) return res.status(400).json({msg: "Please enter your credit card issuer."})
    const newUser = new UserModel({
        name,
        username, 
        email, 
        password: passwordHash, 
        role,
        nationalid,
        gender,
        dob,
        phonenumber,
        address,
        passportid,
        nationality,
        creditcard,
        creditcardbrand,
        carddate
    })

    // Save mongodb
    await newUser.save()

    
    res.json({msg: "Register success"})

} catch (err) {
    return res.status(500).json({msg: err.message})
}
}

export const login = async (req, res) => {
    try {
      const {email, password} = req.body;

      const user = await UserModel.findOne({email})
      if(!user) return res.status(400).json({msg: "User does not exist."})

      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

      const accesstoken = createAccessToken({id: user._id})
      const refreshtoken = createRefreshToken({id: user._id})

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 // 7d
      })
      await UserModel.findOneAndUpdate({email: email}, { jwt: accesstoken})
      res.json({accesstoken})

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

export const logout = async (req, res) =>{
  try {
    res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
    return res.json({msg: "Logged out"})
  } catch (error) {
    res.status(500).json({ error: err });
  }
}

export const refreshToken = (req, res) =>{
  try {
      const rf_token = req.cookies.refreshtoken;
      if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
          if(err) return res.status(400).json({msg: "Please Login or Register"})

          const accesstoken = createAccessToken({id: user.id})

          res.json({accesstoken})
      })

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
  
}
export const getUser = async (req, res) =>{
  try {
      const user = await UserModel.findById(req.user.id).select('-password')
      if(!user) return res.status(400).json({msg: "User does not exist."})

      res.json(user)
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

export const deleteUser = async (req, res) =>{
  try {
      const user = await UserModel.findByIdAndDelete(req.user.id)
      if(!user) return res.status(400).json({msg: "User does not exist."})

      res.json({msg: "Deleted user complete"})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

const createAccessToken = (user) =>{
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

const createRefreshToken = (user) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}