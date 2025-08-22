const express = require('express')
const router = express.Router()
const {handleCreateNewProduct, handleGetAllProductsByStore} = require('../controllers/ProductController')
const upload = require('../middlewares/multer')
const { checkStoreAccess } = require('../middlewares/storeAccess')

router.route('/stores/:storeId/products')
    .post(upload.array('images', 5), checkStoreAccess, handleCreateNewProduct)
    .get(checkStoreAccess, handleGetAllProductsByStore)

module.exports = router