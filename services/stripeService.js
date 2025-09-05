const Customer = require('../models/customer')

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

async function createVendorStripeAccount(email) {
  return await stripe.accounts.create({
    type: 'express',
    email,
    country: 'US',
    capabilities: { transfers: { requested: true } }
  })
}

async function createVendorOnboardLink(stripeAccountId){
    return await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: 'http://localhost:3000/vendors/onboarding/refresh',
      return_url: 'http://localhost:3000/vendors/onboarding/success',
      type: 'account_onboarding'
    })
}

async function createPaymentIntent(totalAmount, stripeAccountId, orderId, customer){
    const platformFee= totalAmount*5
    const paymentIntentData= {
        amount: totalAmount * 100, 
        currency: 'pkr',
        payment_method_types: ['card'],
        application_fee_amount: platformFee,
        transfer_data: {
            destination: stripeAccountId //vendor's stripeAccount ID
        },
        metadata: { orderId },
    }

    if (customer.savedPaymentMethodId) {
      paymentIntentData.customer = customer.stripeCustomerId;
      paymentIntentData.payment_method = customer.savedPaymentMethodId;
  }
  const paymentIntent = await stripe.paymentIntents.create(paymentIntentData)
  return paymentIntent
}


async function getStripeCustomerId(customerId){
    const customer = await Customer.findById(customerId)
    if(!customer) return res.status(404).json("customer not found")
    
    if(customer.stripeCustomerId){
      return customer.stripeCustomerId
    }

    const stripeCustomer = await stripe.customers.create({
      email: customer.email,
      name: customer.name
    })

    customer.stripeCustomerId = stripeCustomer.id
    await customer.save()

    return stripeCustomer.id
}

async function createSetupIntent(customer){
   const setupIntent = await stripe.setupIntents.create({
    customer:  await getStripeCustomerId(customer._id),
    payment_method_types: ['card'],
  })

  return setupIntent 
}

module.exports = { createVendorStripeAccount , createVendorOnboardLink, createPaymentIntent, getStripeCustomerId, createSetupIntent};