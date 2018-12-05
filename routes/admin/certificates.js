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

router.get("/", ensureAuthenticated, function (req, res, next) {
    Certificate.getAll(function (err, certificates) {
        if (err || !certificates) {
            certificates = [];
        }
        return res.render(baseDIR + "listCertificate", {
            title: "Certificates",
            layout: "dashboardLayout",
            certificates
        });
    });
});

router.get("/add", ensureAuthenticated, function (req, res, next) {
    return res.render(baseDIR + "addCertificate", {
        title: "Add Certificate",
        layout: "dashboardLayout",
        categories
    });
});

router.get("/show/:id", ensureAuthenticated, function (req, res, next) {
    Certificate.getById(req.params.id, function (err, certificate) {
        if (err || !certificate) {
            return res.redirect("/admin/certificate");
        }
        return res.render(baseDIR + "showCertificate", {
            title: "Show Certificate",
            layout: "dashboardLayout",
            certificate
        });
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

router.post("/add", ensureAuthenticated, function (req, res, next) {
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

    Certificate.create(certificate, function (err, result) {
        if (err) {
            req.flash("error", "Adding certificate failed!");
            return res.redirect("/admin/certificate");
        }
        return res.redirect("/admin/certificate/show/" + result._id);
    });

});

router.get("/edit/:id", ensureAuthenticated, function (req, res, next) {
    Certificate.findById(req.params.id, function (err, certificate) {
        if (err || !certificate) {
            return res.redirect("/admin/certificate");
        }
        return res.render(baseDIR + "editCertificate", {
            title: "Edit Certificate",
            layout: "dashboardLayout",
            categories,
            certificate
        });
    });
});

router.post("/edit/:id", upload, ensureAuthenticated, function (req, res, next) {
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

    Certificate.getById(newCertificate._id, function (err, certificate) {
        if (err || !certificate) {
            req.flash("error", "Updating certificate failed!");
            return res.redirect("/admin/certificate");
        }
        certificate.images.forEach(function (name) {
            if (!images.includes(name)) {
                unlinkAsync("public/images/uploads/" + name);
            }
        });
        for (let i = 0; i < images.length; i++) {
            images[i] = renameFile(i, images[i]);
        }
        newCertificate.images = images;
        Certificate.update(certificate._id, newCertificate, function (err) {
            if (err) {
                req.flash("error", "Updating certificate failed!");
                return res.redirect("/admin/certificate");
            }
            return res.redirect("/admin/certificate/show/" + certificate._id);
        });
    });
});

router.get("/delete/:id", ensureAuthenticated, function (req, res, next) {
    Certificate.findById(req.params.id, function (err, result) {
        if (err || !result) {
            return res.redirect("/admin/certificate");
        }
        Certificate.deleteOne({_id: req.params.id}, function (err) {
            if (err) {
                req.flash("error", "Deleting certificate failed!");
                return res.redirect("/admin/certificate");
            }
            result.images.forEach(function (name) {
                unlinkAsync("public/images/uploads/" + name);
            });
            return res.redirect("/admin/certificate");
        });
    });
});

router.get("/*", function (req, res, next) {
    return res.redirect("/admin/certificate");
});

module.exports = router;
