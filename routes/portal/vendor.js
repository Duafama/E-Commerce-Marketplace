const express = require('express')
const router= express.Router()
const {handleGetAllVendors, handleUpdateVendorProfile, handleGetVendorProfile, handleVendorOnboard} = require('../../controllers/portal/VendorController')
const {authorizeAccess} = require('../../middlewares/auth')

router.route('/vendors/onboard').get(authorizeAccess(['vendor-admin']), handleVendorOnboard)

router.get('/vendors',  authorizeAccess(['portal-admin']), handleGetAllVendors)

router.route('/vendors/profile')
.get(authorizeAccess(['vendor-admin']),handleGetVendorProfile)
.patch(authorizeAccess(['vendor-admin']),handleUpdateVendorProfile) 


 

module.exports= router