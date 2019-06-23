const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  }
});

const Asset = module.exports = mongoose.model('Asset', AssetSchema);


module.exports.create = async function (asset) {
  return asset.save();
};

module.exports.getAll = async function () {
  return Asset.find();
};

module.exports.getByName = async function (name) {
  return Asset.findOne({name});
};

module.exports.getById = async function (id) {
  return Asset.findById(id);
};

module.exports.update = async function (id, asset) {
  return Asset.findByIdAndUpdate(id, asset);
};

module.exports.remove = async function (id) {
  return Asset.deleteOne({_id: id});
};
