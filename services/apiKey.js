const crypto = require('crypto')
const ApiKey = require('../models/apiKey')
require('dotenv').config()

async function generateApiKey(storeId, vendorId){
    try{
        const key = crypto.randomBytes(32).toString('Hex') 

        const hashedKey= crypto.createHash('sha256').update(key).digest('Hex')

        await ApiKey.create({
            storeId,
            vendorId,
            apiKey: hashedKey
        })

        return key
    }
    catch(err){
        throw new Error("Failed to generate API key")
    }
}
 
module.exports= {generateApiKey}