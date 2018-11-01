var mongoose = require('mongoose');
var specs = require('../tools/specs');

mongoose.connect(specs.DB_URL, {useNewUrlParser: true});

var db = mongoose.connection;

var CategorySchema = mongoose.Schema({
    name: {
        type: String
    }
});

var Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.createCategory = function (newCategory, callback) {
    newCategory.save(callback);
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

module.exports.updateCategory = function (id, newCategory, callback) {
    Category.findByIdAndUpdate(id, newCategory, callback);
};