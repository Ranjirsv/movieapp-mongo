var express = require('express');
var router = express.Router();
const request=require('request');
//var users = require('../models/users')
var movieController= require('../controllers/movieController');
var userController= require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', movieController.search);

router.post('/addFav', movieController.addFav);

router.get('/viewFav', movieController.viewFav);

router.post('/deleteFav', movieController.deleteFav);

router.post('/register', userController.register);

router.post('/login', userController.login);


module.exports = router;
