

const express = require('express')
const getExpensesById = require('../../controller/Expenses/getExpensesById')

const router = express.Router()

router.get('/expenses/:Id',getExpensesById)

module.exports = router