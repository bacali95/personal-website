FROM node:8-alpine

WORKDIR /usr/src/app

COPY docker .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
