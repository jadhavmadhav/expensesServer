const { default: mongoose } = require("mongoose");


const CatagorySchema = new mongoose.Schema({
    catagory: {
        type: String,
        required: true
    },
    catagoryId: {
        type: String,
        required: true
    },
    expenseId: {
        type: String,
        required: true
    }

})
 
const catagoryModel = mongoose.model('catagorie', CatagorySchema)

module.exports = catagoryModel