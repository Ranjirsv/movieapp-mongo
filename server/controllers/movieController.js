let request = require('request');
var movies = require('../models/movie');
module.exports = {
    
    search: function(req,res){
    console.log('enter search');
    request.get('https://api.themoviedb.org/3/search/movie?api_key=3d34e72c9badeb4e4254c09ec0109d8e&language=en-US&query='+req.query.name+'&page=1&include_adult=false',function(err,response,body){
  
   if(!err && response.statusCode === 200){
       
        res.send(response.body);
        
    }  else{
        res.send('error occured in route');
    }  
    });
},

addFav: function(req,res){
    console.log('enter addfav');
    console.log(req.body.Title);
    var add = {
        Title: req.body.Title,
        Poster:req.body.Poster,
        Release_Date:req.body.Release_Date
    };
    console.log(add);
    var db=new movies(add);
   db.save(function (err, db) {  
        if (err) {
            res.send(err);
        } else {
          res.send("Success");
        }
    }); 
},

viewFav : function(req,res){
    console.log('inside viewFave');
    movies.find(function(err, data){
        if(err)throw err;
        else{
            res.send(data);
        }
        
    });
},

deleteFav : function(req,res){
    console.log(req.query.Title);
    console.log('inside deleteeee');
    var title = req.query.Title;
    console.log(title);
     movies.remove({Title:title},function(err,data){
        if(err)
        throw err;
        else
         {   
         res.send("success");
    }
});
}

};