const express = require('express')
const router= express.Router()
const {handleGetAllVendors, handleUpdateVendorbyId, handleGetVendorById} = require('../../controllers/portal/VendorController')
const {authorizeAccess} = require('../../middlewares/auth')

//i have not yet creating a portal admin hehe i don't need to yet i just wanted to lock this route
router.get('/vendors/',  authorizeAccess(['portal-admin']), handleGetAllVendors)

router.route('/vendors/:id').get(authorizeAccess(['portal-admin']), handleGetVendorById)
.patch(authorizeAccess(['portal-admin', 'vendor-admin']), handleUpdateVendorbyId) 

module.exports= router