//Store Management
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


//checkStoreAccess middleware added!
async function handleGetStoreById(req, res){
    try { 
        const store = req.store
        return res.json(store)
    } catch (err) {
        console.log(err)
        return res.status(500).json("failed to get  store")
    }
}

//admin only
async function handleCreateNewStore(req, res){
    try{
        const {name, desc} = req.body
        await Store.create({
            vendorId: req.user.vendorId,// this way admin creates store for his own vendor/business
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


//right now only admin can update store
async function handleUpdateStoreById(req, res){
    try {
        const storeId = req.params.id
        const {name, desc}= req.body

        const store= await Store.findById(storeId)
        if(!store) return res.json("store doesnt exist")

        //if store exists but not the store of admin trying to update it then return
        if(req.user.vendorId!== store.vendorId.toString()) 
            return res.json("You can only update stores under your own vendor/business")
        
        const updatedStore = await Store.findByIdAndUpdate(storeId, {name, desc}, {new:true, runValidators:true})
        return res.json(updatedStore)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "failed to update store"})
    }
}

//soft delete
async function handleDeleteStoreById(req, res){

}

module.exports={handleGetAllStoresByVendor, handleCreateNewStore, handleUpdateStoreById, handleGetStoreById}