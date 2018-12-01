const express = require('express');
const router = express.Router();

const Category = require('../models/category');
const Project = require('../models/project');

/* GET home page. */
function languageManager(req, res, next) {
    req.session.lan = req.url;
    Category.getAllCategories(function (err, categories) {
        if (err || !categories) {
            categories = [];
        }
        Project.getAllProjects(function (err, projects) {
            if (err || !projects) {
                projects = [];
            }
            return res.render('public' + req.session.lan + '/sections', {
                title: 'Nasreddine Bac Ali',
                layout: 'layout',
                language: req.session.lan.replace('/', ''),
                categories: categories,
                projects: projects.reverse()
            });
        });
    });
}

router.get('/', function (req, res, next) {
    if (!req.session.lan) {
        req.session.lan = '/en';
    }
    res.redirect(req.session.lan);
});

router.get('/fr', languageManager);
router.get('/en', languageManager);

router.get('/project/:id', function (req, res, next) {
    if (!req.session.lan) {
        req.session.lan = '/en';
    }
    var index = req.params.index;
    Project.getProjectById(req.params.id, function (err, project) {
        if (err || !project) {
            return res.redirect('/#portfolio');
        }
        return res.render('public' + req.session.lan + '/showProject', {
            title: project[req.session.lan.replace('/', '')].title,
            language: req.session.lan.replace('/', ''),
            project: project,
            index: req.query.index
        });
    });
});

router.get('/next/:index', function (req, res, next) {
    var index = req.params.index;
    if (!index || isNaN(index)) {
        index = 0;
    }
    Project.getAllProjects(function (err, projects) {
        if (err || !projects) {
            projects = [];
        }
        index = projects.length + Number(index);
        index %= projects.length;
        return res.redirect('/project/' + projects[index]._id + '?index=' + index);
    });
});

router.get('/*', function (req, res, next) {
    if (req.url !== '/en'
        && req.url !== '/fr'
        && !String(req.url).startsWith('/next')
        && !String(req.url).startsWith('/admin')
        && !String(req.url).startsWith('/project')) {
        return res.redirect('/');
    }
    return next();
});

module.exports = router;
