var ensureAuthenticated = require('../../tools/tools').ensureAuthenticated;
var express = require('express');
var router = express.Router();
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

router.get('/', ensureAuthenticated, function (req, res, next) {
    return res.render('admin/dashboard/index', {
        title: 'Dashboard',
        layout: 'dashboardLayout'
    });
});

router.get('/login', function (req, res, next) {
    console.log(process.env);
    if (req.isAuthenticated()) {
        return res.redirect('/admin');
    } else {
        return res.render('admin/login', {
            title: 'Sign in',
            layout: 'layout'
        });
    }
});

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        return done(err, user);
    });
});

passport.use('local', new LocalStrategy(function (username, password, done) {
    User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            console.log('Unknown user!');
            return done(null, false, {message: 'Unknown user!'});
        }

        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                console.log('Invalid password!');
                return done(null, false, {message: 'Invalid password!'});
            }
        });
    })
}));

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/admin/login',
    failureFlash: 'Invalid username or password!'
}, null), function (req, res) {
    console.log('Good');
    req.flash('success', 'logged in successfully!');
    return res.redirect('/admin');
});

router.get('/logout', function (req, res, next) {
    if (req.isAuthenticated()) {
        req.logout();
        req.flash('success', 'Logged out successfully!');
    }
    return res.redirect('/admin/login');
});

router.get('/*', function (req, res, next) {
    if (!String(req.url).startsWith('/user')){
        return res.redirect('/admin');
    }
    return next();
});

module.exports = router;
