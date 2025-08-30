const express = require('express')
const router= express.Router()
const {handleGetOrdersById, handleGetOrdersPerStore, handleUpdateOrderById} = require('../../controllers/portal/OrderController')
const {checkOrderAccess} = require('../../middlewares/orderAccess')
const {checkStoreAccess} = require('../../middlewares/storeAccess')


router.route('/orders/:orderId')
.get(checkOrderAccess, handleGetOrdersById)
.patch(checkOrderAccess, handleUpdateOrderById)

router.get('/stores/:storeId/orders', checkStoreAccess, handleGetOrdersPerStore)

module.exports= router