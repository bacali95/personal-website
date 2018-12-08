const mongoose = require("mongoose");
const specs = require("../tools/specs");

const CategorySchema = mongoose.Schema({
    name: {
        type: String
    }
});

const Category = module.exports = mongoose.model("Category", CategorySchema);

module.exports.create = function (category) {
    return category.save();
};

module.exports.getAll = function () {
    return Category.find();
};

module.exports.getByName = function (name) {
    return Category.findOne({name});
};

module.exports.getById = function (id) {
    return Category.findById(id);
};

module.exports.update = function (id, name) {
    return Category.findByIdAndUpdate(id, {name});
};

module.exports.remove = function (id) {
    return Category.deleteOne({_id: id});
};