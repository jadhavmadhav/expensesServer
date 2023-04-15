

const express = require('express')
const { postPayMethodController, getAllPayMethodController } = require('../controller/payMethod/payMethod')


const postPayMethod= express.Router()
const getAllPayMethod = express.Router()

postPayMethod.post('/paymentMethod',postPayMethodController)

getAllPayMethod.get('/paymentMethod', getAllPayMethodController)


module.exports={postPayMethod, getAllPayMethod}