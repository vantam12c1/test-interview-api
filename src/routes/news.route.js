const express = require('express');
const router = express.Router();
const news = require('../controllers/news.controller');
const validate = require('../middleware/validate.middleware');

router.get('/', validate.checkAuth, news.get);
router.post('/', validate.checkAuth, news.post);
router.put('/:id', validate.checkAuth, news.put);
router.delete('/:id', validate.checkAuth, news.delete);

module.exports = router;