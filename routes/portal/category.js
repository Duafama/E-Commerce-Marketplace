const express = require('express')
const router= express.Router()
const {createNewCategoryForStore, handleGetAllCategoriesByStore, handleGetCategoryById} = require('../../controllers/portal/CategoryController')
const {checkStoreAccess} = require('../../middlewares/storeAccess')
const {checkCategoryAccess}= require('../../middlewares/categoryAccess')

router.route('/categories/:id')
    .get(checkCategoryAccess, handleGetCategoryById)

router.route('/stores/:storeId/categories')
    .get(checkStoreAccess, handleGetAllCategoriesByStore)
    .post(checkStoreAccess, createNewCategoryForStore)


module.exports= router