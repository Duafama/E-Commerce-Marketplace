const ApiKey = require('../models/apiKey')
const crypto= require('crypto')

async function checkApiKey(req, res, next){
    try{
        const key= req.headers['x-api-key']
        if(!key) return res.status(401).json("Api key required")

        const hashedKey= crypto.createHash('sha256').update(key).digest('Hex')

        const keyRecord= await ApiKey.findOne({apiKey: hashedKey})
        if(!keyRecord) return res.status(403).json("Invalid Api key")
        
        req.storeId= keyRecord.storeId
        req.vendorId= keyRecord.vendorId
        next()
    }catch(err){
        console.log(err)
        return res.status(500).json("Server error")
    }
}

module.exports= {checkApiKey}