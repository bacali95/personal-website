FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf  /etc/nginx/nginx.conf

EXPOSE 4000

CMD nginx -g "daemon off;"
