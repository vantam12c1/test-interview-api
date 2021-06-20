const userModel = require('../models/user.model');

module.exports.get = async (req, res) => {
    let payload = req.payload;
    let email = payload.email;
    let role = payload.role;

    if(role == "Admin") {
        let user = await userModel.find({}).exec();    
        let data = {
            "success": true,
            "data": user,
            "status": 200
        }
        return res.status(200).json(data);
    } else {
        let user = await userModel.findOne({email: email}).exec();    
        let data = {
            "success": true,
            "data": user,
            "status": 200
        }
        return res.status(200).json(data);
    }
}
module.exports.put = async (req, res) => {
    let id = req.params['id'];
    let form = req.body;   
    let userUpdate = await userModel.findByIdAndUpdate(id, form, {new: true}).exec();       
    let data = {
        "success": true,
        "data": userUpdate,
        "status": 200
    }
    return res.status(200).json(data);   
}
module.exports.delete = async (req, res) => {
    let id = req.params['id'];
    await userModel.findByIdAndDelete(id).exec();
    let data = {
        "success": true,
        "data": {},
        "status": 200
    }
    return res.status(200).json(data);
}