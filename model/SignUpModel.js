
const mongoose = require('mongoose')

const userSignUpSchema = new mongoose.Schema({
     userId: {
          type: String,
          required: true
     },
     firstName: {
          type: String,
          required: true
     },
     lastName: {
          type: String,
          required: true
     },
     mobileNumber: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     }

})

const signUpModel = mongoose.model('userSignUp', userSignUpSchema)

module.exports = signUpModel