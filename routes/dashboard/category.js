const express = require('express')
const router= express.Router()
const {createNewCategoryForStore, handleGetAllCategoriesByStore, handleGetCategoryById} = require('../../controllers/CategoryController')
const {authenticateUser, authorizeAccess} = require('../../middlewares/auth')
const {checkStoreAccess} = require('../../middlewares/storeAccess')

router.route('/categories/:id')
    .get(handleGetCategoryById)

router.route('/stores/:storeId/categories')
    .get(authorizeAccess(['vendor-admin', 'store-manager']), checkStoreAccess, handleGetAllCategoriesByStore)
    .post( authorizeAccess(['vendor-admin', 'store-manager']), checkStoreAccess, createNewCategoryForStore)


module.exports= router