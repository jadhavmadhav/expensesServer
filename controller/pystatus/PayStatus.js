const PaymetStatusModel = require("../../model/PaymentStatus")


const postPaymentStatus = async (req, res) => {

    const id = (await PaymetStatusModel.find()).length + 1

    try {
        const result = new PaymetStatusModel({
            id,
            status: req.body.status
        })
        result.save(result).then((rs) => res.json({
            status: 200,
            message: "post payment status successfully !"
        })
        ).catch((err) =>
            res.json({
                status: 400,
                message: err.message
            })
        )
    } catch (error) {
        console.log(error)
    }
}

const getAllPayStatusController=async(req,res)=>{
    try {
        const result = await PaymetStatusModel.find()
        if (!result) {
            res.json({
                status: 400,
                message: ' catagories is not found !'
            })
        } else {
            res.json({
                status: 200,
                message: ' get all catagoies successfully !',
                result
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { postPaymentStatus,getAllPayStatusController }