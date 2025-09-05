const Product= require('../../models/product')

async function handleCreateNewProduct(req, res){
    try {
        const {storeId} = req.params
        const {categoryId, name, description, hasVariants, price, sku} = req.body
        console.log(req.files)
        const imgPaths = req.files.map(file => file.path) //array contains paths of all files

        await Product.create({
            storeId: storeId,
            categoryId,
            name,
            description,
            hasVariants,
            price,
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
        const {productId} = req.params
        const product = await Product.findById(productId)
        return res.json(product)
    }catch(err){
        console.log(err)
        return res.status(500).json("failed to fetch product")
    }
}

async function handleUpdateProductById(req, res){
    try{
        const {productId} = req.params
        const {name, description, sku, price, hasVariants} = req.body
        const updatedProduct = await Product.findByIdAndUpdate(productId, {name, description, sku, price, hasVariants}, {new:true, runValidators:true})
        return res.status(201).json(updatedProduct)
    }catch(err){
        console.log(err)
        return res.status(500).json("Failed to update product")
    }
}

async function handleDeleteProductById(req, res){
    try{
        const {productId}= req.param
        await Product.findByIdAndUpdate(productId, {isActive:false})
        return res.json({msg: "Product Deactivated"})
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Server Error"})
    }
}

module.exports= {handleCreateNewProduct, handleGetAllProductsByStore, handleGetProductById, handleUpdateProductById, handleDeleteProductById}