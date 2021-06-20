const _jwt = require('../utils/jwt');
const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res) => {
    let form = req.body;   
    const validateErr = validationResult(req);    
    if(validateErr.errors.length > 0) {
        let errors = validateErr.errors.map(e => e.msg);
        let err = {
            "success": false,
            "errors": errors,
            "status": 422
        }
        return res.status(422).json(err)
    }
    let query = [{account: form.account}, {email: form.email}];
    let user = await userModel.findOne({$or: query}).exec();
    if(user) {
        let err = {
            "success": false,
            "errors": ['Account already exists or Email already exists'],
            "status": 422
        }
        return res.status(422).json(err)
    }
    const userNew = await new userModel(form).save();
    const data = {
        "success": true,
        "data": {
            firstname: userNew.firstname,
            lastname: userNew.lastname,
            account: userNew.account,
            email: userNew.email,
            phone: userNew.phone,
            role: userNew.role
        },
        "status": 200
    }

    return res.status(200).json(data);
}

module.exports.login = async (req, res) => {
    let account = req.body.account; // account or email
    let password = req.body.password;    

    const validateErr = validationResult(req);    
    if(validateErr.errors.length > 0) {
        let errors = validateErr.errors.map(e => e.msg);
        let err = {
            "success": false,
            "errors": errors,
            "status": 422
        }
        return res.status(422).json(err)
    }
    let query = [{account: account, password: password}, {email: account, password: password}];
    let user = await userModel.findOne({$or: query}).exec();
    if(!user) {
        let err = {
            "success": false,
            "errors": ['Account Incorrect or Password Incorrect'],
            "status": 422
        }
        return res.status(422).json(err);
    }
    let payload = {account: user.account, email: user.email, role: user.role};  
    let token = _jwt.generateToken(payload);   
    let data = {
        "success": true,
        "data": {
            access_token: token,
            token_type: 'Bearer',
            expires_in: 1800 // 1800s
        },
        "status": 200
    }
    return res.status(200).json(data);
}

module.exports.logout = (req, res) => {
    let data = {
        "success": true,  
        "data": {},        
        "status": 200
    }
    return res.status(200).json(data);
}

module.exports.getProfile = async (req, res) => {
    let payload = req.payload;
    let email = payload.email;
    let profile = await userModel.findOne({email: email});  
    let data = {
        "success": true,
        "data": profile,
        "status": 200
    }
    return res.status(200).json(data);
}