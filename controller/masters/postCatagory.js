const catagoryModel = require("../../model/CatagoryMaster")


const postCatagory = async (req, res) => {

     const Id = catagoryModel.find().then(result => result.length + 1)
      const catagoryId =  await Id.toString()
     try {
          const catagory = await new catagoryModel({
               catagoryId: catagoryId,
               catagoryName: req.body.catagoryName,
               expenseTypeId: req.body.expenseTypeId
          })

          catagory.save(catagory).then(res=>console.log(res))
     }
     catch (err) {
          console.log(err)
     }

}

module.exports = postCatagory