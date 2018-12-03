const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        return done(err, user);
    });
});

passport.use("local", new LocalStrategy(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
        if (err || !user) {
            return done(null, false, {message: "Unknown user!"});
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) {
                return done(null, false, {message: "Internal error!"});
            }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: "Invalid password!"});
            }
        });
    })
}));