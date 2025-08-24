const mongoose = require('mongoose')
const variantSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"product"
    },
    attributes:{
        type: Map,
        of:String
    },
    sku:{ 
        type:String, 
        unique:true,
        required:true   
    },
    price:{
        type:Number,
        required: true
    },
    stock:{
        type:Number,
        default: 0
    },
    images:[{
        type:String
    },]
})

module.exports= mongoose.model('variant', variantSchema)