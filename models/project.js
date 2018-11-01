var mongoose = require('mongoose');
var specs = require('../tools/specs');

mongoose.connect(specs.DB_URL, {useNewUrlParser: true});

var db = mongoose.connection;

var ProjectSchema = mongoose.Schema({
    fr: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        type: {
            type: String
        }
    },
    en: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        type: {
            type: String
        }
    },
    category: {
        type: String,
    },
    period: {
        start: {
            type: String
        },
        finish: {
            type: String
        }
    },
    creationDate: {
        type: Date
    },
    image: {
        type: String
    }
});

var Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.createProject = function (newProject, callback) {
    newProject.save(callback);
};

module.exports.getAllProjects = function (callback) {
    Project.find(callback);
};

module.exports.getProjectByCategory = function (category, callback) {
    var query = {category: category};
    Project.findOne(query, callback);
};

module.exports.getProjectById = function (id, callback) {
    Project.findById(id, callback);
};

module.exports.updateProject = function (id, newProject, callback) {
    Project.findByIdAndUpdate(id, newProject, callback);
};

