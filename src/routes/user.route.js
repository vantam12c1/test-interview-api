const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');

router.get('/', validate.checkAuth, user.get);
router.put('/:id', validate.checkAuth, user.put);
router.delete('/:id', validate.checkAuth, user.delete);

module.exports = router;