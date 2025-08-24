const mongoose= require('mongoose')
const productSchema = new mongoose.Schema({
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store'
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'category'
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
    images:[
        {
            type:String,
            required:true
        },

    ],
    isActive:{
        type:Boolean,
        default:true
    }    
})


module.exports= mongoose.model('product', productSchema)