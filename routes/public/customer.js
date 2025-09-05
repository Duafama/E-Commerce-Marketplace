const express = require('express')
const router= express.Router()
const {handleGetCustomerProfile, handleUpdateCustomerProfile, savePaymentMethod}=  require('../../controllers/public/customerController')

router.get('/customer/me', handleGetCustomerProfile)

router.patch('/customer/me', handleUpdateCustomerProfile)

router.post('/customer/save-card', savePaymentMethod)

module.exports= router
