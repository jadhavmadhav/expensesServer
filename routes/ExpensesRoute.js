

const express = require('express')
const { getAllExprensesController, postExpneseController, getWeeklyExpenses, getExpensByAnalyseController, getPreviouse7DaysExpense, putExpenses } = require('../controller/Expenses/Expenses_Controller')


const GetAllExpenses = express.Router()
const PostExpense = express.Router()
const updateExpense= express.Router()
const currentWeekExpense = express.Router()
const todaysExpenses = express.Router()
const getExpensById = express.Router()
const getPrevious7BarChart = express.Router()

GetAllExpenses.get('/expenses', getAllExprensesController)


PostExpense.post('/expense', postExpneseController)
updateExpense.put('/expense/:id',putExpenses)
currentWeekExpense.get('/current-week', getWeeklyExpenses) 
getExpensById.get('/expense', getExpensByAnalyseController)
getPrevious7BarChart.get('/barchart', getPreviouse7DaysExpense)

module.exports = {
    GetAllExpenses,
    PostExpense,
    updateExpense,
    currentWeekExpense,
    todaysExpenses,
    getExpensById,
    getPrevious7BarChart
}
