var express = require('express');
var router = express.Router();
const request = require('request');
// controller methods
var movieController = require('../controllers/movieController');
var userController = require('../controllers/userController');

// calling search method in movie controller
router.get('/search', movieController.search);

// calling add fav movie in movieController
router.post('/addFav', movieController.addFav);

// calling vieFav method in controller
router.get('/viewFav', movieController.viewFav);

//delete movie method in movieController
router.post('/deleteFav', movieController.deleteFav);

// register method in user controller
router.post('/register', userController.register);

// login method usre controller
router.post('/login', userController.login);

module.exports = router;