const Savings = require('../models/savingModel')
const Customers = require('../models/customerModel')

const savingCtrl = {
  getSavingAccount: async (req, res) =>{},
  createSavingAccount: async(req, res) =>{},
  deleteSavingAccount: async(req, res) =>{},
  getNonTermIR: async(id, balance, interestRate) =>{
    await Customers.findByIdAndUpdate({_id: id},{
      getNonTermIR: (balance*(interestRate/360))
    })
  },
  get3MTermIR: async(id, balance, interestRate) =>{
    await Customers.findByIdAndUpdate({_id: id},{
      get3MTermIR: (balance*(interestRate/12)*3)
    })
  }
}

module.exports = savingCtrl

