const expensesModel = require("../../model/Expenses")


const getExpenseByUserId= async(req,res)=>{
     // const userId="EUM1"
     const userId = req.params.userId 
     try {
         const expense= await  expensesModel.aggregate([{$match:{userId:userId}}])
         res.send(expense)
     } catch (error) {
          console.log(error)
     }
}

module.exports = getExpenseByUserId