const ensureAuthenticated = require('../../tools/ensureAuthenticated');
const express = require('express');
const router = express.Router();
const baseDIR = 'admin/dashboard/user/';

const User = require('../../models/user');

router.get('/', ensureAuthenticated, function (req, res, next) {
    User.getAllUsers(function (err, users) {
        if (err || !users) {
            users = [];
        }
        return res.render(baseDIR + 'listUser', {
            title: 'Users',
            layout: 'dashboardLayout',
            users: users
        });
    });
});

router.get('/add', ensureAuthenticated, function (req, res, next) {
    return res.render(baseDIR + 'addUser', {
        title: 'Add User',
        layout: 'dashboardLayout',
        user: new User()
    });
});

router.post('/add', ensureAuthenticated, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    var newUser = new User({
        username: username || '',
        password: password
    });
    User.createUser(newUser, function (err, user) {
        if (err) {
            req.flash('error', 'Adding User failed!');
            return res.redirect('/admin/user');
        }
        return res.redirect('/admin/user');
    });
});

router.get('/edit/:id', ensureAuthenticated, function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err || !user) {
            return res.redirect('/admin/user');
        }
        return res.render(baseDIR + 'editUser', {
            title: 'Edit User',
            layout: 'dashboardLayout',
            user: user
        });
    });
});

router.post('/edit/:id', ensureAuthenticated, function (req, res, next) {
    var password = req.body.password;
    var password2 = req.body.password2;

    var newUser = new User({
        _id: req.params.id,
        password: password || ''
    });

    User.getUserById(newUser._id, function (err, user) {
        if (err || !user) {
            req.flash('error', 'Updating user failed!');
            return res.redirect('/admin/user');
        }
        User.updateUser(user._id, newUser, function (err) {
            if (err) {
                req.flash('error', 'Updating User failed!');
                return res.redirect('/admin/user');
            }
            return res.redirect('/admin/user');
        });
    });
});

router.get('/delete/:id', ensureAuthenticated, function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err || !user) {
            return res.redirect('/admin/user');
        }
        User.remove({_id: user._id}, function (err) {
            if (err) {
                req.flash('error', 'Deleting User failed!');
                return res.redirect('/admin/user');
            }
            return res.redirect('/admin/user');
        })
    });
});

router.get('/*', function (req, res, next) {
    return res.redirect('/admin/user');
});

module.exports = router;
