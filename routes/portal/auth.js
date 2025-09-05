const express = require('express')
const router= express.Router()

const {handleRegisterVendor, handleUserLogin,  } = require('../../controllers/portal/AuthController')

router.post('/vendor-register', handleRegisterVendor)

router.post('/login',  handleUserLogin)




module.exports= router