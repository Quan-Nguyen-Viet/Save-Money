const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  customerID:{
    type: String,
    required: true
  },
  detail:{
    type: String,
    default: ""
  }
})

module.exports = mongoose.model('History', historySchema)