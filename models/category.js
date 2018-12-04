const mongoose = require("mongoose");
const specs = require("../tools/specs");

const CategorySchema = mongoose.Schema({
    name: {
        type: String
    }
});

const Category = module.exports = mongoose.model("Category", CategorySchema);

module.exports.createCategory = function (category, callback) {
    category.save(callback);
};

module.exports.getAllCategories = function (callback) {
    Category.find(callback);
};

module.exports.getCategoryByName = function (name, callback) {
    var query = {name: name};
    Category.findOne(query, callback);
};

module.exports.getCategoryById = function (id, callback) {
    Category.findById(id, callback);
};

module.exports.updateCategory = function (id, name, callback) {
    Category.findByIdAndUpdate(id, {name}, callback);
};