const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  userID:{
    type: String,
    required: true
  },
  detail:{
    type: String,
    default: ""
  }
})

export const HistoryModel = mongoose.model('History', historySchema)