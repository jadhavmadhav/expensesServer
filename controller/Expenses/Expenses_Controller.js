const moment = require("moment")
const expensesModel = require("../../model/Expenses")

const getAllExprensesController = async (req, res) => {
    try {
        const result = await expensesModel.aggregate([

            {
                $lookup: {
                    from: "subcatagories",
                    localField: "subCatagoryId",
                    foreignField: 'id',
                    as: 'subcatagory'
                }
            },
            {
                $lookup: {
                    from: "expensetypes",
                    localField: "expenseType",
                    foreignField: 'id',
                    as: 'expense'
                }
            },
            {
                $lookup: {
                    from: "paymethods",
                    localField: "payMethodId",
                    foreignField: 'id',
                    as: 'method'
                },
            },
            {
                $lookup: {
                    from: "paymentstatuses",
                    localField: "payStatusId",
                    foreignField: "id",
                    as: "status"
                }
            },
            {
                $unwind: "$expense"
            },
            {
                $unwind: '$subcatagory'
            },
            {
                $unwind: "$method"
            }, {
                $unwind: "$status"
            },
            {
                $project: {
                    "_id": 0,
                    "expenseType": 0,
                    "subCatagoryId": 0,
                    "payMethodId": 0,
                    "payStatusId": 0,
                    "__v": 0,
                    "expense._id": 0,
                    "expense.__v": 0,

                    "subcatagory._id": 0,
                    "subcatagory.__v": 0,

                    "method._id": 0,
                    "method.__v": 0,

                    "status._id": 0,
                    "status.__v": 0

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
