const express= require('express')
const router= express.Router()
const {authorizeAccess} = require('../../middlewares/auth')
const {checkStoreAccess} = require('../../middlewares/storeAccess')
const {handleGetAllStoresByVendor, handleCreateNewStore, handleUpdateStoreById, handleGetStoreById}= require('../../controllers/StoreController')

router.route('/stores/', authorizeAccess(['admin']))
.get( handleGetAllStoresByVendor)
.post(handleCreateNewStore) 


router.route('/stores/:storeId', )
.get(checkStoreAccess, handleGetStoreById)
.patch(authorizeAccess(['admin']), checkStoreAccess, handleUpdateStoreById)

module.exports= router