const ensureAuthenticated = require("../../tools/ensureAuthenticated");
const express = require("express");
const router = express.Router();
const baseDIR = "admin/dashboard/user/";

const User = require("../../models/user");

router.get("/", ensureAuthenticated, function (req, res, next) {
    User.getAll(function (err, users) {
        if (err || !users) {
            users = [];
        }
        return res.render(baseDIR + "listUser", {
            title: "Users",
            layout: "dashboardLayout",
            users: users
        });
    });
});

router.get("/add", ensureAuthenticated, function (req, res, next) {
    return res.render(baseDIR + "addUser", {
        title: "Add User",
        layout: "dashboardLayout",
        user: new User()
    });
});

router.post("/add", ensureAuthenticated, function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.create(username, password, function (err) {
        if (err) {
            req.flash("error", "Adding User failed!");
            return res.redirect("/admin/user");
        }
        return res.redirect("/admin/user");
    });
});

router.get("/edit/:id", ensureAuthenticated, function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err || !user) {
            return res.redirect("/admin/user");
        }
        return res.render(baseDIR + "editUser", {
            title: "Edit User",
            layout: "dashboardLayout",
            user: user
        });
    });
});

router.post("/edit/:id", ensureAuthenticated, function (req, res, next) {
    const password = req.body.password;

    User.update(req.params.id, password, function (err) {
        if (err) {
            req.flash("error", "Updating User failed!");
            return res.redirect("/admin/user");
        }
        return res.redirect("/admin/user");
    });
});

router.get("/delete/:id", ensureAuthenticated, function (req, res, next) {
    User.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            req.flash("error", "Deleting User failed!");
            return res.redirect("/admin/user");
        }
        return res.redirect("/admin/user");
    })
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/user");
});

module.exports = router;
