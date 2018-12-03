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

    let newCategory = new Category({
        name: name
    });

    Category.createCategory(newCategory, function (err, category) {
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

    let newCategory = new Category({
        _id: req.params.id,
        name: name
    });

    Category.getCategoryById(newCategory._id, function (err, category) {
        if (err || !category) {
            req.flash("error", "Updating category failed!");
            return res.redirect("/admin/category");
        }
        Category.updateCategory(category._id, newCategory, function (err) {
            if (err) {
                req.flash("error", "Updating Category failed!");
                return res.redirect("/admin/category");
            }
            return res.redirect("/admin/category");
        });
    });
});

router.get("/delete/:id", ensureAuthenticated, function (req, res, next) {
    Category.findById(req.params.id, function (err, category) {
        if (err || !category) {
            return res.redirect("/admin/category");
        }
        Category.remove({_id: category._id}, function (err) {
            if (err) {
                req.flash("error", "Deleting Category failed!");
                return res.redirect("/admin/category");
            }
            return res.redirect("/admin/category");
        })
    });
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/category");
});

module.exports = router;
