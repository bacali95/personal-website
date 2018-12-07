const express = require("express");
const router = express.Router();

const Category = require("../models/category");
const certificateCategory = require("../models/certifCategory");
const Project = require("../models/project");
const Certificate = require("../models/certificate");

/* GET home page. */
function languageManager(req, res, next) {
    req.session.lan = req.url;
    Category.getAll(function (err, categories) {
        if (err || !categories) {
            categories = [];
        }
        Project.getAll(function (err, projects) {
            if (err || !projects) {
                projects = [];
            }
            Certificate.getAll(function (err, certificates) {
                if (err || !certificates) {
                    certificates = [];
                }
                return res.render("public" + req.session.lan + "/sections", {
                    title: "Nasreddine Bac Ali",
                    layout: "layout",
                    language: req.session.lan.replace("/", ""),
                    projects: projects.reverse(),
                    certificates : certificates.reverse(),
                    certificateCategory,
                    categories
                });
            });
        });
    });
}

router.get("/", function (req, res, next) {
    if (!req.session.lan) {
        req.session.lan = "/en";
    }
    res.redirect(req.session.lan);
});

router.get("/fr", languageManager);
router.get("/en", languageManager);

router.get("/project/:id", function (req, res, next) {
    if (!req.session.lan) {
        req.session.lan = "/en";
    }
    Project.getById(req.params.id, function (err, project) {
        if (err || !project) {
            return res.redirect("/#portfolio");
        }
        return res.render("public" + req.session.lan + "/showProject", {
            title: project[req.session.lan.replace("/", "")].title,
            language: req.session.lan.replace("/", ""),
            index: req.query.index,
            project
        });
    });
});

router.get("/next/:index", function (req, res, next) {
    let index = req.params.index;
    if (!index || isNaN(index)) {
        index = 0;
    }
    Project.getAll(function (err, projects) {
        if (err || !projects) {
            projects = [];
        }
        index = projects.length + Number(index);
        index %= projects.length;
        const _id = projects[index]._id;
        return res.redirect("/project/" + _id + "?index=" + index);
    });
});

router.get("/*", function (req, res, next) {
    const regex = /^((\/en)|(\/fr)|(\/next)|(\/admin)|(\/project)|(\/images))/g;
    if (!String(req.url).match(regex)) {
        return res.redirect("/");
    }
    return next();
});

module.exports = router;
