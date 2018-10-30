const DB_USER = process.env.DB_USER === '' ? 'test' : process.env.DB_USER;
const DB_PASS = process.env.DB_PASS === '' ? 'test' : process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST === '' ? 'localhost' : process.env.DB_HOST;
module.exports.DB_URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/personal_db`;

module.exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME;
module.exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;