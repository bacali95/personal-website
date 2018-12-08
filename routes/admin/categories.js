const ensureAuthenticated = require("../../tools/ensureAuthenticated");
const express = require("express");
const router = express.Router();
const baseDIR = "admin/dashboard/category/";

const Category = require("../../models/category");

router.get("/", ensureAuthenticated, async function (req, res, next) {
    const categories = await Category.getAll();

    return res.render(baseDIR + "listCategory", {
        title: "Categories",
        layout: "dashboardLayout",
        categories
    });
});

router.get("/add", ensureAuthenticated, function (req, res, next) {
    return res.render(baseDIR + "addCategory", {
        title: "Add Category",
        layout: "dashboardLayout",
        category: new Category()
    });
});

router.post("/add", ensureAuthenticated, async function (req, res, next) {
    let name = req.body.name;

    await Category.create(new Category({name})).catch(() => {
        req.flash("error", "Adding Category failed!");
        return res.redirect("/admin/category");
    });

    return res.redirect("/admin/category");
});

router.get("/edit/:id", ensureAuthenticated, async function (req, res, next) {
    const category = await Category.getById(req.params.id).catch(() => res.redirect("/admin/category"));

    return res.render(baseDIR + "editCategory", {
        title: "Edit Category",
        layout: "dashboardLayout",
        category
    });
});

router.post("/edit/:id", ensureAuthenticated, async function (req, res, next) {
    let name = req.body.name;

    await Category.update(req.params.id, name).catch(() => {
        if (err) {
            req.flash("error", "Updating Category failed!");
            return res.redirect("/admin/category");
        }
    });

    return res.redirect("/admin/category");
});

router.get("/delete/:id", ensureAuthenticated, async function (req, res, next) {
    await Category.remove({_id: req.params.id}).catch(() => res.redirect("/admin/category"));

    return res.redirect("/admin/category");
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/category");
});

module.exports = router;
