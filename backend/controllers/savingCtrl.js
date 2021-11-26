const Savings = require('../models/savingModel')
const Customers = require('../models/customerModel')
const schedule = require('node-schedule')

const savingCtrl = {
  getSavingAccount: async (req, res) =>{
    try {
      const response = await Savings.find({ userId: req.user._id})

    if (!response) {
      return res.status(400).json({
        message: 'Unable to find your account'
      })
    }

    res.send(response)
    } catch (err) {
      console.error(err)
    }
  },
  
  createSavingAccount: async(req, res) =>{},
  
  deleteSavingAccount: async(req, res) =>{},

  updateSavingAccount: async(req, res) =>{},

  getNonTermIR: async(req, res) =>{
    try {
      const userID = req.Savings._id
      const balance = req.Savings.balance
      const interestRate = req.Savings.interestRate
      const total = req.Savings.total
      const duration = req.Savings.duration
      await Savings.findByIdAndUpdate({_id: userID},{
        total = schedule.scheduledJobs('00 00 00 * * 0-6', ()=>{
          total = balance + (balance*(interestRate/360)*duration)
          balance = total
        })
      })
      res.json({msg: "updated"})
    } catch (err) {
      console.error(err)
    }
  },
  get3MTermIR: async(req, res) =>{
    try {
      const userID = req.Savings._id
      const balance = req.Savings.balance
      const interestRate = 0.035
      const cycles = req.Savings.cycles
      const duration = req.Savings.cycles
      const total = req.Savings.total
      await Savings.findByIdAndUpdate({_id: userID},{
        total = schedule.scheduledJobs('00 00 00 * * 0-6', ()=>{
          total = balance + balance*(0.035+cycles*0.03)*(duration + duration*cycles)/360
          balance = total
        })
      })
      res.json({msg: "updated"})
    } catch (err) {
      console.error(err)
    }
  }
  
}

module.exports = savingCtrl

