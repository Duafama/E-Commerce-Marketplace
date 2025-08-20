const {getUser} = require('../services/auth')


async function authenticateUser(req, res, next){
    const authHeader=  await req.headers['authorization']
    req.user=null
    if(!authHeader || !authHeader.startsWith('Bearer')) return next()
    const token= authHeader.split('Bearer ')[1]
    const user =  getUser(token)
    // console.log(user)
    if(!user) return res.json({msg: 'Incorrect token'})
    req.user = user
    next()
}

function authorizeAccess(roles= []){
    return function (req, res, next){
        if (!req.user) return res.json({error:"User not logged in"})
        
        if(roles.length && !roles.includes(req.user.role))
             return res.json("Unauthorized Access")

        return next()
        }
}


module.exports = {authenticateUser, authorizeAccess}
