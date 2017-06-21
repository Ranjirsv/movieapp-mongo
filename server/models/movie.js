var mongoose = require('mongoose');
var movieSchema = mongoose.Schema({
    Title: {
        type : String,
        index : true,
        unique : true
    },
    Poster: {
        type : String,
        index :true
    },
    Release_Date: {
        type : String
    }
    
});

var movies = module.exports = mongoose.model('movies', movieSchema); 