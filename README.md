# Personal-Website

[![Known Vulnerabilities](https://snyk.io/test/github/bacali95/personal-website/badge.svg)](https://snyk.io/test/github/bacali95/personal-website)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bb9e671debb748f880a11f2aad198d05)](https://www.codacy.com/app/bacali95/personal-website?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bacali95/personal-website&amp;utm_campaign=Badge_Grade)
[![dependencies Status](https://david-dm.org/bacali95/personal-website/status.svg)](https://david-dm.org/bacali95/personal-website)
[![devDependencies Status](https://david-dm.org/bacali95/personal-website/dev-status.svg)](https://david-dm.org/bacali95/personal-website?type=dev)

My Personal Website(Resume) V2 with NodeJS.


## Run Instructions
There is two ways to run the project:
1. Set these environment variables:

    `ADMIN_USERNAME` `ADMIN_PASSWORD` `DB_HOST` `DB_USER` `DB_PASS`
    `IMAGE_API_KEY` `IMAGE_API_SECRET` `IMAGE_CLOUD_NAME` `TINIFY_API_KEY`
    
    then run:
    ```bash
    $ cd frontend/
    $ npm install   # frontend modules 
    $ npm run build
    $ cd ..
    $ npm install   # backend modules 
    $ npm start       
    ```
    and open the browser on `http://localhost:3000`
1. Build the docker image with:
    ```bash
    $ docker build -t <username>/node-web-app .
    ```
    then just run it in this way:
    ```bash
    docker run -p 1234:3000 \
    -e ADMIN_USERNAME=<value> \
    -e ADMIN_PASSWORD=<value> \
    -e DB_HOST=<value> \
    -e DB_USER=<value> \
    -e DB_PASS=<value> \
    -e IMAGE_API_KEY=<value> \
    -e IMAGE_API_SECRET=<value> \
    -e IMAGE_CLOUD_NAME=<value> \
    -e TINIFY_API_KEY=<value> \
    --name personal-website -d <username>/personal-website
    ```
    and open the browser on `http://localhost:1234`