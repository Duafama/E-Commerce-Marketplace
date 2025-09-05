const express= require('express')
const router= express.Router()
const {stripeWebhookHandler}= require('../../controllers/stripe/WebhookController')

router.post('/webhook', express.raw({ type: "application/json" }), stripeWebhookHandler )

module.exports= router 