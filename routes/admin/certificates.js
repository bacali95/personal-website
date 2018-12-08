const express = require("express");
const router = express.Router();
const fs = require("fs");
const {promisify} = require("util");
const unlinkAsync = promisify(fs.unlink);

const ensureAuthenticated = require("../../tools/ensureAuthenticated");
const CompressTool = require("../../tools/compress");
const renameFile = require("../../tools/utils").renameFile;
const upload = require("../../tools/utils").upload;

const Certificate = require("../../models/certificate");
const categories = require("../../models/certifCategory");

const baseDIR = "admin/dashboard/certificate/";

const compress = CompressTool();

router.get("/", ensureAuthenticated, async function (req, res, next) {
    const certificates = await Certificate.getAll();

    return res.render(baseDIR + "listCertificate", {
        title: "Certificates",
        layout: "dashboardLayout",
        certificates
    });
});

router.get("/add", ensureAuthenticated, function (req, res, next) {
    return res.render(baseDIR + "addCertificate", {
        title: "Add Certificate",
        layout: "dashboardLayout",
        categories
    });
});

router.get("/show/:id", ensureAuthenticated, async function (req, res, next) {
    const certificate = await Certificate.getById(req.params.id).catch(() => res.redirect("/admin/certificate"));

    return res.render(baseDIR + "showCertificate", {
        title: "Show Certificate",
        layout: "dashboardLayout",
        certificate
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
    let title = req.body.title;
    let category = req.body.category;
    let date = req.body.date;
    let images = req.body.images.split(",");

    for (let i = 0; i < images.length; i++) {
        images[i] = renameFile(i, images[i]);
    }

    category = category || [];

    if (Array.isArray(category)) {
        category = category.join(" ");
    }

    let certificate = new Certificate({
        title,
        category,
        date: date.split("-").reverse().join("-"),
        images
    });

    certificate = await Certificate.create(certificate).catch(() => {
        req.flash("error", "Adding certificate failed!");
        return res.redirect("/admin/certificate");
    });

    return res.redirect("/admin/certificate/show/" + certificate._id);
});

router.get("/edit/:id", ensureAuthenticated, async function (req, res, next) {
    const certificate = await Certificate.getById(req.params.id).catch(() => {
        res.redirect("/admin/certificate");
    });

    return res.render(baseDIR + "editCertificate", {
        title: "Edit Certificate",
        layout: "dashboardLayout",
        categories,
        certificate
    });
});

router.post("/edit/:id", upload, ensureAuthenticated, async function (req, res, next) {
    let title = req.body.title;
    let category = req.body.category;
    let date = req.body.date;
    let images = req.body.images.split(",");

    category = category || [];

    if (Array.isArray(category)) {
        category = category.join(" ");
    }

    let newCertificate = new Certificate({
        _id: req.params.id,
        title,
        category,
        date: date.split("-").reverse().join("-")
    });

    let certificate = await Certificate.getById(newCertificate._id).catch(() => {
        req.flash("error", "Updating certificate failed!");
        return res.redirect("/admin/certificate");
    });

    certificate.images.forEach(function (name) {
        if (!images.includes(name)) {
            unlinkAsync("public/images/uploads/" + name);
        }
    });

    for (let i = 0; i < images.length; i++) {
        images[i] = renameFile(i, images[i]);
    }

    newCertificate.images = images;

    certificate = await Certificate.update(certificate._id, newCertificate).catch(() => {
        req.flash("error", "Updating certificate failed!");
        return res.redirect("/admin/certificate");
    });

    return res.redirect("/admin/certificate/show/" + certificate._id);
});

router.get("/delete/:id", ensureAuthenticated, async function (req, res, next) {
    const certificate = await Certificate.getById(req.params.id).catch(() => res.redirect("/admin/certificate"));

    await Certificate.remove(req.params.id).catch(() => {
        req.flash("error", "Deleting certificate failed!");
        return res.redirect("/admin/certificate");
    });

    certificate.images.forEach(function (name) {
        unlinkAsync("public/images/uploads/" + name);
    });

    return res.redirect("/admin/certificate");
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/certificate");
});

module.exports = router;
