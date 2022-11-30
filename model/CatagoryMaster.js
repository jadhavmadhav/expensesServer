const { default: mongoose } = require("mongoose");

 const CatagoryMaster_Schema=mongoose.Schema({
     catagoryId:{
          type:String,
          required:true
     },
     catagoryName:{
          type:String,
          required:true
     },
     expenseTypeId:{
          type:String,
          required:true
     }


 })

 const catagoryModel=mongoose.model('/catagory',CatagoryMaster_Schema)

 module.exports = catagoryModel