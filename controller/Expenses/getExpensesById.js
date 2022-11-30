 
const expensesModel = require("../../model/Expenses")


const getExpensesById=async(req,res)=>{
  const Id = req.params.Id 
   
     try{
        const response = await expensesModel.aggregate([{$match:{expensesId:Id}}])
        res.send(response)
     }
     catch(err){
          console.log(err)
     }
}

module.exports = getExpensesById