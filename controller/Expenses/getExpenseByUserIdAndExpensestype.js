const expensesModel = require("../../model/Expenses")


const getExpenseByUserIdAndExpensesType = async(req,res)=>{
    const userId = req.params.userId
    const expensesType = req.params.expensesType
     try {
          const expense = await expensesModel.aggregate([{$match:{userId:userId,expensesType:expensesType}}])
          res.send(expense)
     } catch (error) {
          console.log(error)
     }
}

module.exports = getExpenseByUserIdAndExpensesType