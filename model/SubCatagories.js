const { default: mongoose } = require("mongoose");


const subCatagoriesSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    catagoryId: {
        type: String,
        required: true
    },
    subCatagory: {
        type: String,
        required: true
    }
})

const subCatagoriesModel = mongoose.model('subcatagorie', subCatagoriesSchema)

module.exports = subCatagoriesModel