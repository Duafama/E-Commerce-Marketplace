const Order= require('../../models/order')


// stores/:storeId/orders GET 
async function handleGetOrdersPerStore(req, res){
    try{
        const {storeId} = req.params
        const orders= await Order.find({storeId: storeId})
        if(orders.length===0) return res.status(404).json("No orders")
        return res.json(orders)
    }catch(err){
        console.log(err)
        return res.status(500).json("Failed to fetch orders")

    }
}


// /orders/:orderId
async function handleGetOrdersById(req, res){
    try{
        const order= req.order
        return res.json(order)
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Failed to fetch order")
    }
}

// /orders/:orderId/status??
async function handleUpdateOrderById(req, res){
    try{
        const {orderId} = req.params
        const {status}= req.body
        const order= await Order.findByIdAndUpdate(orderId, {status}, {new:true, runValidators:true})
        return res.json(order)
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Failed to update Status")
    }
}

module.exports= {handleGetOrdersPerStore, handleUpdateOrderById, handleGetOrdersById}