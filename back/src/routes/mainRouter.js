var express = require('express');
var router = express.Router();
var mainController = require('../controller/mainController')
var jwt = require('jsonwebtoken');
var verifyJWT = require("../middlewares/verificationJWT");




router.post('/login', mainController.login);
router.get('/userAuth', verifyJWT, mainController.authentication);
router.get('/fetchPosts', mainController.fetchPosts);
router.get('/fetchPhotos', mainController.fetchPhotos);

module.exports = router;
