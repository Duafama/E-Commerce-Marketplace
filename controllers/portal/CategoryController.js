//Category Management
const Category = require('../../models/category')

async function createNewCategoryForStore(req, res){
    try{
        const {storeId}= req.params
        const {name}= req.body

        await Category.create({
            storeId,
            name
        })
        return res.status(201).json("category created")
    }catch(err){
        console.log(err)
        res.status(500).json("failed to create category")
    }
}

async function handleGetAllCategoriesByStore(req, res){
    try{
        const storeCategories= await Category.find({storeId: req.params.storeId})
        if(storeCategories.length===0) return res.status(404).json("No categories found")
        return res.json(storeCategories)
    }catch(err){
        console.log(err)
        return res.status(500).json("failed to fetch categories by a Store")
    }
}

async function handleGetCategoryById(req, res){
    try{
        const category= await Category.findById(req.params.id)
        if(!category) return res.status(404).json("category not found")
        return res.json(category)
    }catch(err){
        console.log(err)
        return res.status(500).json('failed to fetch category')
    }
}

//we'll see about update, delete later on

module.exports= {createNewCategoryForStore, handleGetAllCategoriesByStore, handleGetCategoryById}

 