require('dotenv').config()
const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY)
const Order= require('../../models/order')
const Customer= require('../../models/customer')

async function stripeWebhookHandler(req, res){
    const sig = req.headers["stripe-signature"];

    let event;
    try {   
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log(event.type)
    try{
        switch (event.type) { 
        case "payment_intent.succeeded": 
        {
          const paymentIntent = event.data.object
          const orderId = paymentIntent.metadata.orderId
          await Order.findByIdAndUpdate(orderId, {
            paymentStatus: "paid",
            status: "confirmed"
        })
        break
        }
        case "payment_intent.payment_failed": 
        {
          const paymentIntent = event.data.object
          const orderId = paymentIntent.metadata.orderId
          await Order.findByIdAndUpdate(orderId, { paymentStatus: "failed" })
          break
          }
        case "setup_intent.succeeded": 
        {
          const setupIntent = event.data.object;
          const paymentMethodId = setupIntent.payment_method;
          const stripeCustomerId = setupIntent.customer;

          const customer = await Customer.findOne({ stripeCustomerId });
          if (customer) {
            // Save the payment method ID in your DB
            customer.savedPaymentMethodId = paymentMethodId;
            await customer.save();
            console.log(
              `💳 Saved payment method ${paymentMethodId} for customer ${customer._id}`
            );
          }
        break;
        }
      }
    }
    catch(err){
      console.error( err);
      return res.status(500).send("Server Error");
    }
    
}



module.exports= {stripeWebhookHandler}