const { default: mongoose } = require("mongoose");


const paymentSchema = new mongoose.Schema({
id:{
    type:String,
    required:true
},

status:{
    type:String,
    required:true
}
})

const PaymetStatusModel=mongoose.model('paymentstatuse',paymentSchema)

module.exports = PaymetStatusModel