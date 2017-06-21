var users = require('../models/users');
let request = require('request');
module.exports = {
    
    register: function(req,res){
    console.log('insideeee');
    var firstName=req.body.firstName;
    var lastName=req.body.lastName;
    var userName=req.body.userName;
    var email=req.body.email;
    var password=req.body.password;
    var cpassword=req.body.cpassword;
  
        var newUser = new users({
            firstName : firstName,
            lastName : lastName,
            userName : userName,
            email : email,
            password : password
        });  
        var db = new users(newUser);
    
      db.save(function (err, db) {  
        if (err) {
            res.send(err);
        } else {
          res.redirect('/login.html');
        }
    });
},
     
login:function(req,res){
        console.log('inside log');
        users.findOne({userName:req.body.userName},function(err, data){
            if(data===null){
                res.redirect('/register.html');
            }
            else{
                console.log('inside else');
                console.log(data);
                if(req.body.userName===data.userName && req.body.password === data.password){
                    console.log('inside if');
                    res.redirect('/home.html');
                }
            }
        });
}

};