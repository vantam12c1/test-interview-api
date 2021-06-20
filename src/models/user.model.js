const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    account: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: String,
    role: {type: String, default: 'Staff'}   
})
const User = mongoose.model('User', schema);

module.exports = User;