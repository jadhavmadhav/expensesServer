const { default: mongoose } = require("mongoose");


const ExpensesSecha=mongoose.Schema({
     expenseTypeId:{
          type:String,
          required:true
     },
     expensesType:{
          type:String,
          required:true
     }
})

const expenseType = mongoose.model('/expenses-type',ExpensesSecha)

module.exports = expenseType