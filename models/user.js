const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) {
            throw err;
        }
        newUser.password = hash;
        newUser.save(callback);
    });
};

module.exports.getAllUsers = function (callback) {
    User.find(callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {username};
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function (condPassword, hash, callback) {
    bcrypt.compare(condPassword, hash, function (err, isMatch) {
        if (err) {
            callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports.updateUser = function (id, newUser, callback) {
    if (newUser.password !== "") {
        bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            User.findByIdAndUpdate(id, newUser, callback);
        });
    } else {
        callback(null);
    }
};

