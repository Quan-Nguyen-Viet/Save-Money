import mongoose from 'mongoose'

const historySchema = new mongoose.Schema({
  userid:{
    type: String,
    required: true
  },
  detail:{
    type: String,
    default: ""
  },
  name: {
    type: String,
    
  }
}, { timestamps: true }
)

export const HistoryModel = mongoose.model('History', historySchema)