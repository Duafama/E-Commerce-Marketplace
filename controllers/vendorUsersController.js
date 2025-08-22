// this Controller is to manage store-managers, staff etc under a vendor, only admin can create store-managers
const User= require('../models/user')
const Store= require('../models/store')
const { hashPassword,signUser}= require('../services/auth')

//only admin can create vendorUsers 
async function handleRegisterVendorUsers(req, res){
    try{
        //currently one or more than one store-manager manage one store only, same goes for the staff(if created in future)
        const {storeId, email, password, role} = req.body

        if (role!== "store-manager")
            return res.json("invalid role")

        const store= await Store.findOne({_id: storeId})

        if(!store) return res.status(404).json("store doesnt exist")

        if(req.user.vendorId !== store.vendorId.toString()) 
            return res.status(403).json("You can register users for your own stores only")


        if(password.length<8) return res.json({error: "password must contain at least 8 characters"}) 
        const hashedpassword = await hashPassword(password)

        const vendorUser = await User.create({
            vendorId: req.user.vendorId,
            storeId,
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

async function handleGetVendorUsersPerStore(req, res){

}

//admin only
async function handleUpdateVendorUserById(req, res){
    try {
        const {storeId, role} = req.body
        const store= await Store.findById(storeId)
        if(!store) return res.status(404).json("No such store exists")
        
        if(req.user.vendorId !== store.vendorId.toString()) 
        return res.status(403).json("You can only assign users to your stores")

        const vendorUser= await User.findById(req.params.id)
        if(!vendorUser) return res.status(404).json("This user does not exist")

        if(req.user.vendorId !== vendorUser.vendorId.toString()) 
            return res.status(403).json("You can update users under your own vendors only")
        
        const updatedVendorUser = await User.findByIdAndUpdate(req.params.id, {storeId, role}, {new: true, runValidators:true})
        return res.json(updatedVendorUser)
        
    } catch (err) {
        
    }
}


module.exports= {handleRegisterVendorUsers, handleGetAllVendorUsers}