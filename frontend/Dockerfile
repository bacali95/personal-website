FROM node:10.16-alpine as buildstage

WORKDIR /frontend

COPY . .

RUN npm install

RUN npm run build:prod

FROM nginx:alpine

COPY --from=buildstage /frontend/dist/ /var/www/portal/

RUN chmod -R 777 /var/www/portal/

COPY nginx-conf/default.conf /etc/nginx/conf.d/default.conf
COPY nginx-conf/nginx.conf  /etc/nginx/nginx.conf

CMD nginx -g "daemon off;"
