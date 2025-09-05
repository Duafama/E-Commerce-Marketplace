// Vendor profile Management 
const Vendor= require('../../models/vendor')
const {createVendorOnboardLink} = require('../../services/stripeService')


async function handleGetAllVendors(req, res){  //only portal admin
    try{
        const vendors= await Vendor.find()
        res.json(vendors)
    }catch(err){
        console.log(err)
        res.status(500).json({error: "failed to fetch all vendors"})
    }
}   

async function handleGetVendorProfile(req, res){
    try{
        const vendor= await Vendor.findById(req.user.vendorId)
        if (!vendor) return res.json({msg: "Vendor does not exist"})
        return res.json(vendor)
    }catch(err){
        console.log(err)
        res.status(500).json({error: "failed to fetch vendor"})
    }
}

// app.get('/vendors/onboarding-link', authenticateUser, 
async function handleVendorOnboard (req, res){
  try {
    const vendor = await Vendor.findById(req.user.vendorId);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    const accountLink = await createVendorOnboardLink(vendor.stripeAccountId)
    res.json({ onboardingUrl: accountLink.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function handleUpdateVendorProfile(req, res){
    try{
        const {businessName, ownerName, businessEmail} =req.body 

        const updatedVendor= await Vendor.findByIdAndUpdate(req.user.vendorId, {businessName, ownerName, businessEmail}, { new: true, runValidators: true })
        if(!updatedVendor) return res.json("vendor not found")
        return res.json(updatedVendor)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "failed to update vendor info"})
    }
}
   


module.exports= {handleGetAllVendors, handleGetVendorProfile, handleUpdateVendorProfile, handleVendorOnboard}