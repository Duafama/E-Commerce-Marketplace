const Order= require('../models/order')

async function checkOrderAccess(req, res, next){
    try{
        const {orderId} = req.params
        const order= await Order.findById(orderId)
        if(!order) return res.status(404).json("order does not exist")
    
        if(req.user.role === 'vendor-admin' && req.user.vendorId !== order.vendorId.toString())
            return res.status(403).json("Forbidden Access- Not your vendor's order")
        else if(req.user.role=== 'store-manager' && req.user.storeId !== order.storeId.toString())
            return res.status(403).json("Forbidden access- Not your store's order")
        else if(req.user.role=== 'customer' && req.user.userId !== order.customerId.toString())
            return res.status(403).json("Forbidden Access- Not your Order")
        req.order= order
        next()
    }catch(err){
        console.log(err)
        return res.status(500).json("Server Error")
    }
}

module.exports= {checkOrderAccess}