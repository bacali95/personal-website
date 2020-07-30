const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  value: {
    type: Number,
  },
  rank: {
    type: Number,
  }
});

const Skill = module.exports = mongoose.model('Skill', SkillSchema);


module.exports.create = async function (skill) {
  return skill.save();
};

module.exports.getAll = async function () {
  return Skill.find();
};

module.exports.getByName = async function (name) {
  return Skill.findOne({name});
};

module.exports.getById = async function (id) {
  return Skill.findById(id);
};

module.exports.update = async function (id, skill) {
  return Skill.findByIdAndUpdate(id, skill);
};

module.exports.remove = async function (id) {
  return Skill.deleteOne({_id: id});
};
