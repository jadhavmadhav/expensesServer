const catagoryModel = require("../../model/Catagory")


const postCatagoryController = async (req, res) => {
    let id = (await catagoryModel.find()).length + 1
    try {
        const result = new catagoryModel({
            catagoryId: id,
            expenseId: req.body.expenseId,
            catagory: req.body.catagory
        })

        result.save(result).then((re) => res.json({
            status: 200,
            message: "catagory successfully posted !"
        })).catch((err) => res.json({
            status: 401,
            message: err.message
        }))

    } catch (error) {
        res.json({
            message: result.errors.properties.path
        })
    }
}

const getAllCatagoriesController = async (req, res) => {
    try {
        const result = await catagoryModel.find()
        if (!result) {
            res.json({
                status: 400,
                message: ' catagories is not found !'
            })
        } else {
            res.json({
                status: 200,
                message: ' get all catagoies successfully !',
                result
            })
        }
    } catch (error) {
        res.json({
            message: result.errors.properties.path
        })
    }
}

const getCatagoiesByExpenseId = async (req, res) => {
    const expenseId = req.params.expenseId
    try {
        const result = await catagoryModel.find({ $match: { expenseId: expenseId } })
        if (!result) {
            res.json({
                status: 400,
                message: ' catagories is not found !'
            })
        } else {
            res.json({
                status: 200,
                message: ' get all catagoies successfully !',
                result
            })
        }
    } catch (error) {
        res.json({
            message: result.errors.properties.path
        })
    }
}

module.exports = { postCatagoryController, getAllCatagoriesController, getCatagoiesByExpenseId }