var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var index = require('../index');
var movieController = require('../controllers/movieController'); 
var userController = require('../controllers/userController');
var movies = require('../models/movie');
var users = require('../models/users');
var url = request("http://localhost:5000");

var moviestub = sinon.stub(movies,'find');
var userstub = sinon.stub(users,'find');

//test case to find the movie in favourite list
describe('movie in favourite list',function(err){
       beforeEach(function(){
        moviestub.yields(null,[{'title':'irumugan'}]);
    });
       it('Matches the find movies',function(done){
           url       
           .get('/viewFav')  
           .expect(200)     
           .expect('Content-Type', /json/)  
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(res.body[0].title).to.be.equal('irumugan'); 
               done();
    });
  }); 
});


//test case to find the user in database
describe('Finds the user in Database ',function(err){
       beforeEach(function(){
        userstub.withArgs({username:'kavi'}).returns({"email":"kavi@gmail.com"});
    });
       it('Matches the User',function(done){
           url       
           .post('/register')  
           .expect(302)       
           .end(function(err, res){
               if (err) return done(err);     
               //Enter your assertions here  
               expect(userstub({username:'ksvi'}).email).to.be.equal("kavi@gmail.com"); 
               done();
    });
  }); 
});
