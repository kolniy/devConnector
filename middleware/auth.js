const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({msg: 'No Token. Authorization Denied'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}

module.exports = auth