const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/images/forcompress",
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});

module.exports.upload = multer({storage}).single("image");

module.exports.renameFile = (index, oldName) => {
    var newName = "image-" + index + "-" + Date.now() + path.extname(oldName);
    fs.rename("public/images/uploads/" + oldName, "public/images/uploads/" + newName, function (err) {
        if (err) {
            throw err;
        }
    });
    return newName;
};