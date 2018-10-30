var ensureAuthenticated = require('../../tools/tools').ensureAuthenticated;
var express = require('express');
var router = express.Router();

var User = require('../../models/user');

router.get('/', ensureAuthenticated, function (req, res, next) {
    User.getAllUsers(function (err, users) {
        if (err) throw err;
        if (!users) {
            return res.render('admin/dashboard/listUser', {
                title: 'Dashboard',
                layout: 'dashboardLayout',
                users: []
            });
        }
        return res.render('admin/dashboard/listUser', {
            title: 'Dashboard',
            layout: 'dashboardLayout',
            users: users
        });
    });
});

router.get('/add', ensureAuthenticated, function (req, res, next) {
    return res.render('admin/dashboard/addUser', {
        title: 'Add User',
        layout: 'dashboardLayout'
    });
});

router.post('/add', ensureAuthenticated, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('password2', 'Passwords do not match!').equals(password);

    var errors = req.validationErrors();

    if (errors) {
        return res.render('admin/dashboard/addUser', {
            errors: errors,
            username: username,
            password: password
        });
    } else {
        var newUser = new User({
            username: username,
            password: password
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            req.flash('success', 'User added successfully');
            return res.redirect('/admin/user');
        });
    }

});

router.get('/edit/:id', ensureAuthenticated, function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.redirect('/admin/user');
        }
        return res.render('admin/dashboard/editUser', {
            title: 'Edit User',
            layout: 'dashboardLayout',
            user: user
        });
    });
});

router.post('/edit/:id', ensureAuthenticated, function (req, res, next) {
    var newUser = new User({
        _id: req.params.id,
        password: req.body.password
    });
    var password2 = req.body.password2;

    req.checkBody('password2', 'Passwords do not match!').equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
        return res.render('admin/dashboard/editUser', {
            errors: errors,
            user: newUser
        });
    } else {
        console.log(newUser);
        User.getUserById(newUser._id, function (err, user) {
            if (err) throw err;
            if (!user) {
                req.flash('error', 'Updating user failed!');
                return res.redirect('/admin/user');
            }
            User.updateUser(user._id, newUser, function (err) {
                if (err) throw err;
                req.flash('success', 'User updated successfully');
                return res.redirect('/admin/user');
            });
        });
    }
});

router.get('/delete/:id', ensureAuthenticated, function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.redirect('/admin/user');
        }
        User.remove({_id: user._id}, function (err) {
            if (err) throw err;
            req.flash('success', 'User deleted successfully');
            return res.redirect('/admin/user');
        })
    });
});

router.get('/*', function (req, res, next) {
    return res.redirect('/admin/user');
});

module.exports = router;
