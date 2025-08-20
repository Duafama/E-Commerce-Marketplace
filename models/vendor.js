const mongoose = require('mongoose')
const vendorSchema = new mongoose.Schema({
    businessName:{
        type: String,
        required: true
    },
    ownerName:{
        type: String,
        required: true
    },
    contactEmail:{
        type: String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//this is basically a vendor/business profile and it 
module.exports = mongoose.model("vendor", vendorSchema)