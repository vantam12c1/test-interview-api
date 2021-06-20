const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    slug: String,
    content: String,    
})
const News = mongoose.model('News', schema);

module.exports = News;