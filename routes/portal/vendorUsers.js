const express= require('express')
const router= express.Router()
const {handleRegisterVendorUsers, handleGetAllVendorUsers, handledeleteVendorUser} = require('../../controllers/portal/vendorUsersController')
const {checkStoreAccess} = require('../../middlewares/storeAccess')
//admin only
router.route('/vendors/:id/users')
.get(handleGetAllVendorUsers)

router.post('/stores/:storeId/users',checkStoreAccess,handleRegisterVendorUsers)

router.delete('/users/:userId', handledeleteVendorUser)

module.exports= router