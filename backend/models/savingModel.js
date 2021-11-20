const mongoose = require('mongoose')

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
})

module.exports = mongoose.model('Savings', savingSchema)