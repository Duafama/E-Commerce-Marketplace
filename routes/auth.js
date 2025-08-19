const express = require('express')
const router= express.Router()

const {handleRegisterVendor, handleUserLogin, handleRegisterCustomer} = require('../controllers/AuthController')

router.post('/vendor-register', handleRegisterVendor)

router.post('/login', handleUserLogin)

router.post('/customer-register', handleRegisterCustomer)


module.exports= router