const Customer= require('../../models/customer')


// api/customers/me
async function handleGetCustomerProfile(req, res){
    try{
        const userId= req.user.userId
        const customer= await Customer.findById(userId).select("name address phoneNo savedPaymentMethod")
        if(!customer) return res.status(404).json("Customer not found")
        return res.json(customer)
    }catch(err){
        console.log(err)
        return res.status(500).json("Failed to fetch Profile")
    }
}


async function handleUpdateCustomerProfile(req, res){
    try{
        const userId= req.user.userId
        const customer= await Customer.findById(userId)
        if(!customer) return res.status(404).json("Customer not found")
        const {name, address, phoneNo, savedPaymentMethod}= req.body
        const updatedCustomer= await Customer.findByIdAndUpdate(userId, {name, address, phoneNo, savedPaymentMethod}, {new:true, runValidators:true})
        return res.json(updatedCustomer)
    }catch(err){
        console.log(err)
        return res.status(500).json("Failed to update profile")
    }
}

async