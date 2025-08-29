const Variant = require('../../models/variant')


async function handleGetVariantsOfProduct(req, res){
    try {
        const {productId} = req.params
        const variants= await Variant.find({productId: productId})
        if(variants.length===0) return res.status(404).json("Variants not found")
        return res.json(variants)
    } catch (err) {
        console.log(err) 
        return res.status(500).json("Failed to fetch variants")
    }
}

// /products/:productId/variants, checkProductAccess
async function handleCreateVariantOfProduct(req, res){
    try {
        const {productId} = req.params
        const {attributes, sku, price}= req.body
        const att = JSON.parse(attributes)
        const imgPath= req.files.map(file => file.path) 

        await Variant.create({
            productId,
            images:imgPath,
            attributes: att,
            sku,
            price: price 
        })

        return res.status(201).json("Variant Created Successfully")
    } catch (err) {
        console.log(err)
        return res.status(500).json("Failed to create variant")
    }
}

async function handleGetVariantById(req, res){
    try {
        const {variantId} = req.params
        const variant = await Variant.findById(variantId)
        return res.json(variant)
    } catch (err) {
        console.log(err)
        return res.status(500).json('failed to fetch variant')
    }
}

async function handleUpdateVariantById(req, res){
    try {
        const {variantId} = req.params
        const {attributes, sku, price} = req.body
        const updatedVariant = await Variant.findByIdAndUpdate(variantId, {attributes, sku, price}, {new:true, runValidators:true})
        return res.json(updatedVariant)
    } catch (err) {
        console.log(err)
        return res.status(500).json("failed to update variant")
    }
}

module.exports= {handleGetVariantsOfProduct, handleCreateVariantOfProduct, handleGetVariantById, handleUpdateVariantById}