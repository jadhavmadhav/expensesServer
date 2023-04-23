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

const putExpenses = async (req, res) => {
    const id = req.params.id
    console.log(id)

    try {
        const result = await expensesModel.updateOne({ id }, {
            $set: {
                ...req.body
            }
        })

        res.json({
            status: 200,
            message: "expenses updated successfully !",

        })
    } catch (error) {
        console.log(error.message)
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
        res.json({
            message: result.errors.properties.path
        })
    }
}


const getWeeklyExpenses = async (req, res) => {

    const curr = new Date()
    const month = curr.getMonth()
    const year = curr.getFullYear()
    const date = curr.getDate()
    const todayDate = moment(curr).format("YYYY-MM-DD")
    const firstDateOfMonth = moment(new Date(year, month, 1)).format("YYYY-MM-DD")
    const lastDateOfMonth = moment(new Date(year, month + 1, 0)).format("YYYY-MM-DD")
    const firstDateOfYear = moment(new Date(year, 0, 1)).format("YYYY-MM-DD")
    const lastDateOfYear = moment(new Date(year + 1, 0, 0)).format("YYYY-MM-DD")

    let first = curr.getDate() - curr.getDay()
    let last = first + 6

    let startDateOfWeek = moment(new Date(curr.setDate(first)).toLocaleString()).format("YYYY-MM-DD")
    let lastDateOfWeek = moment(new Date(curr.setDate(last)).toLocaleString()).format("YYYY-MM-DD")

    try {

        const today = await expensesModel.aggregate([
            {
                $match: { createdDate: todayDate }
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

        const thisWeek = await expensesModel.aggregate([
            {
                $match: {
                    createdDate: { $gte: startDateOfWeek, $lt: lastDateOfWeek }
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
        const thisMonth = await expensesModel.aggregate([
            {
                $match: {
                    createdDate: { $gte: firstDateOfMonth, $lt: lastDateOfMonth }
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

        const thisYear = await expensesModel.aggregate([
            {
                $match: {
                    createdDate: { $gte: firstDateOfYear, $lt: lastDateOfYear }
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
        const AllTime = await expensesModel.aggregate([

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

        if (!(today.length || thisWeek.length || thisMonth.length || thisYear.length || AllTime.length)) {
            res.json({
                status: 200,
                message: `expenses is available from ${startDate} to ${lastDate} !`
            })
        } else {

            const ArraytoObj = (arr) => {
                let result = {}
                if (!arr.length) {
                    return { expense: { total: 0 }, income: { total: 0 } }
                }
                arr.forEach((element) => {
                    result[`${element.expenseType}`] = element
                })
                return result
            }

            const WeeksExpenses = ArraytoObj(thisWeek)
            const TodaysExpenses = ArraytoObj(today)
            const MonthExpenses = ArraytoObj(thisMonth)
            const YearExpenses = ArraytoObj(thisYear)
            const AllExpenses = ArraytoObj(AllTime)



            res.json({
                status: 200,
                message: ` get todays,weeks,months,all times expenses successfully  !`,
                result: {
                    today: {
                        todayDate,
                        balance: (TodaysExpenses.income ? TodaysExpenses.income.total : 0) - (TodaysExpenses.expense ? TodaysExpenses.expense.total : 0),
                        ...TodaysExpenses
                    },
                    thisWeek: {
                        startDateOfWeek,
                        lastDateOfWeek,
                        balance: (WeeksExpenses.income ? WeeksExpenses.income.total : 0) - (WeeksExpenses.expense ? WeeksExpenses.expense.total : 0),
                        ...WeeksExpenses,
                    },
                    thisMonth: {
                        firstDateOfMonth,
                        lastDateOfMonth,
                        balance: (MonthExpenses.income ? MonthExpenses.income.total : 0) - (MonthExpenses.expense ? MonthExpenses.expense.total : 0),
                        ...MonthExpenses,
                    },
                    thisYear: {
                        firstDateOfYear,
                        lastDateOfYear,
                        balance: (YearExpenses.income ? YearExpenses.income.total : 0) - (YearExpenses.expense ? YearExpenses.expense.total : 0),
                        ...YearExpenses,
                    },
                    allTime: {
                        balance: (AllExpenses.income ? AllExpenses.income.total : 0) - (AllExpenses.expense ? AllExpenses.expense.total : 0),
                        ...YearExpenses,
                    },
                }
            })
        }
    } catch (error) {
        res.json({
            message: result.errors.properties.path
        })
    }
}

const getTodaysExpenses = async (req, res) => {
    const curr = new Date()
    const today = moment(curr).format("YYYY-MM-DD")
    try {
        const result = await expensesModel.aggregate([
            {
                $match: { createdDate: today }
            }
        ])
        res.status(200).json({
            status: 200,
            message: "get Today Expenses Successfully !",
            result
        })
    } catch (error) {
        res.json({
            message: result.errors.properties.path
        })
    }
}



const getExpensByAnalyseController = async (req, res) => {
    const firstDate = req.query.from
    const lastDate = req.query.to
    const all = req.query.all
    let query = {}
    let message = ''

    try {
        if (firstDate && lastDate) {
            query.createdDate = { $gte: firstDate, $lte: lastDate }
            message = `get expenses analyses from ${firstDate} to ${lastDate}`
        }
        else if (all) {
            query = {}
            message = `get all expenses analyses `
        } else {
            throw new Error("plaese give currect end point")
        }
        const result = await expensesModel.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: "expensetypes",
                    localField: "expenseType",
                    foreignField: "id",
                    as: 'expense'
                }
            },
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
                $unwind: {
                    path: '$subcatagory',
                    preserveNullAndEmptyArrays: true
                }

            },
            {
                $addFields: { catagoryId: "$subcatagory.catagoryId" }
            },
            {
                $unwind: "$method"
            }, {
                $unwind: "$status"
            },

            {
                $lookup: {
                    from: "catagories",
                    localField: "catagoryId",
                    foreignField: "catagoryId",
                    as: "catagory"
                }
            },
            {
                $unwind: "$catagory"
            },
            {
                $set: {
                    type: "$expense.type",
                    paystatus: "$status.status",
                    paymethod: "$method.method",
                    subcatagory: "$subcatagory.subCatagory",
                    catagory: "$catagory.catagory"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "expenseType": 0,
                    "subCatagoryId": 0,
                    "catagoryId": 0,
                    "payMethodId": 0,
                    "payStatusId": 0,
                    "__v": 0,
                    "expense": 0,
                    "method": 0,
                    "status": 0

                }
            }
        ])

        res.status(200).json({
            status: 200,
            message,
            result
        })
    } catch (error) {
        res.json({
            message: result.errors.properties.path
        })
    }
}


const getPreviouse7DaysExpense = async (req, res) => {

    let curr = new Date()
    let date = curr.getDate()
    curr.setDate(date - 6)
    const startDate = moment(curr).format("YYYY-MM-DD")
    const lastDate = moment(new Date()).format("YYYY-MM-DD")



    try {
        const result = await expensesModel.aggregate([
            {
                $match: {
                    createdDate: { $gte: startDate, $lte: lastDate }
                }
            },
            {
                $lookup: {
                    from: "expensetypes",
                    localField: "expenseType",
                    foreignField: 'id',
                    as: 'expenses'
                }
            },
            {
                $unwind: "$expenses"
            },
            {
                $set: {
                    expense: "$expenses.type"
                }
            },

            {
                $group: {
                    _id: {
                        createdDate: "$createdDate",
                        expense: "$expense",
                        total: { $sum: "$amount" }
                    }

                },

            },
            {
                $set: {
                    expense: "$_id.expense",
                    total: "$_id.total",
                    createdDate: '$_id.createdDate'
                }
            },
            {
                $project: {
                    '__v': 0,
                    '_id': 0,
                    'expenseType': 0,
                    'subCatagoryId': 0,
                    'payMethodId': 0,
                    'payStatusId': 0,
                    'description': 0,
                    "expenses": 0,
                    "createdTime": 0,
                    '_id': 0

                }
            },  

        ])

        const income = result.filter(i => i.expense === "income")
        const expense = result.filter(i => i.expense === 'expense')

        const DateArray = []

        for (let i = 0; i < 7; i++) {
            let d = new Date()
            d.setDate(d.getDate() - i)
            DateArray.push({ createdDate: moment(d).format("YYYY-MM-DD"), total: 0 })
        }

        const fillEmptydata = (array) => {
            let result = DateArray.concat(array)
            return [...new Map(result.map(i => [i.createdDate, i])).values()]

        }
        let IncomeResult = fillEmptydata(income)
        let ExpenseResult = fillEmptydata(expense)



        res.json({
            status: 200,
            message: `get previoue 7 days expenses amount for bar chart from ${startDate} to ${lastDate}`,
            result: { income: IncomeResult, expense: ExpenseResult }

        })
    } catch (error) {
        res.json({
            message: result.errors.properties.path
        })
    }
}
module.exports = {
    getAllExprensesController,
    postExpneseController,
    putExpenses,
    getWeeklyExpenses,
    getTodaysExpenses,
    getExpensByAnalyseController,
    getPreviouse7DaysExpense
} 
