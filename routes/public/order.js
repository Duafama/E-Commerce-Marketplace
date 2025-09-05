const express = require('express')
const router= express.Router()
const {handleCreateNewOrder, handleGetCustomerOrdersPerStore, handleGetCustomerOrderbyId} = require('../../controllers/public/OrderController')
const {checkOrderAccess} = require('../../middlewares/orderAccess')

router.post('/orders', handleCreateNewOrder )

router.get('/stores/:storeId/orders', handleGetCustomerOrdersPerStore)

router.get('/orders/:orderId',checkOrderAccess, handleGetCustomerOrderbyId)
module.exports= router
