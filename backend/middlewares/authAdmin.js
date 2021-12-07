import { UserModel } from "../models/userModel.js";

export const authAdmin = async(req, res, next)=>{
  try{
    const user = await UserModel.findOne({ _id: req.user.id})
    if(user.role === 0)
      return res.status(400).json({msg: "Admin access denied"})
    
      next()
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}