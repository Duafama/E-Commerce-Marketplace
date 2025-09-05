// this Controller is to manage store-managers, inventory-managers etc under a vendor, only admin can create store-managers
const User= require('../../models/user')
const { hashPassword,signUser}= require('../../services/auth')

//only admin can create vendorUsers 
async function handleRegisterVendorUsers(req, res){
    try{
        //currently one or more than one store-manager manage one store only, same goes for the staff(if created in future)
        const {email, password, role} = req.body
        const existing= await User.findOne({email:email, vendorId: req.user.vendorId, role: { $in: ["vendor-admin", "store-manager", "inventory-manager"]} })
        if(existing){
            return res.status(403).json("User already exists")
        }
        if (role!== "store-manager" && role!=='inventory-manager')
            return res.json("invalid role")

        if(password.length<8) return res.json({error: "password must contain at least 8 characters"}) 
        const hashedpassword = await hashPassword(password)

        const vendorUser = await User.create({
            vendorId: req.user.vendorId,
            storeId: req.params.storeId,
            email,
            password: hashedpassword,
            role,
        })

        const token = await signUser({
            userId: vendorUser._id,
            email: vendorUser.email,
            role: vendorUser.role,
            vendorId: vendorUser.vendorId,
            storeId: vendorUser.storeId
        })
        return res.json({token})


    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Failed to create user under vendor"})
    }
}

async function handleGetAllVendorUsers(req, res){ 
    try {
        const vendorUsers= await User.find({vendorId: req.user.vendorId, role: {$in: ['vendor-admin', 'store-manager', 'inventory-manager']}})
        return res.json(vendorUsers)

    } catch (err) {
        console.log(err)
        return res.status(500).json("Failed to fetch vendor's users")
    }
}

//users/me
async function handleGetVendorUser(req, res){
    try{
        const user= await User.findOne({_id: req.user.userId}).select('vendorId storeId email role')
        if(!user) return res.status(404).json("User doesnt exist")
        return res.json(user)
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Failed to Get User's profile")
    }
}

//soft delete
async function handledeleteVendorUser(req, res){
    try{
        const {userId} = req.params
        const vendorUser= await User.findOne({_id: userId, vendorId: req.user.vendorId , role: {$in:['vendor-admin', "store-manager", "inventory-manager"] }} )
        if(!vendorUser) return res.status(404).json("user does not exist")
        await User.findByIdAndUpdate(userId, {isActive:false})
        return res.json("User deactivated")
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Failed to disable user")
    }
}



module.exports= {handleRegisterVendorUsers, handleGetAllVendorUsers, handledeleteVendorUser, handleGetVendorUser}