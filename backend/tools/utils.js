const cloudinary = require('cloudinary').v2;
const specs = require('./specs');
cloudinary.config({
  cloud_name: specs.IMAGE_CLOUD_NAME,
  api_key: specs.IMAGE_API_KEY,
  api_secret: specs.IMAGE_API_SECRET
});

module.exports.uploadImage = (name, options, callback) => {
  cloudinary.uploader.upload(name, options, function (err, image) {
    if (err) {
      callback(err, null);
    }
    callback(null, image);
  });
};

module.exports.deleteImage = (name) => {
  cloudinary.uploader.destroy(name);
};

module.exports.sortProjects = async (projects) => {
  await projects.sort(function (a, b) {
    let x = new Date(a.startDate);
    let y = new Date(b.startDate);

    if (x.toString() === y.toString()) {
      x = new Date(a.endDate);
      y = new Date(b.endDate);
    }
    return (x === y) ? 0 : (x > y) ? -1 : 1;
  });
};
