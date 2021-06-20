const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    _news: {type: mongoose.Schema.Types.ObjectId, ref: 'News'}
})
const Posts = mongoose.model('Posts', schema);

module.exports = Posts;