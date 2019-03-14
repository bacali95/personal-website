FROM node:8

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN cd frontend && ls && npm install && ls && npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
