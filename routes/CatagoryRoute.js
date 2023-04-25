

const express = require('express')
const { postCatagoryController, getAllCatagoriesController, getCatagoiesByExpenseId } = require('../controller/catagory/Catagory')
const { getExpensesById } = require('../controller/Expenses/Expenses_Controller')

const postCatagory = express.Router()
const getAllCatagories = express.Router()
const getCatagoriesByExpenseType = express.Router()
const getExpenseById = express.Router()


postCatagory.post('/catagory', postCatagoryController)
getAllCatagories.get('/catagories', getAllCatagoriesController)
getCatagoriesByExpenseType.get('/catagories/:expenseId', getCatagoiesByExpenseId)
getExpenseById.get('/expense/:id', getExpensesById)

module.exports = { postCatagory, getAllCatagories, getCatagoriesByExpenseType, getExpenseById }