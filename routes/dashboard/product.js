const express = require('express')
const router = express.Router()
const {handleCreateNewProduct, handleGetAllProductsByStore, handleGetProductById, handleUpdateProductById} = require('../../controllers/ProductController')
const upload = require('../../middlewares/multer')
const { authorizeAccess } = require('../../middlewares/auth')
const { checkStoreAccess } = require('../../middlewares/storeAccess')
const { checkProductAccess } = require('../../middlewares/productAccess')

router.route('/stores/:storeId/products')
    .post(authorizeAccess(['admin', 'store-manager']),checkStoreAccess, upload.array('images', 5),  handleCreateNewProduct)
    .get( handleGetAllProductsByStore)

router.route('products/:productId')
    .get(handleGetProductById)
    .patch(authorizeAccess(['admin', 'store-manager']),checkProductAccess, handleUpdateProductById)


module.exports = router