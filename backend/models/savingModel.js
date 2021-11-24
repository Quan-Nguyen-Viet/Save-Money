const mongoose = require('mongoose')
const schedule = require('node-schedule')

const savingSchema = mongoose.Schema({
  balanced:{
    type: Number,
    required: true
  },
  duration:{
    type: Number,
    default: 0
  },
  cycles:{
    type: Number,
    default: 0
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
