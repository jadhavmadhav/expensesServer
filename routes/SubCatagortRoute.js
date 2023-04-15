

const express = require("express")
const { PostSubCatagoryController, getAllSubCatagoryController, getSubCatagoryByCatagoyController } = require("../controller/subCatagory/SubCatagory")

const PostSubCatagory = express.Router()
const getAllSubCatagory = express.Router()
const getSubCatagoryByCatagoryId = express.Router()


PostSubCatagory.post('/subcatagory',PostSubCatagoryController)
getAllSubCatagory.get('/subcatagories',getAllSubCatagoryController)
getSubCatagoryByCatagoryId.get('/subcatagory/:catagoryId' , getSubCatagoryByCatagoyController)


module.exports = {PostSubCatagory,getAllSubCatagory,getSubCatagoryByCatagoryId}