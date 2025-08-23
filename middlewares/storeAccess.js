const Store = require('../models/store')

async function checkStoreAccess(req, res, next){
    try {
        const {storeId} = req.params
        const store = await Store.findById(storeId)
        if(!store) return res.json("store doesn't exist")

        if(req.user.role === "store-manager" && storeId !== req.user.storeId)//storeId stored in jwt token
            return res.status(403).json("Not your store")

        //will run for admin
        if(req.user.role === "admin" && req.user.vendorId!== store.vendorId.toString()) 
            return res.json("Unauthorized Store Access")

        req.store = store
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server Error")
    }
}

module.exports= {checkStoreAccess}