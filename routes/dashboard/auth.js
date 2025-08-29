const express = require('express')
const router= express.Router()
// const {dashboardAuth, authenticateUser} = require('../../middlewares/auth')
const {handleRegisterVendor, handleUserLogin, handleRegisterCustomer} = require('../../controllers/dashboard/AuthController')

router.post('/vendor-register', handleRegisterVendor)

router.post('/login',  handleUserLogin)

router.post('/register', handleRegisterCustomer)

module.exports= router