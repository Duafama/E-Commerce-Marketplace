const express = require('express')
const router = express.Router()
const {handleCreateVariantOfProduct, handleGetVariantsOfProduct, handleGetVariantById, handleUpdateVariantById} = require('../../controllers/dashboard/VariantController')
const upload = require('../../middlewares/multer')
const {checkProductAccess} = require('../../middlewares/productAccess')
const { checkVariantAccess } = require('../../middlewares/variantAccess')
const { authorizeAccess } = require('../../middlewares/auth')

router.route('/products/:productId/variants')
.get(authorizeAccess(['vendor-admin', 'store-manager', 'inventory-manager']), checkProductAccess,handleGetVariantsOfProduct)
.post(authorizeAccess(['vendor-admin', 'store-manager']), checkProductAccess, upload.array('images', 3), handleCreateVariantOfProduct)

router.route('/variants/:variantId')
.get(authorizeAccess(['vendor-admin', 'store-manager', 'inventory-manager']), checkVariantAccess, handleGetVariantById)
.patch(authorizeAccess(['vendor-admin', 'store-manager']), checkVariantAccess, handleUpdateVariantById)

module.exports= router