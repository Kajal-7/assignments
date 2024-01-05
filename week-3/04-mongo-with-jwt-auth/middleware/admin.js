const jwt = require('jsonwebtoken')
const JWT_SECRET = "secret"
const { Admin } = require ('../db')

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authorization_header = req.headers.authorization
    if(authorization_header && authorization_header.startsWith("Bearer")){
        const words = authorization_header.split(' ')
        const token = words[1]

        try{
            const decoded_admin = jwt.verify(token, JWT_SECRET)
            if(decoded_admin && decoded_admin.username){
                const user = await Admin.findOne({username: decoded_admin.username})
                if(user){
                    next()
                }else{
                    res.status(400).json({Error: "Not Authorised"})
                }
            }

        }catch(err){
            res.status(400).json({Error: 'Invalid token'})
        }

    }
    else{
        res.status(400).json({Error: "Invalid Authorization token"})
    }
}

// Middleware to check does username unique when signing up
async function validateUsername(req, res, next){
    const username = req.body.username;
    const user = await Admin.findOne({username: username})
    if(user){
        res.send("Username already exists")
    }else{
        next()
    }
}

module.exports = {
    adminMiddleware,
    validateUsername
};