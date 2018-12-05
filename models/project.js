const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
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
    repoGithub: {
        type: String
    },
    creationDate: {
        type: Date
    },
    images: [{
        type: String
    }]
});

const Project = module.exports = mongoose.model("Project", ProjectSchema);

module.exports.create = function (project, callback) {
    project.save(callback);
};

module.exports.getAll = function (callback) {
    Project.find(callback);
};

module.exports.getById = function (id, callback) {
    Project.findById(id, callback);
};

module.exports.update = function (id, project, callback) {
    Project.findByIdAndUpdate(id, project, callback);
};

