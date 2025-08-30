const express= require('express')
const router= express.Router()
const {authorizeAccess} = require('../../middlewares/auth')
const {checkStoreAccess} = require('../../middlewares/storeAccess')
const {handleGetAllStoresByVendor, handleCreateNewStore, handleUpdateStoreById, handleGetStoreById}= require('../../controllers/portal/StoreController')

router.route('/stores/', authorizeAccess(['vendor-admin']))
.get( handleGetAllStoresByVendor)
.post(handleCreateNewStore) 


router.route('/stores/:storeId', )
.get(authorizeAccess(['vendor-admin, store-manager']),checkStoreAccess, handleGetStoreById)
.patch(authorizeAccess(['vendor-admin']), checkStoreAccess, handleUpdateStoreById)

module.exports= router