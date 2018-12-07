const specs = require("../tools/specs");
const User = require("../models/user");

module.exports = () => {
    User.getByUsername(specs.ADMIN_USERNAME, function (err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            User.register(new User({username: specs.ADMIN_USERNAME}),specs.ADMIN_PASSWORD, function (err) {
                if (err) {
                    throw err;
                }
            });
        }
    });
};