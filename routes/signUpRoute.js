
const express =require('express')
const signUpController = require('../controller/login/signUpController')

const router=express.Router()

router.post('/signup',signUpController)

module.exports=router