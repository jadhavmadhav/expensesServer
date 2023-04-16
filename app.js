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

const { GetAllExpenses, PostExpense, currentWeekExpense } = require('./routes/ExpensesRoute')
const { PostStatusRoute, getAllPayStatus } = require('./routes/PayStatus')
const { postCatagory, getCatagoriesByExpenseType, getAllCatagories } = require('./routes/CatagoryRoute')
const { PostSubCatagory, getAllSubCatagory, getSubCatagoryByCatagoryId } = require('./routes/SubCatagortRoute')
const { postPayMethod, getAllPayMethod } = require('./routes/PaymentMethod')


app.use('/api', GetAllExpenses)
app.use('/api', PostExpense)
app.use('/api', currentWeekExpense)

app.use('/api', PostStatusRoute)
app.use('/api',getAllPayStatus)

app.use('/api',postPayMethod)
app.use('/api',getAllPayMethod)

app.use('/api', postCatagory)
app.use('/api',getAllCatagories)
app.use('/api',getCatagoriesByExpenseType)

app.use('/api', PostSubCatagory)
app.use('/api', getAllSubCatagory)
app.use('/api', getSubCatagoryByCatagoryId)

app.listen(5000, () => {
     console.log('conection 5000 ')
})