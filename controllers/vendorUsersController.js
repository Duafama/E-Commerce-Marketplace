// this Controller is to manage store-managers, staff etc under a vendor, only admin can create store-managers
const vendorUser= require('../models/user')

//only admin can create vendorUsers
async function handleCreateVendorUsers(req, res){
    try{
        const {storeId, email, password} = req.body
        
    }catch(err){

    }
}