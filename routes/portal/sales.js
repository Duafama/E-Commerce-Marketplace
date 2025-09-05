const express= require('express')
const router= express.Router()

const{getVendorSalesReport}= require('../../controllers/portal/SalesAndAnalytics')
const { authorizeAccess } = require('../../middlewares/auth')

router.get('/vendors/sales', authorizeAccess(['vendor-admin']), getVendorSalesReport)

module.exports= router