const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => {   
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '1800s' })
}

module.exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET)
}