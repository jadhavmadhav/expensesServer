

const express = require('express')
const {getAllExprensesController, postExpneseController, getWeeklyExpenses} = require('../controller/Expenses/Expenses_Controller')
 

const GetAllExpenses = express.Router()
const PostExpense = express.Router()
const currentWeekExpense = express.Router()


GetAllExpenses.get('/expenses', getAllExprensesController)


PostExpense.post('/expense',postExpneseController)
currentWeekExpense.get('/current-week',getWeeklyExpenses)

module.exports = {GetAllExpenses,PostExpense,currentWeekExpense}
 