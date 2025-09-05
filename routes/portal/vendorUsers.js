const express= require('express')
const router= express.Router()
const {handleRegisterVendorUsers, handleGetAllVendorUsers, handledeleteVendorUser, handleGetVendorUser} = require('../../controllers/portal/vendorUsersController')
const {checkStoreAccess} = require('../../middlewares/storeAccess')
const {authorizeAccess} = require('../../middlewares/auth')


router.post('/stores/:storeId/users', authorizeAccess(['vendor-admin']), checkStoreAccess,handleRegisterVendorUsers)

router.get('/vendors/users', authorizeAccess(['vendor-admin']), handleGetAllVendorUsers)

router.get('/users/me', authorizeAccess(['vendor-admin', 'store-manager', 'inventory-manager']),  handleGetVendorUser)

router.delete('/users/:userId',authorizeAccess(['vendor-admin']), handledeleteVendorUser)

module.exports= router