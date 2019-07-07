FROM node:10.16-alpine

WORKDIR /backend

COPY . .

RUN mkdir src/public/images/for_compress
RUN mkdir src/public/images/uploads

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
