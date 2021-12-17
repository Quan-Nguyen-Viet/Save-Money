import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
  },
  username: {
      type: String,
      required: true
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
  nationalid: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    default: "none"
  },
  dob: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  passportid: {
    type: Number,
    required: true
  },
  nationality: {
    type: String
  },
  creditcard: {
    type: Number
  },
  creditcardbrand: {
    type: String
  },
  carddate: {
    type: String
  },
  balanced: {
    type: Number,
    default: 0
  },
  jwt: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
})

export const UserModel = mongoose.model('User', userSchema);