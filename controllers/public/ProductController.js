const Product= require('../../models/product')
const Variant= require('../../models/variant')

//api-key check before this!!!
async function handleGetAllProductsByStorePublic(req, res){
    try{
        const storeId= req.storeId
        const {categoryId, sort} = req.query
        const queryObj= {storeId: storeId, isActive:true}

        if(categoryId){
            queryObj.categoryId= categoryId
        }
        
        const query= Product.find(queryObj)
        if(sort){
            query.sort(sort)
        }

        const page= req.query.page || 1
        const limit= req.query.limit || 20
        const skip= (page-1)*limit

        query.skip(skip).limit(limit)

        const products= await query

        if(products.length===0) return res.status(404).json({error: "No Products Found"})
        let finalproducts=[]
        let price=0
        for(const product of products){
            if(product.hasVariants){
                const variant = await Variant.findOne(product.productId)
                price= variant.price
            }
            else{
                price= product.price
            }

            finalproducts.push({
                productId: product._id,
                name: product.name,
                image: product.images?.[0],
                stockStatus: product.stock<=0 ? "Out of Stock" : "In stock",
                Price: price
            })
        }
        return res.json({items: finalproducts.length, finalproducts})
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Failed to fetch products")
    }
}

// /api/products/:productId 
//api-key check before this!!!
async function handleGetProductByIdPublic(req, res){
    try {
        const {productId} = req.params
        const storeId= req.storeId

        const product = await Product.findOne({_id: productId, storeId: storeId, isActive:true})
        let finalProduct= {
            productId: productId,
            name: product.name,
            description: product.description,
            images: product.images,
        }
        if(product.hasVariants){
            const variants= await Variant.find({productId}).select("attributes images price stock ")
            finalProduct.variants= variants.map(variant=> ({
                attributes: variant.attributes,
                price: variant.price,
                stockStatus:  variant.stock<=0 ? "Out of Stock" : "In Stock",
                images: variant.images
            }))
        }
        else {
            finalProduct.price= product.price
            finalProduct.stockStatus= product.status
        }

        return res.json(finalProduct)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Server error"})
    }
}

module.exports= {handleGetAllProductsByStorePublic, handleGetProductByIdPublic}