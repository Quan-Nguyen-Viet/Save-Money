import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  role: {
      type: Number,
      default: 0
  },
  nationalID: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    default: "none"
  },
  dob: {
    type: Date,
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
  },
  passportID: {
    type: Number,

  },
  nationality: {
    type: String,

  },
  balanced: {
    type: Number,
    default: 0
  },

}, {
  timestamps: true
})

export const UserModel = mongoose.model('User', userSchema);