FROM nginx:alpine

ADD default.conf /etc/nginx/conf.d/default.conf
ADD nginx.conf  /etc/nginx/nginx.conf

EXPOSE 4000

CMD nginx -g "daemon off;"
