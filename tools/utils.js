const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const specs = require('./specs');

cloudinary.config({
    cloud_name: specs.IMAGE_CLOUD_NAME,
    api_key: specs.IMAGE_API_KEY,
    api_secret: specs.IMAGE_API_SECRET
});

const storage = multer.diskStorage({
    destination: "./public/images/forcompress",
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});

module.exports.upload = multer({storage}).single("image");

module.exports.uploadImage = (name, options, callback) => {
    cloudinary.uploader.upload(name, options, function (err, image) {
        if (err) {
            callback(err, null);
        }
        callback(null, image);
    });
};

module.exports.deleteImage = (name) => {
    cloudinary.uploader.destroy(name, function (err) {
    });
};

module.exports.sortProjects = (projects) => {
    projects.sort(function (a, b) {
        let x = new Date("01-" + a.period.start);
        let y = new Date("01-" + b.period.start);

        if (x.toString() === y.toString()) {
            x = new Date("01-" + a.period.finish);
            y = new Date("01-" + b.period.finish);
        }

        if (x > y) {
            return -1;
        }
        if (x < y) {
            return 1;
        }
        return 0;
    });
};

module.exports.sortCertificates = (certificates) => {
    certificates.sort(function (a, b) {
        let x = new Date("01-" + a.date);
        let y = new Date("01-" + b.date);

        if (x.toString() === y.toString()) {
            x = new Date("01-" + a.date);
            y = new Date("01-" + b.date);
        }

        if (x > y) {
            return -1;
        }
        if (x < y) {
            return 1;
        }
        return 0;
    });
};