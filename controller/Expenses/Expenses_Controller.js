const moment = require("moment")
const expensesModel = require("../../model/Expenses")



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
            description: req.body.description,
            createdDate,
            createdTime
        })
        result.save(result).then(() => res.json({
            status: 200,
            message: 'expense posted successfully !',
            result
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


const getAllExprensesController = async (req, res) => {
    let today = moment(new Date()).format("YYYY-MM-DD")
    try {
        const result = await expensesModel.aggregate([
            // {
            //     $match: {
            //         createdDate: { $gte:"2023-04-01",$lte: today }
            //     }
            // },
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

        if (!result.length) {
            res.json({
                status: 200,
                message: 'expenses is not available !'
            })
        } else {
            res.json({
                status: 200,
                message: `get successfully current week expenses, incomes and balance yet ${today} .`,
                result
            })
        }

    } catch (error) {
        console.log(error)
    }
}


const getWeeklyExpenses = async (req, res) => {

    const curr = new Date()
    let first = curr.getDate() - curr.getDay()
    let last = first + 6

    let firstDate = moment(new Date(curr.setDate(first)).toLocaleString()).format("YYYY-MM-DD")
    let lastDate = moment(new Date(curr.setDate(last)).toLocaleString()).format("YYYY-MM-DD")

    try {
        const result = await expensesModel.aggregate([
            {
                $match: {
                    createdDate: { $gte: firstDate, $lt: lastDate }
                }
            },
            {
                $group: {
                    _id: "$expenseType",
                    total: { $sum: "$amount" }
                }
            },
            {
                $lookup: {
                    from: "expensetypes",
                    localField: "_id",
                    foreignField: 'id',
                    as: 'expense'
                }
            },
            {
                $unwind: "$expense"
            },
            {
                $set: {
                    id: "$expense.id",
                    expenseType: "$expense.type",
                }
            },
            {
                $sort: {
                    expenseId: 1
                }
            },
            {
                $project: {
                    "_id": 0,
                    "expense": 0
                }
            }

        ])

        if (!result.length) {
            res.json({
                status: 200,
                message: `expenses is available from ${firstDate} to ${lastDate} !`
            })
        } else {
            let balance = result[0].total - result[1].total
            res.json({
                status: 200,
                message: ` get expenses successfully from ${firstDate} to ${lastDate} !`,
                result: { expense: result[0], income: result[1], balance }
            })
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllExprensesController,
    postExpneseController,
    getWeeklyExpenses
} 
