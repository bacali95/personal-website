const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "username",
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.create = function (username, password, callback) {
    User.register(new User({username}), password, function (err) {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};

module.exports.getAll = function (callback) {
    User.find(callback);
};

module.exports.getByUsername = function (username, callback) {
    const query = {username};
    User.findOne(query, callback);
};

module.exports.getById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.update = function (id, password, callback) {
    User.findById(id, function (err, user) {
        if (err || user === null) {
            callback(err);
        }
        user.setPassword(password, function (err) {
            if (err || !user) {
                callback(err);
            }
            user.save();
            callback(null);
        });
    });
};

