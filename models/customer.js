const mongoose= require('mongoose')
const customerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type: String,
    },
    phoneNo:{
        type:Number,
    },
    stripeCustomerId:{
        type:String
    },
    savedPaymentMethodId:{
        type: String, 
    }
    
})

module.exports= mongoose.model('customer', customerSchema)

//this contains 