const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  fullName:{
    type: String,
    required: true
  },
  dateOfBirth:{
    type: Date,
    required: true
  },
  nationalID:{
    type: Number,
    required: true
  },
  nationalIDGrantDate:{
    type: Date,
    required: true
  },
  nationalIDGrantPlace:{
    type: String,
    required: true
  },
  nationality:{
    type: String,
    required: true
  },
  passportID:{
    type: String,
    required: true
  },
  permanentAddress:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: Number,
    required: true
  },
  passWord:{
    type: String,
    required: true
  },
  signature:{
    type: Image,
    required: true
  },
  gender:{
    type: String,
    enum: ["male","female"]
  },
  bankingNumber:{
    type: String,
    required: true
  },
  balanced:{
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Customers', userSchema)