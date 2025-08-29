const express = require('express')
const router= express.Router()
const {handleCreateNewOrder, handleGetCustomerOrdersPerStore, handleGetCustomerOrderbyId} = require('../../controllers/public/OrderController')
const {checkOrderAccess} = require('../../middlewares/orderAccess')

router.post('/orders', handleCreateNewOrder )

router.route('/stores/:storeId/orders').get(handleGetCustomerOrdersPerStore)

router.get('/orders/:orderId',checkOrderAccess, handleGetCustomerOrderbyId)
module.exports= router
