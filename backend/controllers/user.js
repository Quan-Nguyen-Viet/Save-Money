import { UserModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';
import { HistoryModel } from "../models/historyModel.js"


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

export const deposit = async(req, res) => {
  try {
    const inputInfo = req.body;
    console.log('check req after middleware', req.user);
    if(typeof(inputInfo.moneyDeposit) != 'number') res.status(500).json({error: 'Lỗi Input'});
    const userInfo = await UserModel.findById(inputInfo._id);
    const newbalanced = inputInfo.moneyDeposit + userInfo.balanced;
    const userUpdate = await UserModel.findByIdAndUpdate(inputInfo._id, { balanced: newbalanced }, { new: true });
    const history = { //tạo history
      userid: userUpdate._id,
      name: userUpdate.name,
      detail: `Bạn đã nạp ${inputInfo.moneyDeposit} VND vào tài khoản, số dư hiện tại của bạn là ${newbalanced} VND`
  }
  const saveHistory = new HistoryModel(history);
  await saveHistory.save(); //save history
    

    res.status(200).json(userUpdate);
    
  } catch (err) {
    res.status(500).json({error: err});
  }
}

export const withdraw = async(req, res) => {
  try {
    const inputInfo = req.body;
    if(typeof(inputInfo.moneyWithdraw) != 'number') res.status(500).json({error: 'Lỗi Input'});
    if(inputInfo.moneyWithdraw < 0) res.status(500).json({error: 'Lỗi Input'}); //tránh trường hợp bug số âm
    const userInfo = await UserModel.findById(inputInfo._id);
    const newbalanced =  userInfo.balanced - inputInfo.moneyWithdraw;
    if (newbalanced < 0) return res.status(500).json({error: 'Số dư không đủ'});
    const userUpdate = await UserModel.findByIdAndUpdate(inputInfo._id, { balanced: newbalanced }, { new: true });

    const history = { //tạo history
      userid: userInfo._id,
      name: userInfo.name,
      detail: `Bạn đã rút ${inputInfo.moneyWithdraw} VND, số dư hiện tại của bạn là ${newbalanced} VND`
  }
  const saveHistory = new HistoryModel(history);
  await saveHistory.save(); //save history
    

    res.status(200).json(userUpdate);
    
  } catch (err) {
    res.status(500).json({error: err});
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
      const ruser = await UserModel.findOne({email}).select("-password")
      res.json({accesstoken, ruser})
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
      const user = await UserModel.findById(req.params.id).select('-password')
      if(!user) return res.status(400).json({msg: "User does not exist."})

      res.json(user)
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

export const deleteUser = async (req, res) =>{
  try {
      await UserModel.findByIdAndDelete(req.params.id)

      res.json({msg: "Delete user complete"})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

export const updateUser = async (req, res) =>{
  try {
    
    const inputInfo = req.body;
    const passwordHash = await bcrypt.hash(inputInfo.password, 10)
    const userUpdate = await UserModel.findOneAndUpdate({_id: req.params.id}, {
        name: inputInfo.name,
        username: inputInfo.username, 
        email: inputInfo.email,
        password: passwordHash,
        role: inputInfo.role,
        nationalid: inputInfo.nationalid,
        gender: inputInfo.gender,
        dob: inputInfo.dob,
        phonenumber: inputInfo.phonenumber,
        address: inputInfo.phonenumber,
        passportid: inputInfo.passportid,
        nationality: inputInfo.nationality,
        creditcard: inputInfo.creditcard,
        creditcardbrand: inputInfo.creditcardbrand,
        carddate: inputInfo.carddate
    }, { new: true })


    res.json({msg: "Update user complete", userUpdate})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

const createAccessToken = (user) =>{
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'})
}

const createRefreshToken = (user) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}