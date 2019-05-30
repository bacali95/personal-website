const mongoose = require('mongoose');
const specs = require('../tools/specs');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  }
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.create = async function (name) {
  const category = new Category({name});
  return category.save();
};

module.exports.getAll = async function () {
  return Category.find();
};

module.exports.getByName = async function (name) {
  return Category.findOne({name});
};

module.exports.getById = async function (id) {
  return Category.findById(id);
};

module.exports.update = async function (id, name) {
  return Category.findByIdAndUpdate(id, {name});
};

module.exports.remove = async function (id) {
  return Category.deleteOne({_id: id});
};
