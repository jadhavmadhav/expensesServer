const { default: mongoose } = require("mongoose");


const ExpensesSecha=mongoose.Schema({
     id:{
          type:String,
          required:true
     },
     type:{
          type:String,
          required:true
     }
})

const expenseType = mongoose.model('expensetype ',ExpensesSecha)

module.exports = expenseType