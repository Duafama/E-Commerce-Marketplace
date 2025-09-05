const mongoose= require('mongoose')

const orderItemSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true 
    },
    variantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Variant" 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
    },   
    subtotal: { 
        type: Number 
    }                 
}, { _id: false });


const orderSchema= new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
        required:true
    },
    storeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'store',
        required:true
    },
    items:[orderItemSchema],
    totalAmount: {
         type: Number, 
         required: true 
    },
    paymentIntentId: {
        type:String
    },
    paymentStatus: {   
        type: String, 
        enum: ['unpaid', 'paid', 'failed', 'refunded'], 
        default: 'unpaid' 
    },
    status:{
        type: String, 
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: 'pending'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model('order', orderSchema)

