const mongoose = require('mongoose');

const EducationSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  detail: {
    type: String,
  },
  period: {
    type: String,
  },
  rank: {
    type: Number,
  }
});

const Education = module.exports = mongoose.model('Education', EducationSchema);


module.exports.create = async function (education) {
  return education.save();
};

module.exports.getAll = async function () {
  return Education.find();
};

module.exports.getByName = async function (name) {
  return Education.findOne({name});
};

module.exports.getById = async function (id) {
  return Education.findById(id);
};

module.exports.update = async function (id, education) {
  return Education.findByIdAndUpdate(id, education);
};

module.exports.remove = async function (id) {
  return Education.deleteOne({_id: id});
};
