

const express = require('express')
const getExpenseByUserId = require('../../controller/Expenses/getExpenseByUserId')

const router = express.Router()


router.get('/expenses/:userId',getExpenseByUserId)

module.exports = router