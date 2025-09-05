const express = require('express')
const router= express.Router()
const {checkApiKey} = require('../../middlewares/apiKey')
const{handleCustomerLogin, handleRegisterCustomer} = require('../../controllers/public/AuthController')

router.post('/register', checkApiKey,  handleRegisterCustomer)

router.post('/login', checkApiKey, handleCustomerLogin)

module.exports= router