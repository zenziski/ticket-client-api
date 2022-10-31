const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const User = require('../models/User')
const Auth = async (req, res, next) =>{
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0].toLocaleLowerCase() === 'bearer') 
        token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret)
        if(decoded && decoded.id){
            const user = await User.findOne({_id: decoded.id}, {password: 0, __v: 0});
            req.user = user
        }
        next()
    } catch (error) {
        return res.status(400).json("Token inválido")
    }
    
}

module.exports = Auth