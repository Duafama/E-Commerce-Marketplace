const Store= require('../models/store')

async function handleGetAllStoresByVendor(req, res){
    try{
        const stores = await Store.find({vendorId: req.user.vendorId}) 
        if(stores.length===0) return res.json("No stores available for this vendor yet. Create stores!")
        return res.json(stores)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: "failed to fetch stores"})
    }
}

async function handleCreateNewStore(req, res){
    try{
        const {name, desc} = req.body
        console.log(req.user.vendorId)
        await Store.create({
            vendorId: req.user.vendorId,
            name,
            desc
        })
        return res.status(201).json({msg: "success"}); 
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:"Failed to create store"})
    }
}

async function handleUpdateStoreById(req, res){
    try {
        const {name, desc}= req.body
        const store= await Store.findById(req.params.id)
        if(!store) return res.json("store doesnt exist")
        if(req.user.vendorId!== store.vendorId.toString()) return res.json("You can only update stores under your own vendor/business")
        const updatedStore = await Store.findByIdAndUpdate(req.params.id, {name, desc}, {new:true, runValidators:true})
        return res.json(updatedStore)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "failed to update store"})
    }
}

//This would mean deleting a stre and all its product/categories/variants
async function handleDeleteStoreById(req, res){

}

module.exports={handleGetAllStoresByVendor, handleCreateNewStore, handleUpdateStoreById}