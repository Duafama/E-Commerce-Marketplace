const express= require('express')
const router= express.Router()
const {handleRegisterVendorUsers, handleGetAllVendorUsers} = require('../controllers/vendorUsersController')

//admin only
router.route('/')
.get(handleRegisterVendorUsers)
.post(handleGetAllVendorUsers)


module.exports= router