const {writeFileSync, existsSync, mkdirSync} = require('fs');
const {argv} = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const folderPath = `./src/environments`;
const targetPath = `${folderPath}/environment.ts`;
const prodTargetPath = `${folderPath}/environment.prod.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}',
  },
};
`;

!existsSync(folderPath) && mkdirSync(folderPath);
// write the content to the respective file
writeFileSync(targetPath, environmentFileContent);
writeFileSync(prodTargetPath, environmentFileContent);
