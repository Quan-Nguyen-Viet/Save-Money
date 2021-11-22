const Savings = require('../models/savingModel')
const Customers = require('../models/customerModel')

const growthInterest = async (id, balance, interestRate) => {
  await Customers.findByIdAndUpdate({_id: id},{
    
  })
}