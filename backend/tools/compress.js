const specs = require("./specs");
const uploadImage = require("./utils").uploadImage;
const fs = require("fs");
const {promisify} = require("util");
const unlinkAsync = promisify(fs.unlink);
const tinify = require("tinify");

tinify.key = specs.TINIFY_API_KEY;

tinify.validate(function (err) {
    if (err) {
        throw err;
    }
});

function getDestination(callback) {
    callback(null, "public/images/forcompress/", "public/images/uploads/");
}

function CompressTool() {
}

CompressTool.prototype.begin = function begin(filename, options, callback) {
    getDestination(function (err, input, output) {
        const fileIN = input + filename;
        const fileOUT = output + filename;
        const result = tinify.fromFile(fileIN);
        result.toFile(fileOUT, function (error) {
            if (error) {
                callback(error, null);
            }
            unlinkAsync(fileIN);
            uploadImage(fileOUT, options, function (error, image) {
                if (error) {
                    callback(error, null);
                }
                unlinkAsync(fileOUT);
                callback(null, image);
            });
        });
    });
};

module.exports = function () {
    return new CompressTool();
};
