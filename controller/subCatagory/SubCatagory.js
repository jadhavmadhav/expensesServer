const subCatagoriesModel = require("../../model/SubCatagories")


const PostSubCatagoryController = async (req, res) => {
    const id = (await subCatagoriesModel.find()).length + 1
    try {
        const result = new subCatagoriesModel({
            id,
            catagoryId: req.body.catagoryId,
            subCatagory: req.body.subCatagory
        })
        result.save(result).then(() => res.json({
            status: 200,
            message: "sub catagory posted successfully !"
        }))
    } catch (error) {
        console.log(error)
        res.json({
            status: 404,
            message: error.message
        })
    }
}


const getAllSubCatagoryController = async (req, res) => {
    try {
        const result = await subCatagoriesModel.find()
        if (!result) {
            res.json({
                message: 'data is not found !'
            })
        }
        else {
            res.json({
                status: 200,
                message: 'get all sub catagories',
                result
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getSubCatagoryByCatagoyController = async (req, res) => {
    const catagoryId = req.params.catagoryId
    try {
        const result = await subCatagoriesModel.find({ $match: { catagoryId: catagoryId } })
        if(!result){
            res.json({
                status:404,
                message:'sub catagories is not found !'
            })
        }else{
            res.json({
                status:404,
                message:'get all sub catagories by catagory Id !',
                result
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    PostSubCatagoryController, getAllSubCatagoryController, getSubCatagoryByCatagoyController
}