const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASS = process.env.DATABASE_PASS;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_NAME = process.env.DATABASE_NAME;

module.exports = {
  DATABASE_URL: `mongodb+srv://${DATABASE_USER}:${encodeURIComponent(DATABASE_PASS)}@${DATABASE_HOST}/${DATABASE_NAME}?retryWrites=true`,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  TINIFY_API_KEY: process.env.TINIFY_API_KEY,
  IMAGE_CLOUD_NAME: process.env.IMAGE_CLOUD_NAME,
  IMAGE_API_KEY: process.env.IMAGE_API_KEY,
  IMAGE_API_SECRET: process.env.IMAGE_API_SECRET,
  ENV: process.env.ENV || 'test'
};
