const express= require('express')
const router= express.Router()
const {handleUpdateProductStock, handleUpdateVariantStock} = require('../../controllers/portal/InventoryController')
const {checkProductAccess} = require('../../middlewares/productAccess')
const {checkVariantAccess} = require('../../middlewares/variantAccess')


router.patch('/products/:productId/stock', checkProductAccess, handleUpdateProductStock )

router.patch('/variants/:variantId/stock', checkVariantAccess, handleUpdateVariantStock, handleUpdateProductStock)

module.exports= router