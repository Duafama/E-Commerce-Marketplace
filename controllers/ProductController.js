const Product= require('../models/product')
const Store= require('../models/store')

async function handleCreateNewProduct(req, res){
    try {
        const {storeId} = req.params
        const {categoryId, name, description, price, stock, sku} = req.body

        const imgPaths = req.files.map(file => file.path) //array containing paths of all files

        await Product.create({
            storeId: storeId,
            categoryId,
            name,
            description,
            price,
            stock,
            sku,
            images: imgPaths
        })

        return res.status(201).json("Product created successfully")
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetAllProductsByStore(req, res){
    try {
        const {storeId} = req.params
        const products = await Product.find({storeId: storeId})
        if(products.length===0) return res.status(404).json("products not found")
        return res.json(products)
    } catch (err) {
        console.log(err)
        return res.status(500).json("server error")
    }
}

async function handleGetProductById(req, res){
    try{
        const product = req.product
        return res.json(product)
    }catch(err){
        console.log(err)
        return res.status(500).json("failed to fetch product")
    }
}

async function handleUpdateProductById(req, res){
    try{
        const {productId} = req.params
        const {name, description, sku, price } = req.body
        const updatedProduct = await Product.findByIdAndUpdate(productId, {name, description, sku, price}, {new:true, runValidators:true})
        return res.status(201).json(updatedProduct)
    }catch(err){
        console.log(err)
        return res.status(500).json("Failed to update product")
    }
}

module.exports= {handleCreateNewProduct, handleGetAllProductsByStore, handleGetProductById, handleUpdateProductById}