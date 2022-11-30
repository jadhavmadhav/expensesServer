const signUpModel = require("../../model/SignUpModel")

const signUpController= async(req,res)=>{
     const firstName=req.body.firstName
     const mobile=req.body.mobileNumber
     const firstLatterName=firstName.split('').splice(0,1).join("").toUpperCase()
      

     const Id = await signUpModel.find().then((result) => result.length + 1)

     
     const userId =`EU${firstLatterName}${Id}`
 
     try {
           const signUp= new signUpModel({
               userId:userId,
               firstName:req.body.firstName,
               lastName:req.body.lastName,
               mobileNumber:req.body.mobileNumber,
               email:req.body.email,
               password:req.body.password
           })
           signUp.save(signUp).then(res=>console.log(res))
     } catch (error) {
          console.log(error)
     }
}

module.exports=signUpController