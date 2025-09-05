const express = require('express')
const router= express.Router()
const {getAllCategoriesByStore} = require('../../controllers/public/CategoryController')

router.get('/categories', getAllCategoriesByStore)


module.exports= router