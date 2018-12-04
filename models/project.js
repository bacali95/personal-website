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

module.exports.createProject = function (project, callback) {
    project.save(callback);
};

module.exports.getAllProjects = function (callback) {
    Project.find(callback);
};

module.exports.getProjectByCategory = function (category, callback) {
    let query = {category: category};
    Project.findOne(query, callback);
};

module.exports.getProjectById = function (id, callback) {
    Project.findById(id, callback);
};

module.exports.updateProject = function (id, project, callback) {
    Project.findByIdAndUpdate(id, project, callback);
};

