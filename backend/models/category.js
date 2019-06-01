const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  }
});

module.exports.schema = CategorySchema;

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.create = async function (category) {
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

module.exports.update = async function (id, category) {
  return Category.findByIdAndUpdate(id, category);
};

module.exports.remove = async function (id) {
  return Category.deleteOne({_id: id});
};
