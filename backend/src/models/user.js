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
  },
  image: {
    type: Object
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  profession: {
    type: String
  },
  intro: {
    type: String
  },
  birthday: {
    date: {
      type: Date
    },
    place: {
      type: String
    }
  },
  nationality: {
    type: String
  },
  maritalStatus: {
    type: String
  },
  address: {
    type: String,
  },
  email: {
    type: String
  },
  website: {
    type: String
  },
  phone: {
    type: String
  },
  skype: {
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.create = async function (username, password) {
  const user = new User({
    username,
    password: encrypt(password),
    firstName: 'Change',
    lastName: 'Me'
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

module.exports.update = async function (user) {
  const oldUser = await User.findById(user._id);
  let newUser = user;
  if (newUser.password !== null) {
    newUser.password = encrypt(newUser.password);
  } else {
    newUser.password = oldUser.password;
  }
  return User.findOneAndUpdate({_id: newUser._id}, newUser);
};

module.exports.remove = async function (id) {
  return User.deleteOne({_id: id});
};

module.exports.isValidPassword = async function (username, password) {
  const user = await User.findOne({username});
  return decrypt(user.password) === password;
};

