const specs = require('./specs');
const User = require('../models/user');

module.exports = async () => {
    const user = await User.getByUsername(specs.ADMIN_USERNAME);
    if (!user) {
        User.create(specs.ADMIN_USERNAME, specs.ADMIN_PASSWORD);
    }
};
