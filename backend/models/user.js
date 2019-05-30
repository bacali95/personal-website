const mongoose = require('mongoose');
const {decrypt, encrypt} = require('../tools/encryption');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.create = async function (username, password) {
  const user = new User({
    username,
    password: encrypt(password)
  });
  return user.save();
};

module.exports.getAll = async function () {
  return User.find();
};

module.exports.getByUsername = async function (username) {
  return User.findOne({username});
};

module.exports.getById = async function (id) {
  return User.findById(id);
};

module.exports.update = async function (id, password) {
  const user = await User.findById(id);
  user.password = encrypt(password);
  return user.save();
};

module.exports.remove = async function (id) {
  return User.deleteOne({_id: id});
};

module.exports.isValidPassword = async function (username, password) {
  const user = await User.findOne({username});
  return decrypt(user.password) === password;
};

