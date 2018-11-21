const ensureAuthenticated = require('../../tools/tools').ensureAuthenticated;
const express = require('express');
const router = express.Router();
const path = require('path');
const moment = require('moment');
const multer = require('multer');
const fs = require('fs');
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);


const baseDIR = 'admin/dashboard/project/';

//Handle file uploads
const storage = multer.diskStorage({
    destination: './public/images/uploads',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).any('image');

const Project = require('../../models/project');
const Category = require('../../models/category');

router.get('/', ensureAuthenticated, function (req, res, next) {
    Project.getAllProjects(function (err, projects) {
        if (err) throw err;
        if (!projects) {
            projects = [];
        }
        return res.render(baseDIR + 'listProject', {
            title: 'Projects',
            layout: 'dashboardLayout',
            projects: projects
        });
    });
});

router.get('/add', ensureAuthenticated, function (req, res, next) {
    Category.getAllCategories(function (err, categories) {
        if (err) throw err;
        if (!categories) {
            categories = [];
        }
        return res.render(baseDIR + 'addProject', {
            title: 'Add Project',
            layout: 'dashboardLayout',
            categories: categories,
            project: new Project()
        });
    });
});

router.get('/show/:id', ensureAuthenticated, function (req, res, next) {
    Project.getProjectById(req.params.id, function (err, project) {
        if (err) throw err;
        if (!project) {
            return res.redirect('/admin/project');
        }
        return res.render(baseDIR + 'showProject', {
            title: 'Show Project',
            layout: 'dashboardLayout',
            project: project
        });
    });

});

router.post('/add', upload, ensureAuthenticated, function (req, res, next) {

        let titleFR = req.body.titleFR;
        let descriptionFR = req.body.descriptionFR;
        let typeFR = req.body.typeFR;
        let titleEN = req.body.titleEN;
        let descriptionEN = req.body.descriptionEN;
        let typeEN = req.body.typeEN;
        let category = req.body.category;
        let startDate = req.body.startDate;
        let finishDate = req.body.finishDate;
        let images = req.files;

        let imageNames = [];

        images.forEach(function (f) {
            imageNames.push(f.filename);
        });

        req.checkBody('category', 'Select a Category').notEmpty();

        let errors = req.validationErrors();

        category = category || [];

        if (Array.isArray(category)) {
            category = category.join(' ');
        }

        let newProject = new Project({
            fr: {
                title: titleFR || '',
                description: descriptionFR || '',
                type: typeFR || ''
            },
            en: {
                title: titleEN || '',
                description: descriptionEN || '',
                type: typeEN || ''
            },
            category: category || '',
            period: {
                start: startDate || '',
                finish: finishDate || ''
            },
            creationDate: Date.now(),
            images: imageNames
        });

        if (errors) {
            images.forEach(function (f) {
                unlinkAsync(f.path);
            });
            Category.getAllCategories(function (err, categories) {
                if (err) throw err;
                if (!categories) {
                    categories = [];
                }
                return res.render(baseDIR + 'addProject', {
                    title: 'Add Project',
                    layout: 'dashboardLayout',
                    errors: errors,
                    categories: categories,
                    project: newProject
                });
            });
        } else {
            Project.createProject(newProject, function (err, project) {
                if (err) throw err;
                req.flash('success', 'Project added successfully');
                return res.redirect('/admin/project');
            });
        }
    }
);

router.get('/edit/:id', ensureAuthenticated, function (req, res, next) {
    Project.findById(req.params.id, function (err, project) {
        if (err) throw err;
        if (!project) {
            return res.redirect('/admin/project');
        }
        Category.getAllCategories(function (err, categories) {
            if (err) throw err;
            if (!categories) {
                categories = [];
            }
            return res.render(baseDIR + 'editProject', {
                title: 'Edit Project',
                layout: 'dashboardLayout',
                categories: categories,
                project: project
            });
        });
    });
});

router.post('/edit/:id', upload, ensureAuthenticated, function (req, res, next) {
    let titleFR = req.body.titleFR;
    let descriptionFR = req.body.descriptionFR;
    let typeFR = req.body.typeFR;
    let titleEN = req.body.titleEN;
    let descriptionEN = req.body.descriptionEN;
    let typeEN = req.body.typeEN;
    let category = req.body.category;
    let startDate = req.body.startDate;
    let finishDate = req.body.finishDate;
    let images = req.files;

    let errorMessage = 'Fill all the fields please!';

    req.checkBody('category', errorMessage).notEmpty();

    let imageNames = [];

    images.forEach(function (f) {
        imageNames.push(f.filename);
    });

    category = category || [];

    if (Array.isArray(category)) {
        category = category.join(' ');
    }

    let newProject = new Project({
        _id: req.params.id,
        fr: {
            title: titleFR || '',
            description: descriptionFR || '',
            type: typeFR || ''
        },
        en: {
            title: titleEN || '',
            description: descriptionEN || '',
            type: typeEN || ''
        },
        category: category || '',
        period: {
            start: startDate || '',
            finish: finishDate || ''
        },
        creationDate: Date.now()
    });

    let errors = req.validationErrors();

    if (errors) {
        images.forEach(function (f) {
            unlinkAsync(f.path);
        });
        Category.getAllCategories(function (err, categories) {
            if (err) throw err;
            if (!categories) {
                categories = [];
            }
            return res.render(baseDIR + 'addProject', {
                title: 'Add Project',
                layout: 'dashboardLayout',
                errors: errors,
                categories: categories,
                project: newProject
            });
        });
    } else {
        Project.getProjectById(newProject._id, function (err, project) {
            if (err) throw err;
            if (!project) {
                req.flash('error', 'Updating project failed!');
                return res.redirect('/admin/project');
            }
            if (images) {
                newProject.images = imageNames;
                project.images.forEach(function (name) {
                    unlinkAsync('public/images/uploads/' + name);
                });
            } else {
                newProject.images = project.images;
            }
            Project.updateProject(project._id, newProject, function (err) {
                if (err) throw err;
                req.flash('success', 'Project updated successfully');
                return res.redirect('/admin/project');
            });
        });
    }
});

router.get('/delete/:id', ensureAuthenticated, function (req, res, next) {
    Project.findById(req.params.id, function (err, project) {
        if (err) throw err;
        if (!project) {
            return res.redirect('/admin/project');
        }
        Project.remove({_id: project._id}, function (err) {
            if (err) throw err;
            project.images.forEach(function (name) {
                unlinkAsync('public/images/uploads/' + name);
            });
            req.flash('success', 'Project deleted successfully');
            return res.redirect('/admin/project');
        })
    });
});

router.get('/*', function (req, res, next) {
    return res.redirect('/admin/project');
});

module.exports = router;
