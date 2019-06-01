FROM alpine:3.8

WORKDIR /backend

RUN apk add --no-cache nodejs-npm

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
