// schema for register db
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        index: true
    },
    lastName: {
        type: String,
        index: true
    },
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }

});
// users schema is exported
var users = module.exports = mongoose.model('users', userSchema);