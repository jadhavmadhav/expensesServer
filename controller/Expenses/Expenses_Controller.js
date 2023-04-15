const moment = require("moment")
const expensesModel = require("../../model/Expenses")

const getAllExprensesController = async (req, res) => {
    try {
        const result = await expensesModel.aggregate([
            {
                $lookup: {
                    from
                }
            }
        ])
        res.send(result)

    } catch (error) {
        console.log(error)
    }
}


const postExpneseController = async (req, res) => {

    let createdDate = moment(new Date()).format("YYYY-MM-DD")
    let createdTime = moment(new Date()).format("hh:mm:ss")


    const id = (await expensesModel.find()).length + 1
    try {
        const result = new expensesModel({
            id,
            expenseType: req.body.expenseType,
            subCatagoryId: req.body.subCatagoryId,
            payMethodId: req.body.payMethodId,
            payStatusId: req.body.payStatusId,
            amount: req.body.amount,
            createdDate,
            createdTime
        })
        result.save(result).then(() => res.json({
            status: 200,
            message: 'expense posted successfully !'
        })).catch((err) => {
            res.json({
                status: 400,
                message: err.message
            })
        })

    } catch (errors) {
        // console.log(errors.properties.path)

        res.json({
            message: result.errors.properties.path
        })

    }

}

module.exports = {
    getAllExprensesController, postExpneseController
} 
