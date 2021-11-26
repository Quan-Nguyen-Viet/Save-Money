const mongoose = require('mongoose')

const savingSchema = mongoose.Schema({
  balanced:{
    type: Number,
    required: true
  },
  duration:{
    type: Number,
    default: 0,
    required: true
  },
  cycles:{
    type: Number,
    default: 0,
    required: true
  },
  createdDate:{
    type: Date,
    default: Date.now
  },
  customerNID:{
    type: String,
    required: true
  },
  total:{
    type: Number,
    default: 0
  },
  interestRate:{
    type: Number,
    default: 0,
    required: true
  },
  durationEndDate:{
    durationEndDate: createdDate + duration + duration*cycles
  }
})

module.exports = mongoose.model('Savings', savingSchema)
