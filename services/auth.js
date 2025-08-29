const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


function signUser(user){
    try{
        return jwt.sign(user, process.env.JWT_SECRET)
    }
    catch(err){
        console.log(err)
        return null
    }
}

function getUser(token){
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(err){
        console.log(err)
        return null
    }
}

async function hashPassword(password){
    return await bcrypt.hash(password, 10)
}

async function verifyPassword(password, hash){
    return bcrypt.compare(password, hash)
}




module.exports = {hashPassword, verifyPassword, signUser, getUser} 
