# Personal-Website

![Build/Release](https://github.com/bacali95/personal-website/workflows/Build/Release/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bb9e671debb748f880a11f2aad198d05)](https://www.codacy.com/app/bacali95/personal-website?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bacali95/personal-website&amp;utm_campaign=Badge_Grade)

My Personal Website(Resume) with NodeJS.

## How to run ?

### Normal way :

1. Run the backend first
    1. Open a new terminal and run `cd backend`. 
    1. Export these environment variables in your terminal:
        ```
        - ENV=test
        - ADMIN_USERNAME=username
        - ADMIN_PASSWORD=password
        - DATABASE_HOST=mongodb_hostname
        - DATABASE_USER=mongodb_username
        - DATABASE_PASS=mongodb_password
        - DATABASE_NAME=mongodb_database_name
        - IMAGE_API_KEY=cloudinary_api_key
        - IMAGE_API_SECRET=cloudinary_api_secret
        - IMAGE_CLOUD_NAME=cloudinary_cloud_name
        - TINIFY_API_KEY=tinify_api_key
        ```
    1. Run `npm install && npm start`.
1. Run the frontend (dashboard part):
    1. Open a new terminal and run `cd frontend`. 
    1. Run `npm install && npm start`.
### Docker way :

1. Replace the environment variables of the backend service in the `docker-compose.yml` file:

    ```
    - ENV=test
    - ADMIN_USERNAME=username
    - ADMIN_PASSWORD=password
    - DATABASE_HOST=mongodb_hostname
    - DATABASE_USER=mongodb_username
    - DATABASE_PASS=mongodb_password
    - DATABASE_NAME=mongodb_database_name
    - IMAGE_API_KEY=cloudinary_api_key
    - IMAGE_API_SECRET=cloudinary_api_secret
    - IMAGE_CLOUD_NAME=cloudinary_cloud_name
    - TINIFY_API_KEY=tinify_api_key
    ```
1. Then run `docker-compose up --build` and wait the build to be completed.
1. Open the url `http://localhost:4000` in your browser.
