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

module.exports = mongoose.model("vendor", vendorSchema)