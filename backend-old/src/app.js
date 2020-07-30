const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const passport = require('passport/lib');
const helmet = require('helmet');
const flash = require('connect-flash/lib');
const mongoose = require('mongoose');
const initAdmin = require('./tools/initAdmin');
const specs = require('./tools/specs');
const cors = require('cors');

require('./models/user');
require('./models/category');
require('./models/project');
require('./tools/passport');

mongoose.Promise = global.Promise;
mongoose.connect(specs.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, initAdmin);

const publicRouter = require('./routes/public');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/admin/user');
const educationRouter = require('./routes/admin/education');
const skillRouter = require('./routes/admin/skill');
const assetRouter = require('./routes/admin/asset');
const categoryRouter = require('./routes/admin/category');
const projectRouter = require('./routes/admin/projects');
const app = express();

app.locals.moment = require('moment/moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Helmet
app.use(helmet());

//Cors
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//favicon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', publicRouter);
app.use('/project', publicRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', passport.authenticate('jwt', {session: false}), userRouter);
app.use('/api/education', passport.authenticate('jwt', {session: false}), educationRouter);
app.use('/api/skill', passport.authenticate('jwt', {session: false}), skillRouter);
app.use('/api/asset', passport.authenticate('jwt', {session: false}), assetRouter);
app.use('/api/category', passport.authenticate('jwt', {session: false}), categoryRouter);
app.use('/api/project', passport.authenticate('jwt', {session: false}), projectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
