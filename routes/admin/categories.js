const ensureAuthenticated = require("../../tools/ensureAuthenticated");
const express = require("express");
const router = express.Router();
const baseDIR = "admin/dashboard/category/";

const Category = require("../../models/category");

router.get("/", ensureAuthenticated, function (req, res, next) {
    Category.getAllCategories(function (err, categories) {
        if (err || !categories) {
            categories = [];
        }
        return res.render(baseDIR + "listCategory", {
            title: "Categories",
            layout: "dashboardLayout",
            categories: categories
        });
    });
});

router.get("/add", ensureAuthenticated, function (req, res, next) {
    return res.render(baseDIR + "addCategory", {
        title: "Add Category",
        layout: "dashboardLayout",
        category: new Category()
    });
});

router.post("/add", ensureAuthenticated, function (req, res, next) {
    let name = req.body.name;

    Category.createCategory(new Category({name}), function (err, category) {
        if (err) {
            req.flash("error", "Adding Category failed!");
            return res.redirect("/admin/category");
        }
        return res.redirect("/admin/category");
    });
});

router.get("/edit/:id", ensureAuthenticated, function (req, res, next) {
    Category.findById(req.params.id, function (err, category) {
        if (err || !category) {
            return res.redirect("/admin/category");
        }
        return res.render(baseDIR + "editCategory", {
            title: "Edit Category",
            layout: "dashboardLayout",
            category: category
        });
    });
});

router.post("/edit/:id", ensureAuthenticated, function (req, res, next) {
    let name = req.body.name;

    Category.updateCategory(req.params.id, name, function (err) {
        if (err) {
            req.flash("error", "Updating Category failed!");
            return res.redirect("/admin/category");
        }
        return res.redirect("/admin/category");
    });
});

router.get("/delete/:id", ensureAuthenticated, function (req, res, next) {
    Category.remove({_id: req.params.id}, function (err) {
        if (err) {
            return res.redirect("/admin/category");
        }
        return res.redirect("/admin/category");
    });
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/category");
});

module.exports = router;
