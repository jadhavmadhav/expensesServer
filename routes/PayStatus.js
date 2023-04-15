

const express = require('express') 
const { postPaymentStatus, getAllPayStatusController } = require('../controller/pystatus/PayStatus')


const PostStatusRoute = express.Router()
const getAllPayStatus = express.Router()

PostStatusRoute.post('/paystatus', postPaymentStatus)
getAllPayStatus.get('/paystatus',getAllPayStatusController)

module.exports = { PostStatusRoute,getAllPayStatus }