const newsModel = require('../models/news.model');
const userModel = require('../models/user.model');
const postsModel = require('../models/posts.model');

module.exports.get = async (req, res) => {    
    let payload = req.payload;
    let email = payload.email;
    let user = await userModel.findOne({email: email}).exec();
    let userId = user._id;
    let posts = await postsModel.find({_user: userId}).exec();
    let arrNews = [];
    await Promise.all(posts.map( async (item) => {
        let news = await newsModel.findById(item._news).exec();       
        arrNews.push(news);
    }));
    
    let data = {
        "success": true,
        "data": arrNews,
        "status": 200
    }
    return res.status(200).json(data);
}
module.exports.post = async (req, res) => {
    let form = req.body;
    let payload = req.payload;
    let email = payload.email;    

    if(!form.title || !form.slug || !form.content) {
        let err = {
            "success": false,
            "errors": ['Title is required', 'Slug is required', 'Content is required'],
            "status": 422
        }
        return res.status(422).json(err);
    }    
    let newsNew = await newsModel(form).save();
    let newsId = newsNew._id;
    let user = await userModel.findOne({email: email}).exec();
    let userId = user._id; 

    // Add idUser, idNews to posts
    await postsModel({
        _user: userId,
        _news: newsId
    }).save();
    let data = {
        "success": true,
        "data": newsNew,
        "status": 200
    }
    return res.status(200).json(data);
}
module.exports.put = async (req, res) => {
    let id = req.params['id'];
    let form = req.body;
    let slug = form.title.replace(/ /g, '-');
    if(slug != form.slug) {
        let err = {
            "success": false,
            "errors": ['Title not match slug'],
            "status": 422
        }
        return res.status(422).json(err);
    }
    let newsUpdate = await newsModel.findByIdAndUpdate(id, form, {new: true}).exec();       
    let data = {
        "success": true,
        "data": newsUpdate,
        "status": 200
    }
    return res.status(200).json(data);
}
module.exports.delete = async (req, res) => {
    let id = req.params['id'];
    await postsModel.findOneAndDelete({_news: id}).exec();
    await newsModel.findByIdAndDelete(id).exec();
    let data = {
        "success": true,
        "data": {},
        "status": 200
    }
    return res.status(200).json(data);
}