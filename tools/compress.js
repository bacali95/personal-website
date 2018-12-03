var specs = require("../tools/specs");
var fs = require("fs");
const {promisify} = require("util");
const unlinkAsync = promisify(fs.unlink);
var tinify = require("tinify");
tinify.key = specs.TINIFY_API_KEY;
tinify.validate(function (err) {
    if (err) throw err;
    console.log("Tinify is ready!");
});

function getDestination(callback) {
    callback(null, "public/images/forcompress/", "public/images/uploads/")
}

function CompressTool() {
}

CompressTool.prototype.begin = function begin(filename, callback) {
    getDestination(function (err, input, output) {
        var fileIN = input + filename;
        var fileOUT = output + filename;
        console.log(fileIN);
        console.log(fileOUT);
        var result = tinify.fromFile(fileIN);
        result.toFile(fileOUT, function (error) {
            if (error) {
                callback(error)
            }
            unlinkAsync(fileIN);
            callback(null, "Image " + filename + " compressed successfully!");
        });
    })
};

module.exports = function () {
    return new CompressTool()
};
