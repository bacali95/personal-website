const express = require("express");
const router = express.Router();
const path = require('path');
const sortProjects = require("../tools/utils").sortProjects;
const sortCertificates = require("../tools/utils").sortCertificates;

const Project = require("../models/project");
const Category = require("../models/category");
const Certificate = require("../models/certificate");
const CertificateCategory = require("../models/certifCategory");

router.get("/ws/projects", async function (req, res) {
    let projects = await Project.getAll();
    sortProjects(projects);
    return res.status(200).json(projects);
});

router.get("/ws/project/:id", async function (req, res) {
    const project = await Project.getById(req.params.id);
    return res.status(200).json(project);
});

router.get("/ws/categories", async function (req, res) {
    let categories = await Category.getAll();
    return res.status(200).json(categories);
});

router.get("/ws/certificates", async function (req, res) {
    let certificates = await Certificate.getAll();
    sortCertificates(certificates);
    return res.status(200).json(certificates);
});

router.get("/ws/certificate/:id", async function (req, res) {
    const certificate = await Certificate.getById(req.params.id);
    return res.status(200).json(certificate);
});

router.get("/ws/certificateCategories", function (req, res) {
    return res.status(200).json(CertificateCategory);
});

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.pdf'];

router.get("*", function (req, res, next) {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`frontend/dist/${req.url}`));
    } else {
        res.sendFile(path.resolve('frontend/dist/index.html'));
    }
});

module.exports = router;
