const express = require('express')
const router= express.Router()
const {handleGetAllVendors, handleUpdateVendorbyId, handleGetVendorById} = require('../controllers/VendorController')

router.get('/', handleGetAllVendors)

router.route('/:id').get(handleGetVendorById).patch(handleUpdateVendorbyId)

module.exports= router