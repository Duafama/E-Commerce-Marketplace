const express = require('express')
const router= express.Router()
const {handleGetAllVendors, handleUpdateVendorbyId, handleGetVendorById} = require('../controllers/VendorController')
const {authorizeAccess} = require('../middlewares/auth')

//i have not yet creating a portal admin hehe i don't need to yet i just wanted to lock this route
router.get('/',  authorizeAccess(['portal-admin']), handleGetAllVendors)

router.route('/:id').get(authorizeAccess(['portal-admin']), handleGetVendorById)
.patch(authorizeAccess(['portal-admin', 'admin']), handleUpdateVendorbyId) 

module.exports= router