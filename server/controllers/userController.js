var users = require('../models/users');
let request = require('request');
module.exports = {

// register method 

    register: function(req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var userName = req.body.userName;
        var email = req.body.email;
        var password = req.body.password;
        var cpassword = req.body.cpassword;

// datas are added in to an new object

        var newUser = new users({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password
        });
        
// object is added into db
        
        var db = new users(newUser);

        db.save(function(err, db) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/login.html');
            }
        });
    },

// login method 

    login: function(req, res) {
        users.findOne({
            userName: req.body.userName
        }, function(err, data) {
            if (data === null) {
                res.redirect('/register.html');
            } else {

// checking the entered data and db's data are equal or not

                if (req.body.userName === data.userName && req.body.password === data.password) {
                    console.log('inside if');
                    res.redirect('/home.html');
                }
            }
        });
    }

};