var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var specs = require('../tools/specs');

initAdmin = function () {
    console.log('MongoDB is ready!');
    User.getUserByUsername('bacali', function (err, user) {
        if (err) throw err;
        if (!user) {
            user = new User({
                username: specs.ADMIN_USERNAME,
                password: specs.ADMIN_PASSWORD
            });

            User.createUser(user, function (err, user) {
                if (err) throw err;
            });
            console.log('admin created!');
        }
    });
};

mongoose.connect(specs.DB_URL, {useNewUrlParser: true}, initAdmin);

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
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

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
};

module.exports.getAllUsers = function (callback) {
    User.find(callback);
};

module.exports.getUserByUsername = function (username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function (condPassword, hash, callback) {
    bcrypt.compare(condPassword, hash, function (err, isMatch) {
        if (err) callback(err);
        callback(null, isMatch);
    })
};

module.exports.updateUser = function (id, newUser, callback) {
    if (newUser.password !== '') {
        bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            User.findByIdAndUpdate(id, newUser, callback);
        });
    } else {
        callback(null);
    }
};

