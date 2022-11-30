const mongoose = require("mongoose");


const expensesSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  expensesId: {
    type: String,
    required: true
  },
  expensesType: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: String,
    required: true
  },
  day: {
    type: String
  },
  time: {
    type: String
  }
})

const expensesModel = mongoose.model('expense', expensesSchema)

module.exports = expensesModel