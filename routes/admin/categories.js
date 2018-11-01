var ensureAuthenticated = require('../../tools/tools').ensureAuthenticated;
var express = require('express');
var router = express.Router();
var baseDIR = 'admin/dashboard/category/';

var Category = require('../../models/category');

router.get('/', ensureAuthenticated, function (req, res, next) {
    Category.getAllCategories(function (err, categories) {
        if (err) throw err;
        if (!categories) {
            categories = [];
        }
        return res.render(baseDIR + 'listCategory', {
            title: 'Categories',
            layout: 'dashboardLayout',
            categories: categories
        });
    });
});

router.get('/add', ensureAuthenticated, function (req, res, next) {
    return res.render(baseDIR + 'addCategory', {
        title: 'Add Category',
        layout: 'dashboardLayout',
        category: new Category()
    });
});

router.post('/add', ensureAuthenticated, function (req, res, next) {
    let name = req.body.name;

    req.checkBody('name', 'Name is required!').notEmpty();

    let newCategory = new Category({
        name: name
    });

    let errors = req.validationErrors();

    if (errors) {
        return res.render(baseDIR + 'addCategory', {
            title: 'Add Category',
            layout: 'dashboardLayout',
            errors: errors,
            category: newCategory
        });
    } else {

        Category.createCategory(newCategory, function (err, category) {
            if (err) throw err;
            req.flash('success', 'Category added successfully');
            return res.redirect('/admin/category');
        });
    }

});

router.get('/edit/:id', ensureAuthenticated, function (req, res, next) {
    Category.findById(req.params.id, function (err, category) {
        if (err) throw err;
        if (!category) {
            return res.redirect('/admin/category');
        }
        return res.render(baseDIR + 'editCategory', {
            title: 'Edit Category',
            layout: 'dashboardLayout',
            category: category
        });
    });
});

router.post('/edit/:id', ensureAuthenticated, function (req, res, next) {
    let name = req.body.name;

    req.checkBody('name', 'Name is required!').notEmpty();

    let newCategory = new Category({
        _id: req.params.id,
        name: name
    });

    let errors = req.validationErrors();

    if (errors) {
        return res.render(baseDIR + 'editCategory', {
            errors: errors,
            category: newCategory
        });
    } else {
        Category.getCategoryById(newCategory._id, function (err, category) {
            if (err) throw err;
            if (!category) {
                req.flash('error', 'Updating category failed!');
                return res.redirect('/admin/category');
            }
            Category.updateCategory(category._id, newCategory, function (err) {
                if (err) throw err;
                req.flash('success', 'Category updated successfully');
                return res.redirect('/admin/category');
            });
        });
    }
});

router.get('/delete/:id', ensureAuthenticated, function (req, res, next) {
    Category.findById(req.params.id, function (err, category) {
        if (err) throw err;
        if (!category) {
            return res.redirect('/admin/category');
        }
        Category.remove({_id: category._id}, function (err) {
            if (err) throw err;
            req.flash('success', 'Category deleted successfully');
            return res.redirect('/admin/category');
        })
    });
});

router.get('/*', function (req, res, next) {
    return res.redirect('/admin/category');
});

module.exports = router;
