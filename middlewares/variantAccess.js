const Variant = require('../models/variant')

async function checkVariantAccess(req, res, next){
    try {
        const{variantId} = req.params
        const variant = await Variant.findById(variantId).populate({ 
        path: 'productId',
        populate: {
        path: 'storeId',
        model: 'store'
        } 
        })
        if(!variant) return res.status(404).json("Variant Not found")
        if((req.user.role=== 'store-manager' || req.user.role === 'inventory-manager') && req.user.storeId !== variant.productId.storeId.toString())
            return res.status(403).json("Forbidden Access- Variant does not belong to this store")
        else if (req.user.role === 'vendor-admin' && req.user.vendorId !== variant.productId.storeId.vendorId.toString())
            return res.status(403).json("Forbidden Access- Variant does not belong to this vendor")

        req.variant = variant
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server error")
    }
}

module.exports= {checkVariantAccess}
