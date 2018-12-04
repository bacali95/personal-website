const express = require("express");
const router = express.Router();
const passport = require("passport");
const ensureAuthenticated = require("../../tools/ensureAuthenticated");

router.get("/", ensureAuthenticated, function (req, res, next) {
    return res.render("admin/dashboard/index", {
        title: "Dashboard",
        layout: "dashboardLayout"
    });
});


router.get("/login", function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/admin");
    } else {
        return res.render("admin/login", {
            title: "Sign in",
            layout: "layout",
            fromURL: req.query.fromURL
        });
    }
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/admin/login",
    failureFlash: "Invalid username or password!"
}), function (req, res) {
    req.session.save(function (err) {
        if (err){
            throw err;
        }
        if (req.query.fromURL) {
            return res.redirect(req.query.fromURL);
        }
        return res.redirect("/admin");
    });
});

router.get("/logout", function (req, res, next) {
    if (req.isAuthenticated()) {
        req.logout();
    }
    return res.redirect("/admin/login");
});

router.get("/*", function (req, res, next) {
    const regex = /^((\/user)|(\/project)|(\/category))/g;
    if (!String(req.url).match(regex)) {
        return res.redirect("/admin");
    }
    return next();
});

module.exports = router;
