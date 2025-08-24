const express = require('express')
const router = express.Router()
const {handleCreateNewProduct, handleGetAllProductsByStore, handleGetProductById, handleUpdateProductById} = require('../../controllers/ProductController')
const upload = require('../../middlewares/multer')
const { authorizeAccess } = require('../../middlewares/auth')
const { checkStoreAccess } = require('../../middlewares/storeAccess')
const { checkProductAccess } = require('../../middlewares/productAccess')

router.route('/stores/:storeId/products', authorizeAccess(['vendor-admin', 'store-manager']))
    .post(checkStoreAccess, upload.array('images', 5),  handleCreateNewProduct)
    .get(checkStoreAccess, handleGetAllProductsByStore)

router.route('/products/:productId')
    .get(authorizeAccess(['vendor-admin', 'store-manager', 'inventory-manager']), checkProductAccess, handleGetProductById)
    .patch(authorizeAccess(['vendor-admin', 'store-manager']),checkProductAccess, handleUpdateProductById)


module.exports = router