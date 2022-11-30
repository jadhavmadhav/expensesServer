
const express = require('express')
const getExpenses = require('../../controller/Expenses/getExpenses')

const router = express.Router()
router.get('/expenses',getExpenses)

module.exports=router