const express = require('express')
const router= express.Router()
const {dashboardAuth, authenticateUser} = require('../../middlewares/auth')
const {handleRegisterVendor, handleUserLogin} = require('../../controllers/AuthController')

router.post('/vendor-register', handleRegisterVendor)

router.post('/login',  handleUserLogin)


module.exports= router