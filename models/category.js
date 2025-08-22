const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store",
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports= mongoose.model('category', categorySchema)