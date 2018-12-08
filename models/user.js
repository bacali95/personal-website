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

module.exports.create = function (username, password) {
    return User.register(new User({username}), password);
};

module.exports.getAll = function () {
    return User.find();
};

module.exports.getByUsername = function (username) {
    return User.findOne({username});
};

module.exports.getById = function (id) {
    return User.findById(id);
};

module.exports.update = async function (id, password) {
    const user = await User.findById(id);

    await user.setPassword(password);

    return user.save();
};

module.exports.remove = async function (id) {
    return User.deleteOne({_id: id});
};

