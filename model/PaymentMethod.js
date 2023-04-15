const { default: mongoose } = require("mongoose");


const paymentMethodSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    }

})

const paymentMethodModel = mongoose.model('paymethod', paymentMethodSchema)

module.exports = paymentMethodModel