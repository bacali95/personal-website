const specs = require('./specs');
const uploadImage = require('./utils').uploadImage;
const fs = require('fs');
const {promisify} = require('util');
const unlinkAsync = promisify(fs.unlink);
const tinify = require('tinify');

tinify.key = specs.TINIFY_API_KEY;

tinify.validate((err) => {
  if (err) {
    throw err;
  }
});

function CompressTool() {
}

CompressTool.prototype.begin = (file, options, callback) => {
  const fileIN = file.path;
  const fileOUT = `public/images/uploads/${file.name}`;
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
};

module.exports = () => {
  return new CompressTool();
};
