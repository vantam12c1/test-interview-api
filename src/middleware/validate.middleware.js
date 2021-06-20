const _jwt = require('../utils/jwt');
const { check } = require('express-validator');

module.exports.register = () => {
    return [ 
        check('account', 'Account is required').not().isEmpty(),
        check('account', 'Account more than 6 degits').isLength({ min: 6 }),
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Invalid Email').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password more than 6 degits').isLength({ min: 6 }),
        check('phone', 'Phone must min 10 and max 11 number').isLength({ min: 10, max: 11 })
    ];    
}
module.exports.login = () => {
    return [ 
        check('account', 'Account is required').not().isEmpty(),
        check('account', 'Account more than 6 degits').isLength({ min: 6 }),        
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password more than 6 degits').isLength({ min: 6 }),      
    ];    
}
module.exports.checkAuth = (req, res, next) => {
    let checkHeadersAuth = req.headers['authorization'];
    if(checkHeadersAuth) { 
        let token = checkHeadersAuth.split(' ')[1];         
        try {
            let decode = _jwt.verifyToken(token, process.env.SECRET);
            req.payload = decode;
            next();
        } catch(error) {
            console.log(error)
            let err = {
                "success": false,
                "errors": ['Must login'],
                "status": 401 
            }
            return res.status(401).json(err);
        }        
    } else {
        let err = {
            "success": false,
            "errors": ['Must login'],
            "status": 401 
        }
        return res.status(401).json(err);
    }
}