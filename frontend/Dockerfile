FROM alpine:3.8 as buildstage

WORKDIR /frontend

RUN apk add --no-cache nodejs-npm

COPY . .

RUN npm install @angular/cli@7.3.9
RUN npm install @angular/compiler-cli@7.2.15
RUN npm install @angular/language-service@7.2.15
RUN npm install @angular-devkit/build-angular@0.13.9

RUN npm install --production

RUN npm run build:prod

FROM nginx:alpine

COPY --from=buildstage /frontend/dist/ /var/www/portal/

RUN chmod -R 777 /var/www/portal/

ADD nginx-conf/default.conf /etc/nginx/conf.d/default.conf
ADD nginx-conf/nginx.conf  /etc/nginx/nginx.conf

CMD nginx -g "daemon off;"
