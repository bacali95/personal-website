const DB_USER = process.env.DB_USER || "test";
const DB_PASS = process.env.DB_PASS || "test";
const DB_HOST = process.env.DB_HOST || "localhost";

module.exports = {
    DB_URL: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/personal_db`,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    TINIFY_API_KEY: process.env.TINIFY_API_KEY,
    IMAGE_CLOUD_NAME: process.env.IMAGE_CLOUD_NAME,
    IMAGE_API_KEY: process.env.IMAGE_API_KEY,
    IMAGE_API_SECRET: process.env.IMAGE_API_SECRET
};
