const Product= require('../models/product')

async function checkProductAccess(req, res, next){
    try{
        const {productId} = req.params
        const product = await Product.findById(productId)
        if (!product) return res.status(404).json("Product doesn't exist")
        
        if( req.user.role=== 'store-manager' && req.user.storeId !== product.storeId.toString())
            return res.status(403).json("Product does not belong to this store")

        if(req.user.role === 'admin'  && req.user.vendorId !== product.storeId.vendorId.toString())
            return res.status(403).json("Product does not belong to this vendor")
        
        req.product = product
        next()
    }catch(err){
        console.log(err)
        res.status(500).json("server error")
    }
}

module.exports= {checkProductAccess}