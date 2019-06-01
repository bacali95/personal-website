FROM alpine:3.8 as buildstage

WORKDIR /frontend

RUN apk add --no-cache nodejs-npm

COPY . .

RUN npm install

RUN npm run build -- --prod --build-optimizer=false

FROM nginx:alpine

COPY --from=buildstage /frontend/dist/ /var/www/portal/
RUN chmod -R 777 /var/www/portal/

ADD nginx-conf/default.conf /etc/nginx/conf.d/default.conf
ADD nginx-conf/nginx.conf  /etc/nginx/nginx.conf

CMD nginx -g "daemon off;"
