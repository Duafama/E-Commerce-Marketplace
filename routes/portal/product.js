const express = require('express')
const router = express.Router()
const {handleCreateNewProduct, handleGetAllProductsByStore, handleGetProductById, handleUpdateProductById, handleDeleteProductById} = require('../../controllers/portal/ProductController')
const upload = require('../../middlewares/multer')
const { authorizeAccess } = require('../../middlewares/auth')
const { checkStoreAccess } = require('../../middlewares/storeAccess')
const { checkCategoryAccess } = require('../../middlewares/categoryAccess')
const { checkProductAccess } = require('../../middlewares/productAccess')

router.route('/stores/:storeId/products' )
    .post(authorizeAccess(['vendor-admin', 'store-manager']), checkStoreAccess, checkCategoryAccess, upload.array('images', 5),  handleCreateNewProduct)
    .get(authorizeAccess(['vendor-admin', 'store-manager']), checkStoreAccess, handleGetAllProductsByStore)

router.route('/products/:productId')
    .get(authorizeAccess(['vendor-admin', 'store-manager', 'inventory-manager']), checkProductAccess, handleGetProductById)
    .patch(authorizeAccess(['vendor-admin', 'store-manager']),checkProductAccess, handleUpdateProductById)
    .delete(authorizeAccess(['vendor-admin', 'store-manager']),checkProductAccess, handleDeleteProductById )


module.exports = router