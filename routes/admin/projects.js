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

router.get("/", ensureAuthenticated, async function (req, res, next) {
    const projects = await Project.getAll().catch(() => res.redirect("/admin/project"));

    return res.render(baseDIR + "listProject", {
        title: "Projects",
        layout: "dashboardLayout",
        projects
    });
});

router.get("/add", ensureAuthenticated, async function (req, res, next) {
    const categories = await Category.getAll().catch(() => res.redirect("/admin/project"));

    return res.render(baseDIR + "addProject", {
        title: "Add Project",
        layout: "dashboardLayout",
        categories
    });
});

router.get("/show/:id", ensureAuthenticated, async function (req, res, next) {
    let index = req.query.index;
    if (!index || isNaN(index)) {
        index = 0;
    }

    const project = await Project.getById(req.params.id).catch(() => res.redirect("/admin/project"));

    return res.render(baseDIR + "showProject", {
        title: "Show Project",
        layout: "dashboardLayout",
        project,
        index
    });
});

router.post("/postimage", upload, ensureAuthenticated, function (req, res, next) {
    let ID = req.body.ID;
    let filename = req.file.filename;
    compress.begin(filename, function (error) {
        if (error) {
            throw error;
        }
        res.send({ID});
    });
});

router.post("/add", ensureAuthenticated, async function (req, res, next) {
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

    await Project.create(project).catch(() => {
        req.flash("error", "Adding project failed!");
        return res.redirect("/admin/project");
    });

    return res.redirect("/admin/project/show/" + project._id);
});

router.get("/edit/:id", ensureAuthenticated, async function (req, res, next) {
    const project = await Project.getById(req.params.id).catch(() => res.redirect("/admin/project"));
    const categories = await Category.getAll().catch(() => res.redirect("/admin/project"));

    return res.render(baseDIR + "editProject", {
        title: "Edit Project",
        layout: "dashboardLayout",
        categories,
        project
    });
});

router.post("/edit/:id", ensureAuthenticated, async function (req, res, next) {
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


    let project = await Project.getById(req.params.id).catch(() => {
        req.flash("error", "Updating project failed!");
        return res.redirect("/admin/project");
    });

    project.images.forEach(function (name) {
        if (!images.includes(name)) {
            unlinkAsync("public/images/uploads/" + name);
        }
    });

    for (let i = 0; i < images.length; i++) {
        images[i] = renameFile(i, images[i]);
    }
    newProject.images = images;

    project = await Project.update(project._id, newProject).catch(() => {
        req.flash("error", "Updating project failed!");
        return res.redirect("/admin/project");
    });

    return res.redirect("/admin/project/show/" + project._id);
});

router.get("/delete/:id", ensureAuthenticated, async function (req, res, next) {
    const project = await Project.getById(req.params.id).catch(() => res.redirect("/admin/project"));

    await Project.remove(req.params.id).catch(() => {
        req.flash("error", "Deleting project failed!");
        return res.redirect("/admin/project");
    });

    project.images.forEach(function (name) {
        unlinkAsync("public/images/uploads/" + name);
    });

    return res.redirect("/admin/project");
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/project");
});

module.exports = router;
