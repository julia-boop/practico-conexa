var express = require('express');
var router = express.Router();
var mainController = require('../controller/mainController')

router.post('/login', mainController.login);
router.get('/fetchPosts', mainController.fetchPosts);
router.get('/fetchPhotos', mainController.fetchPhotos);

module.exports = router;
