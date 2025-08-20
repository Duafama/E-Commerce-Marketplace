const express= require('express')
const router= express.Router()

const {handleGetAllStoresByVendor, handleCreateNewStore, handleUpdateStoreById}= require('../controllers/StoreController')

router.route('/')
.get(handleGetAllStoresByVendor)
.post(handleCreateNewStore) 

router.route('/:id').patch(handleUpdateStoreById)

module.exports= router