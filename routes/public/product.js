const express = require('express')
const router= express.Router()
const {handleGetAllProductsByStorePublic ,handleGetProductByIdPublic}= require('../../controllers/public/ProductController')

router.get('/products', handleGetAllProductsByStorePublic)
router.get('/products/:productId',handleGetProductByIdPublic )

module.exports= router