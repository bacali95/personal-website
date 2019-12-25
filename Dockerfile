FROM node:10.16-alpine

RUN apk update
RUN apk add nginx
COPY ./entrypoint/default.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint/nginx.conf  /etc/nginx/nginx.conf

WORKDIR /frontend
COPY ./frontend .
RUN npm install
RUN npm run build:prod
COPY /frontend/dist /var/www/portal
EXPOSE 80
RUN nginx -g "daemon off;"

WORKDIR /backend
COPY ./backend .
RUN mkdir src/public/images/for_compress
RUN mkdir src/public/images/uploads
RUN npm install
CMD [ "npm", "start" ]
