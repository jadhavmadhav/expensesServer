const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./db/db.config')
dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE;

connectDB(DB)

app.use(cors())
app.use(express.json())


const postSignUp = require('./routes/signUpRoute')
const postExpenses = require('./routes/ExpensesRoutes/expensesRoute')
const getExpenses = require('./routes/ExpensesRoutes/getRoute')
const postCatagoryMaster = require('./routes/master/postCatagory')
const getexpenseByUserId = require('./routes/ExpensesRoutes/getExpenseByUserId')
const getExpByUserIdAndExpType = require('./routes/ExpensesRoutes/getExpByUserIdAndExpType')
const getExpensesById = require('./routes/ExpensesRoutes/expenseById')

app.use('/api', postSignUp)
app.use('/api',postCatagoryMaster)

app.use('/api', postExpenses)
app.use('/api', getExpenses)
app.use('/api',getExpensesById)
app.use('/api',getexpenseByUserId)
app.use('/api',getExpByUserIdAndExpType)

app.listen(5000, () => {
     console.log('conection 5000')
})