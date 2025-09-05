const User= require('../../models/user')
const Customer= require('../../models/customer')
const {hashPassword, verifyPassword, signUser}=require('../../services/auth')

async function handleRegisterCustomer(req, res){
    try{
        const {name, email, password, address, phoneNo} = req.body
        const vendorId = req.vendorId
        const existing= await User.findOne({email: email, vendorId, role: 'customer'})
        if (existing){
            return res.status(403).json("Email already registered")
        }
           
        if (password.length<8) return res.json("password must contain at least 8 characters")
        const hashedpassword = await hashPassword(password)
        const newUser= await User.create({
            email,
            password: hashedpassword,
            vendorId: req.vendorId,
        })

        //customer profile with userid
        await Customer.create({
            userId: newUser._id,
            name,
            email,
            phoneNo,
            address,
        })

        const token = await signUser({
            userId: newUser._id,
            email: newUser.email,
            role: newUser.role,
            vendorId: newUser.vendorId, 
            storeId: newUser.storeId   //null
        })
        return res.json({token})

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }

}

async function handleCustomerLogin(req, res){
    try{
        const {email, password} = req.body
        const vendorId = req.vendorId;
        const user = await User.findOne({email , vendorId, role: 'customer' } )
        if (!user) return res.json({error: "User does not exist"})
        if (!user.isActive) return res.status(403).json({ msg: "Account is disabled. Please contact support." });

        //verifying with the hashed password stored using bcrypt 
        const verifyUser = await verifyPassword(password, user.password)
        if(!verifyUser) return res.json({error: "Invalid Email or Password"})

        const token= await signUser({
            userId: user._id,
            email: user.email,
            role: user.role,
            vendorId: user.vendorId,
            storeId:user.storeId
        }) 
        return res.json({token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }
}

module.exports= {handleCustomerLogin, handleRegisterCustomer}

