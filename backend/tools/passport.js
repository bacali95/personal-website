const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const User = require('../models/user');

passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({username: username});
    if (!user) {
      return done(null, false, {message: 'User not found'});
    }
    const validate = await User.isValidPassword(username, password);
    if (!validate) {
      return done(null, false, {message: 'Wrong Password'});
    }
    return done(null, user, {message: 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('token'),
    secretOrKey: 'top_secret'
  }, async function (jwtPayload, callback) {
    const user = await User.findOne({_id: jwtPayload.user._id});
    return callback(null, user);
  }
));
