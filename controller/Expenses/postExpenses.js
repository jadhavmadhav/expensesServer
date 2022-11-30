const expensesModel = require("../../model/Expenses")


const postExpenses = async (req, res) => {
     const date = new Date().toJSON().slice(0,10)
     const getDay = new Date().getDay()
     const myDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
     const Day = myDay[getDay]
console.log(date)
     const time = new Date().toLocaleTimeString()

     let expensesId = (await expensesModel.find()).length+1
     try {

          const expenses = new expensesModel({
               userId: req.body.userId,
               expensesId: expensesId, 
               expensesType: req.body.expensesType,
               catagory: req.body.catagory,  
               amount: req.body.amount,
               description: req.body.description,
               date: date,
               day: Day,
               time: time
          })

          expenses.save(expenses).then(res => console.log(res))
     } catch (error) {
          console.log(error)
     }
}

module.exports = postExpenses

