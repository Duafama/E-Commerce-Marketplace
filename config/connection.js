const mongoose = require('mongoose')

function connectdb(url){
    mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Connection error:', err));
}

module.exports = {connectdb};