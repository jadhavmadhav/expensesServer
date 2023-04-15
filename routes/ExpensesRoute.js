

const express = require('express')
const {getAllExprensesController, postExpneseController} = require('../controller/Expenses/Expenses_Controller')
 

const GetAllExpenses = express.Router()

GetAllExpenses.get('/expenses', getAllExprensesController)

const PostExpense = express.Router()

PostExpense.post('/expense',postExpneseController)


module.exports = {GetAllExpenses,PostExpense}
 