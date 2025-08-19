const Vendor= require('../models/vendor')

async function handleGetAllVendors(req, res){
    try{
        const vendors= await Vendor.find()
        res.json(vendors)
    }catch(err){
        console.log(err)
        res.status(500).json({error: "failed to fetch all vendors"})
    }
}

async function handleGetVendorById(req, res){
    try{
        const vendor= await Vendor.findById(req.params.id)
        if (!vendor) return res.json({msg: "Vendor does not exist"})
        return res.json(vendor)
    }catch(err){
        console.log(err)
        res.status(500).json({error: "failed to fetch vendor"})
    }
}

async function handleUpdateVendorbyId(req, res){
    try{
        const {businessName, ownerName, contactEmail} =req.body

        if(req.user.role=== "admin" && req.user._id !== req.params.id)
            return res.json({error:"you can only update your own vendor info"})

        const updatedVendor= await Vendor.findByIdAndUpdate(req.params.id, {businessName, ownerName, contactEmail}, { new: true, runValidators: true })
        if(!updatedVendor) return res.json("vendor not found")
        return res.json(updatedVendor)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "failed to update vendor info"})
    }
}


//long logic for hard delete, will try soft delete late where i.ll add status do users and vendors and will update the status 
async function handleDeleteVendorById(req, res){
    try{
        if(req.user.role === "admin" && req.user._id !== req.params.id)
            return res.json({error:"you can only delete your own vendor info"})
        const deletedVendor= await Vendor.findByIdAndDelete(req.params.id)
        if(!deletedVendor) return res.json("vendor not found")
       
    }catch(err){
        console.log(err)
        res.status(500).json({error: "failed to delete vendor account"})
    }
}

module.exports= {handleGetAllVendors, handleGetVendorById, handleUpdateVendorbyId}