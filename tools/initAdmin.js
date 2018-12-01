const specs = require('../tools/specs');
const User = require('../models/user');

module.exports = () => {
    console.log('MongoDB is ready!');
    User.getUserByUsername(specs.ADMIN_USERNAME, function (err, user) {
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