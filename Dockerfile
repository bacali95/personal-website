FROM node:10.16-alpine

RUN apk update
RUN apk add nginx
COPY ./entrypoint/default.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint/nginx.conf  /etc/nginx/nginx.conf

WORKDIR /frontend
COPY ./frontend .
RUN npm install
RUN npm run build:prod
RUN mkdir -p /var/www/admin/
RUN cp -r /frontend/dist/ /var/www/admin/
EXPOSE 80

WORKDIR /backend
COPY ./backend .
RUN mkdir -p /backend/src/public/images/for_compress
RUN mkdir -p /backend/src/public/images/uploads
RUN npm install

CMD nginx -g "daemon off;" & npm start
