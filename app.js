var specs = require('./tools/specs');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var favicon = require('serve-favicon');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var helmet = require('helmet');
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var publicRouter = require('./routes/public');
var adminRouter = require('./routes/admin/index');
var usersRouter = require('./routes/admin/users');
var app = express();


console.log(specs.DB_URL);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Handle file uploads
app.use(multer({destination: path.join(__dirname, 'public', 'images', 'uploads')}).any());

//Helmet
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Handle express sessions
app.use(session({
    secret: 'bacalisecret',
    saveUninitialized: true,
    resave: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//favicon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use('/', publicRouter);
app.use('/admin', adminRouter);
app.use('/admin/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
