const jwt = require('jsonwebtoken')
const JWT_SECRET = "secret"
const { User } =require ('../db')

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authorization_header = req.headers.authorization
    if(!authorization_header || !authorization_header.startsWith('Bearer')){
        res.status(400).json({Error: "Invalid Authorization token in header"})
    }
    const [bearer, token] = authorization_header.split(' ')

    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded && decoded.username){
           const user = await User.findOne({username: decoded.username})
           if(user){
            next()
           }else{
            res.status(400).json({Error: "User Not Authorised"})
           }
        }
    }catch(err){
        res.status(400).json({Error: "Invalid Authorization token in header"})
    }
}

module.exports = userMiddleware;