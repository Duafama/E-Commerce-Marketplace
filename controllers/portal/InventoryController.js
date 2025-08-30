const Product= require('../../models/product')
const Variant= require('../../models/variant')

// if Product has no variant then update product stock 
// api/dashboard/products/:productId/stock
//checkStoreAccess
async function handleUpdateProductStock(req, res){
    try{
        const productId =  req.variant?.productId|| req.params.productId 
        const product = await Product.findById(productId)

        if(product.hasVariants) { // product stock has to be updated even after the variant stock update
            const variants = await Variant.find({productId: productId})
            let variantStockSum= 0
            for (const variant of variants){
                variantStockSum += variant.stock
            }
            product.stock= variantStockSum
            await product.save()
        }
        else { 
            const {stock} = req.body
            await Product.findByIdAndUpdate(productId, {stock}, {new:true, runValidators:true})
        }
        
        return res.status(201).json("stock updated successfully")
    }catch(err){
        console.log(err)
        return res.status(500).json("Failed to update stock")
    }
}

//api/dashboard/variant/:variantId/stock
//checkvariantAccess 
async function handleUpdateVariantStock(req, res, next){
    try{
        const {variantId} = req.params
        const {stock} = req.body
        const variant = await Variant.findByIdAndUpdate(variantId, {stock}, { runValidators:true})
        
        req.variant = variant
        next()
    }catch(err){
        console.log(err)
        return res.status(500).json("failed to update stock")
    }
}

module.exports= {handleUpdateProductStock, handleUpdateVariantStock}




