// this Controller is to manage store-managers, inventory-managers etc under a vendor, only admin can create store-managers
const User= require('../../models/user')
const { hashPassword,signUser}= require('../../services/auth')

//only admin can create vendorUsers 
async function handleRegisterVendorUsers(req, res){
    try{
        //currently one or more than one store-manager manage one store only, same goes for the staff(if created in future)
        const {email, password, role} = req.body

        if (role!== "store-manager" && role!=='inventory-manager')
            return res.json("invalid role")


        if(password.length<8) return res.json({error: "password must contain at least 8 characters"}) 
        const hashedpassword = await hashPassword(password)

        const vendorUser = await User.create({
            vendorId: req.user.vendorId,
            storeId: req.params,
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
        // gets all users under a vendor including admin himself
        //filtering & pagination could be added to show users with a specific role
        const vendorUsers= await User.find({vendorId: req.user.vendorId})
        return res.json(vendorUsers)

    } catch (err) {
        console.log(err)
        return res.status(500).json("Failed to fetch vendor's users")
    }
}



//soft delete
async function handledeleteVendorUser(req, res){
    try{
        const {userId} = req.params
        const vendorUser= await User.findById(userId)
        if(!vendorUser) return res.status(404).json("user does not exist")
        if(vendorUser.role!== "store-manager" && vendorUser.role !== "inventory-manager")
            return res.sendStatus(403)
        if(req.user.vendorId!== vendorUser.vendorId.toString())
            return res.status(403).json("Forbidden Access- Not you Staff/User")
        await User.findByIdAndUpdate(userId, {isActive:false})
        return res.json("User disabled")
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Failed to disable user")
    }
}





module.exports= {handleRegisterVendorUsers, handleGetAllVendorUsers, handledeleteVendorUser}