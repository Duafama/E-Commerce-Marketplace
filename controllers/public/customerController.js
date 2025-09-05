const Customer= require('../../models/customer')
const{createSetupIntent}= require('../../services/stripeService')

// api/customers/me
async function handleGetCustomerProfile(req, res){
    try{
        const userId= req.user.userId
        const customer= await Customer.findOne(userId).select("name address phoneNo savedPaymentMethod")
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
        const customer= await Customer.findOne({userId})
        if(!customer) return res.status(404).json("Customer not found")
        const {name, address, phoneNo, savedPaymentMethod}= req.body
        const updatedCustomer= await Customer.findByIdAndUpdate(userId, {name, address, phoneNo}, {new:true, runValidators:true})
        return res.json(updatedCustomer)
    }catch(err){
        console.log(err)
        return res.status(500).json("Failed to update profile")
    }
}


async function savePaymentMethod(req, res) { 
  try {
    const userId = req.user.userId
    const customer = await Customer.findOne({userId})

    const setupIntent = await createSetupIntent(customer)

    res.json({Client_secret:  setupIntent.client_secret })  
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create SetupIntent' })
  }
}

module.exports= {handleGetCustomerProfile, handleUpdateCustomerProfile, savePaymentMethod}