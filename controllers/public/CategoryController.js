const Category = require('../../models/category')

async function getAllCategoriesByStore(req, res){
    try {
        const storeId= req.storeId
        const categories= await Category.find(storeId).select('name')
        return res.json(categories)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Server Error"})
    }
}

module.exports= {getAllCategoriesByStore}