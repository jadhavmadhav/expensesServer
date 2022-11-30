const mongoose = require('mongoose')

// const DB=process.env.DATABASE;

 const connectDB=(DB)=>{
     mongoose.connect(DB,{
          useNewUrlParser:true,
          // useCreateIndex:true,
          useUnifiedTopology:true,
          // useFindAndModify:false
     }).then(()=>{
          console.log('connection successfully')
     }).catch((error)=>{
          console.log(error)
     })
}
    
module.exports =connectDB