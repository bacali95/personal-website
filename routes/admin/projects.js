const express = require("express");
const router = express.Router();
const fs = require("fs");
const {promisify} = require("util");
const unlinkAsync = promisify(fs.unlink);

const ensureAuthenticated = require("../../tools/ensureAuthenticated");
const CompressTool = require("../../tools/compress");
const renameFile = require("../../tools/utils").renameFile;
const upload = require("../../tools/utils").upload;

const Project = require("../../models/project");
const Category = require("../../models/category");

const baseDIR = "admin/dashboard/project/";

const compress = CompressTool();

router.get("/", ensureAuthenticated, function (req, res, next) {
    Project.getAllProjects(function (err, projects) {
        if (err || !projects) {
            projects = [];
        }
        return res.render(baseDIR + "listProject", {
            title: "Projects",
            layout: "dashboardLayout",
            projects
        });
    });
});

router.get("/add", ensureAuthenticated, function (req, res, next) {
    Category.getAllCategories(function (err, categories) {
        if (err || !categories) {
            categories = [];
        }
        return res.render(baseDIR + "addProject", {
            title: "Add Project",
            layout: "dashboardLayout",
            categories
        });
    });
});

router.get("/show/:id", ensureAuthenticated, function (req, res, next) {
    var index = req.query.index;
    if (!index || isNaN(index)) {
        index = 0;
    }
    Project.getProjectById(req.params.id, function (err, project) {
        if (err || !project) {
            return res.redirect("/admin/project");
        }
        return res.render(baseDIR + "showProject", {
            title: "Show Project",
            layout: "dashboardLayout",
            project,
            index
        });
    });

});

router.post("/postimage", upload, ensureAuthenticated, function (req, res, next) {
    let ID = req.body.ID;
    let filename = req.file.filename;
    compress.begin(filename, function (error, message) {
        if (error) {
            throw error;
        }
        res.send({ID});
    });
});

router.post("/add", ensureAuthenticated, function (req, res, next) {
    let titleFR = req.body.titleFR;
    let descriptionFR = req.body.descriptionFR;
    let typeFR = req.body.typeFR;
    let titleEN = req.body.titleEN;
    let descriptionEN = req.body.descriptionEN;
    let typeEN = req.body.typeEN;
    let category = req.body.category;
    let startDate = req.body.startDate;
    let finishDate = req.body.finishDate;
    let repoGithub = req.body.repoGithub;
    let images = req.body.images.split(",");

    for (let i = 0; i < images.length; i++) {
        images[i] = renameFile(i, images[i]);
    }

    category = category || [];

    if (Array.isArray(category)) {
        category = category.join(" ");
    }

    let project = new Project({
        fr: {
            title: titleFR,
            description: descriptionFR,
            type: typeFR
        },
        en: {
            title: titleEN,
            description: descriptionEN,
            type: typeEN
        },
        category,
        period: {
            start: startDate.split("-").reverse().join("-"),
            finish: finishDate.split("-").reverse().join("-")
        },
        repoGithub,
        creationDate: Date.now(),
        images
    });

    Project.createProject(project, function (err, project) {
        if (err) {
            req.flash("error", "Adding project failed!");
            return res.redirect("/admin/project");
        }
        return res.redirect("/admin/project/show/" + project._id);
    });

});

router.get("/edit/:id", ensureAuthenticated, function (req, res, next) {
    Project.findById(req.params.id, function (err, project) {
        if (err || !project) {
            return res.redirect("/admin/project");
        }
        Category.getAllCategories(function (err, categories) {
            if (err || !categories) {
                categories = [];
            }
            return res.render(baseDIR + "editProject", {
                title: "Edit Project",
                layout: "dashboardLayout",
                categories,
                project
            });
        });
    });
});

router.post("/edit/:id", upload, ensureAuthenticated, function (req, res, next) {
    let titleFR = req.body.titleFR;
    let descriptionFR = req.body.descriptionFR;
    let typeFR = req.body.typeFR;
    let titleEN = req.body.titleEN;
    let descriptionEN = req.body.descriptionEN;
    let typeEN = req.body.typeEN;
    let category = req.body.category;
    let startDate = req.body.startDate;
    let finishDate = req.body.finishDate;
    let repoGithub = req.body.repoGithub;
    let images = req.body.images.split(",");

    category = category || [];

    if (Array.isArray(category)) {
        category = category.join(" ");
    }

    let newProject = new Project({
        _id: req.params.id,
        fr: {
            title: titleFR,
            description: descriptionFR,
            type: typeFR
        },
        en: {
            title: titleEN,
            description: descriptionEN,
            type: typeEN
        },
        category,
        period: {
            start: startDate.split("-").reverse().join("-"),
            finish: finishDate.split("-").reverse().join("-")
        },
        repoGithub,
        creationDate: Date.now()
    });

    Project.getProjectById(newProject._id, function (err, project) {
        if (err || !project) {
            req.flash("error", "Updating project failed!");
            return res.redirect("/admin/project");
        }
        project.images.forEach(function (name) {
            if (!images.includes(name)) {
                unlinkAsync("public/images/uploads/" + name);
            }
        });
        for (let i = 0; i < images.length; i++) {
            images[i] = renameFile(i, images[i]);
        }
        newProject.images = images;
        Project.updateProject(project._id, newProject, function (err) {
            if (err) {
                req.flash("error", "Updating project failed!");
                return res.redirect("/admin/project");
            }
            return res.redirect("/admin/project/show/" + project._id);
        });
    });
});

router.get("/delete/:id", ensureAuthenticated, function (req, res, next) {
    Project.findById(req.params.id, function (err, result) {
        if (err || !result) {
            return res.redirect("/admin/project");
        }
        Project.deleteOne({_id: req.params.id}, function (err) {
            if (err) {
                req.flash("error", "Deleting project failed!");
                return res.redirect("/admin/project");
            }
            result.images.forEach(function (name) {
                unlinkAsync("public/images/uploads/" + name);
            });
            return res.redirect("/admin/project");
        });
    });
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/project");
});

module.exports = router;
