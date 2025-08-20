const mongoose= require('mongoose')
const storeSchema= new mongoose.Schema({
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor'
    },
    name:{
        type: String,
        required: true
    },
    desc:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model('store', storeSchema)