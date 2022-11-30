

const express = require('express')
const postCatagory = require('../../controller/masters/postCatagory')

const router= express.Router()

router.post('/catagory',postCatagory)

module.exports = router