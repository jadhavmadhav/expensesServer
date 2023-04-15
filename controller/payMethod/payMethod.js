const paymentMethodModel = require("../../model/PaymentMethod")


const postPayMethodController = async (req, res) => {
    const id = (await paymentMethodModel.find()).length + 1
    try {
        const result = new paymentMethodModel({
            id,
            method: req.body.method
        })

        result.save(result).then((re) => res.json({
            status: 200,
            message: "Payment Methods successfully posted !"
        })).catch((err) => res.json({
            status: 401,
            message: err.message
        }))

    } catch (error) {
        console.log(error)
    }
}


const getAllPayMethodController = async (req, res) => {
    try {
        const result = await paymentMethodModel.find()
        if (!result) {
            res.json({
                status: 400,
                message: ' Payment Methods is not found !'
            })
        } else {
            res.json({
                status: 200,
                message: ' get all payment Methods successfully !',
                result
            })
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports = { postPayMethodController, getAllPayMethodController }