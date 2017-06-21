var express = require('express');
 var path = require('path');
 var cookieParser=require('cookie-parser');
 var expressHandlebars=require('express-handlebars');
 var expressValidator=require('express-validator');
 var flash=require('connect-flash');
 var session=require('express-session');
 var passport=require('passport');
 var localStrategy=require('passport-local').Strategy;
 var mongo=require('mongodb');
 var mongoose=require('mongoose');
 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/mydb');
 var db=mongoose.connection;
  var favicon = require('serve-favicon');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
    
     var routes = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/html')));

// express session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

// passport initialize
app.use(passport.initialize());
app.use(passport.session());

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect flash
app.use(flash());

//global variables
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error-msg');
    res.locals.error=req.flash('error');
    next(); 
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(5000,function(){
    console.log('server started');
});

module.exports = app;
