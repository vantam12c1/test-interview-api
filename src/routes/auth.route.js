const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');

router.post('/register', validate.register(), auth.register);
router.post('/login', validate.login(), auth.login);
router.post('/logout', auth.logout);
router.get('/profile', validate.checkAuth, auth.getProfile);

module.exports = router;