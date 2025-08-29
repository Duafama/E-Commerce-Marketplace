const mongoose = require('mongoose')
const apiKeySchema= new mongoose.Schema({
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
        required: true
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
        required: true
    },
    apiKey:{
        type:String,
        required:true,
    },
})

module.exports= mongoose.model('apiKey', apiKeySchema)