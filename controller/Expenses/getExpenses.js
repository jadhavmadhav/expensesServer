const expensesModel = require("../../model/Expenses")

const getExpenses =async(req,res)=>{
     try {
          const result = await expensesModel.find()
          res.send(result)
     } catch (error) {
          console.log(error)
     }
}

module.exports=getExpenses