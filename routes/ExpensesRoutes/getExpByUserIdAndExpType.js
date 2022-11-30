

const express = require('express')
const getExpenseByUserIdAndExpensesType = require('../../controller/Expenses/getExpenseByUserIdAndExpensestype')
 

const router = express.Router()


router.get('/expenses/:userId/:expensesType',getExpenseByUserIdAndExpensesType)

module.exports = router