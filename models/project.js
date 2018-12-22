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
        type: Object
    }]
});

const Project = module.exports = mongoose.model("Project", ProjectSchema);

module.exports.create = function (project) {
    return project.save();
};

module.exports.getAll = function () {
    return Project.find();
};

module.exports.getById = function (id) {
    return Project.findById(id);
};

module.exports.update = function (id, project) {
    return Project.findByIdAndUpdate(id, project);
};

module.exports.remove = function (id) {
    return Project.deleteOne({_id: id});
};
