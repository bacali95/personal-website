const mongoose = require("mongoose");
const specs = require("../tools/specs");

const CategorySchema = mongoose.Schema({
    name: {
        type: String
    }
});

const Category = module.exports = mongoose.model("Category", CategorySchema);

module.exports.create = function (category, callback) {
    category.save(callback);
};

module.exports.getAll = function (callback) {
    Category.find(callback);
};

module.exports.getByName = function (name, callback) {
    var query = {name: name};
    Category.findOne(query, callback);
};

module.exports.getById = function (id, callback) {
    Category.findById(id, callback);
};

module.exports.update = function (id, name, callback) {
    Category.findByIdAndUpdate(id, {name}, callback);
};