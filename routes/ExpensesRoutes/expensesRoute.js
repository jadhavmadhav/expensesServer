
const express =require('express')
const postExpenses = require('../../controller/Expenses/postExpenses')

const router = express.Router()

router.post('/expenses',postExpenses)

module.exports=router