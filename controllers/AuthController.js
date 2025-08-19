const Vendor= require('../models/vendor')
const User= require('../models/user')
const Customer= require('../models/customer')
const {hashPassword, verifyPassword, signUser}=require('../services/auth')


async function handleRegisterVendor(req, res){
    try{
        const {businessName, ownerName, contactEmail, email, password}= req.body
        if (password.length<8) return res.json("password must contain at least 8 characters")
        const hashedpassword = await hashPassword(password)
        const vendor= await Vendor.create({
            businessName,
            ownerName,
            contactEmail
        })
        //admin created along with the vendor registeration
        const user= await User.create({
            vendorId: vendor._id,
            email,
            password: hashedpassword,
            role: 'admin'
        })

        const token= await signUser({
            userId: user._id,
            email: user.email,
            role: user.role
        })
        return res.json({token})

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }
}

async function handleUserLogin(req, res){
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if (!user) return res.json({error: "User does not exist"})
        //verifying with the hashed password stored using bcrypt 
        const verifyUser = await verifyPassword(password, user.password)
        if(!verifyUser) return res.json({error: "Invalid Email or Password"})

        const token= await signUser({
            userId: user._id,
            email: user.email,
            role: user.role
        })
        return res.json({token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }
}

async function handleRegisterCustomer(req, res){
    try{
        const {name, email, password, address, phoneNo, savedPaymentMethod} = req.body
        if (password.length<8) return res.json("password must contain at least 8 characters")
        const hashedpassword = await hashPassword(password)
        const user= await User.create({
            email,
            password: hashedpassword,
        })

        await Customer.create({
            userId: user._id,
            name,
            phoneNo,
            address,
            savedPaymentMethod  
        })

        const token = await signUser({
            userId: user._id,
            email: user.email,
            role: user.role
        })
        return res.json({token})

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }

}

module.exports= {handleRegisterVendor, handleUserLogin, handleRegisterCustomer}