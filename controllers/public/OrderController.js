const Order = require('../../models/order')
const Product= require('../../models/product')
const Variant = require('../../models/variant')
const Customer= require('../../models/customer')
const mongoose= require('mongoose')
const { createPaymentIntent } = require('../../services/stripeService')
const Vendor = require('../../models/vendor')

//only customer is authorized to access this route handler function
async function handleCreateNewOrder(req, res){
    const session= await mongoose.startSession()
    session.startTransaction()
    try{
        const vendorId= req.vendorId
        const storeId= req.storeId
        const customerId = req.user.userId
        const {items} = req.body

        if(items&& items.length===0) return res.status(404).json("No items in the Order")
        
        let totalAmount=0
        let finalItems= []
        

        for (const item of items){
            const product= await Product.findById(item.productId).populate('storeId')
            if(!product) return res.status(404).json("Product Not found")

            let unitPrice= product.price
            if (product.hasVariants) {
                const variant = await Variant.findById(item.variantId)
                if(!variant) return res.status(404).json("Variant Not found")

                unitPrice= variant.price

                if(variant.stock < item.quantity)
                    return res.status(400). json("Not enough stock")
                
                await Variant.updateOne(
                    { _id: item.variantId}, 
                    {$inc: {stock: -item.quantity, sold: item.quantity}}, 
                    {session})

                await Product.updateOne(
                    {_id: item.productId},
                    {$inc: {stock: -item.quantity, sold: item.quantity}},
                    {session}
                )
            }
            else{
                if(product.stock < item.quantity)
                    return res.status(400).json("Not enough stock")

                await Product.updateOne(
                    {_id: item.productId},
                    {$inc: {stock: -item.quantity, sold: item.quantity}},
                    {session}
                )
            }
            
            const subtotal = unitPrice*item.quantity // 
            totalAmount += subtotal
              
            finalItems.push({
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                price: unitPrice,
                subtotal   
            })  
        }
        // WARNING: to pass a `session` to `Model.create()` in Mongoose, you **must** pass an array as the first argument.  
        // otherwise, order will be created outside the session
        const orderArr = await Order.create([{
            customerId,
            vendorId,
            storeId,
            items: finalItems,
            totalAmount
        }], {session})             
    
        const order= orderArr[0]
        
        const vendor= await Vendor.findById(vendorId)
        const customer= await Customer.findOne({userId:customerId})
        const paymentIntent= await createPaymentIntent(totalAmount, vendor.stripeAccountId, order._id.toString(), customer)
                   
        order.paymentIntentId= paymentIntent.id
        await order.save({session})

        await session.commitTransaction()
        res.status(201).json({orderId: order._id, Client_secret: paymentIntent.client_secret})
        
    } 
    catch(err){
        await session.abortTransaction()
        console.log(err)
        res.status(500).json(err.message)
    }
    finally{
        await session.endSession()
    }
}

async function handleGetCustomerOrdersPerStore(req, res){
    try{
        const storeId= req.storeId
        const customerId = req.user.userId
        const orders = await Order.find({customerId: customerId, storeId: storeId}).select( "_id totalAmount status")
        return res.json({orders})
    }
    catch(err){
        console,log(err)
        return res.status(500).json("Failed to fetch orders per store")
    }
}


async function handleGetCustomerOrderbyId(req, res){
    try{
        const {orderId} = req.params
        const order= await Order.findById(orderId).select("_id items totalAmount status")
        return res.json(order)
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Failed to get order")
    }
}

module.exports= {handleCreateNewOrder, handleGetCustomerOrdersPerStore, handleGetCustomerOrderbyId}