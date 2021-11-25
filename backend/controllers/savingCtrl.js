const Savings = require('../models/savingModel')
const Customers = require('../models/customerModel')

const savingCtrl = {
  getSavingAccount: async (req, res) =>{
    const response = await Savings.find({ userID: req.Savings._id})
  },
  
  createSavingAccount: async(req, res) =>{},
  
  deleteSavingAccount: async(req, res) =>{},

  updateSavingAccount: async(req, res) =>{},

  getNonTermIR: async(req, res) =>{
    try {
      const userID = req.Savings._id
      const balance = req.Savings.balance
      const interestRate = req.Savings.interestRate
      const day = req.Savings.day
      const total = req.Savings.total
      await Customers.findByIdAndUpdate({_id: userID},{
        total: balance + (balance*(interestRate/360))*day
      })
      balance = total
      res.send(total)
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
      const total = async(userID, balance, interestRate) =>{
        await Savings.findByIdAndUpdate({_id: userID},{
          total: balance + balance*(interestRate+cycles*0.03)*(duration + duration*cycles)/360 
        })
      }
      balance = total
      res.send(total)
    } catch (err) {
      console.error(err)
    }
  }
  /*
  getNonTermIR: async(id, balance, interestRate) =>{
    await Customers.findByIdAndUpdate({_id: id},{
      getNonTermIR: (balance*(interestRate/360))
    })
  },
  get3MTermIR: async(id, balance, interestRate) =>{
    await Customers.findByIdAndUpdate({_id: id},{
      get3MTermIR: (balance*(interestRate/12)*3)
    })
  }*/
}

module.exports = savingCtrl

