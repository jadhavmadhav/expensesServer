

const express = require('express')
const { postCatagoryController, getAllCatagoriesController, getCatagoiesByExpenseId } = require('../controller/catagory/Catagory')

const postCatagory = express.Router()
const getAllCatagories = express.Router()
const getCatagoriesByExpenseType = express.Router()

postCatagory.post('/catagory',postCatagoryController)
getAllCatagories.get('/catagories',getAllCatagoriesController)
getCatagoriesByExpenseType.get('/catagories/:expenseId',getCatagoiesByExpenseId)

module.exports={postCatagory,getAllCatagories,getCatagoriesByExpenseType}