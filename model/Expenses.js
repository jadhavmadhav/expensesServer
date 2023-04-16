const mongoose = require("mongoose");


const expensesSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },

  expenseType: {
    type: String,
    required: true
  },
  subCatagoryId: {
    type: String,
    required: true
  },
  payMethodId: {
    type: String,
    required: true
  },
  payStatusId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: { 
    type: String, 
  },
  createdDate: {
    type: String,
    required: true
  },
createdTime: {
    type: String,
    required: true
  }
})

const expensesModel = mongoose.model('expense', expensesSchema)

module.exports = expensesModel