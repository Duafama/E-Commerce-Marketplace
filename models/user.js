//users contain all user's login credentials(not profiles) , vendor-admins, store-managers, customers

const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
//null for customer 
    },
    storeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'store',
        default: null //null for customer and admin
    },
    email:{   
        type:String, 
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum: ['vendor-admin', 'store-manager','inventory-manager', 'customer'],
        default: 'customer'
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("user", userSchema) 
