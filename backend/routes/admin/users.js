const ensureAuthenticated = require("../../tools/ensureAuthenticated");
const express = require("express");
const router = express.Router();
const baseDIR = "admin/dashboard/user/";

const User = require("../../models/user");

router.get("/", ensureAuthenticated, async function (req, res, next) {
    const users = await User.getAll();

    return res.render(baseDIR + "listUser", {
        title: "Users",
        layout: "dashboardLayout",
        users
    });
});

router.get("/add", ensureAuthenticated, function (req, res, next) {
    return res.render(baseDIR + "addUser", {
        title: "Add User",
        layout: "dashboardLayout",
        user: new User()
    });
});

router.post("/add", ensureAuthenticated, async function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    await User.create(username, password).catch(() => {
        req.flash("error", "Adding User failed!");
        return res.redirect("/admin/user");
    });

    return res.redirect("/admin/user");
});

router.get("/edit/:id", ensureAuthenticated, async function (req, res, next) {
    const user = await User.getById(req.params.id).catch(() => res.redirect("/admin/user"));

    return res.render(baseDIR + "editUser", {
        title: "Edit User",
        layout: "dashboardLayout",
        user
    });
});

router.post("/edit/:id", ensureAuthenticated, async function (req, res, next) {
    const password = req.body.password;

    await User.update(req.params.id, password).catch(() => {
        req.flash("error", "Updating User failed!");
        return res.redirect("/admin/user");
    });

    return res.redirect("/admin/user");
});

router.get("/delete/:id", ensureAuthenticated, function (req, res, next) {
    User.remove(req.params.id).catch(() => {
        req.flash("error", "Deleting User failed!");
        return res.redirect("/admin/user");
    });

    return res.redirect("/admin/user");
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/user");
});

module.exports = router;
