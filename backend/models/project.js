const mongoose = require('mongoose');
const Category = require('./category');

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    index: true,
    unique: true
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  categories: [Category.schema],
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  githubLink: {
    type: String
  },
  images: [{
    type: Object
  }]
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.create = function (project) {
  return project.save();
};

module.exports.getAll = function () {
  return Project.find();
};

module.exports.getById = function (_id) {
  return Project.findOne({_id});
};

module.exports.update = function (_id, project) {
    return Project.updateOne({_id}, project);
};

module.exports.remove = function (id) {
  return Project.deleteOne({_id: id});
};
