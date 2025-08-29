const mongoose= require('mongoose')
const productSchema = new mongoose.Schema({
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
        required:true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    sku:{
        type:String,
        unique:true // for products with no variants
    },
    price:{
        type:Number // for products with no variants
    },
    stock:{
        type:Number,
        default: 0 // for products with no variants
    },
    sold:{
        type:Number, // for products with no variants
        default:0
    },
    images:[
        {
            type:String,
            required:true
        },
    ],
    hasVariants:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }    
})


module.exports= mongoose.model('product', productSchema)