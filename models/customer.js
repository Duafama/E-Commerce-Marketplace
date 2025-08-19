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
    address:{
        type: String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    savedPaymentMethod:{
        type: String,
        enum: ['card'| 'paypal']
    }
})

module.exports= mongoose.model('customer', customerSchema)