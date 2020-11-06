FROM node:12-alpine as build-statge

ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_DATABASE_URL
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_STORAGE_BUCKET
ARG FIREBASE_MESSAGING_SENDER_ID
ARG FIREBASE_APP_ID
ARG FIREBASE_MEASUREMENT_ID

ENV FIREBASE_API_KEY=$FIREBASE_API_KEY
ENV FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN
ENV FIREBASE_DATABASE_URL=$FIREBASE_DATABASE_URL
ENV FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
ENV FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET
ENV FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID
ENV FIREBASE_APP_ID=$FIREBASE_APP_ID
ENV FIREBASE_MEASUREMENT_ID=$FIREBASE_MEASUREMENT_ID

WORKDIR /frontend
COPY ./frontend .
RUN yarn
RUN yarn build:prod

WORKDIR /backend
COPY ./backend .
RUN yarn
RUN yarn build
RUN yarn --prod

FROM node:12-alpine as final-stage

RUN apk update
RUN apk add nginx

COPY ./entrypoint/default.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint/nginx.conf  /etc/nginx/nginx.conf

RUN mkdir -p /var/www/
COPY --from=build-statge /frontend/build/ /var/www/
EXPOSE 80

WORKDIR /backend
COPY --from=build-statge /backend/node_modules ./node_modules
COPY --from=build-statge /backend/nest-cli.json ./nest-cli.json
COPY --from=build-statge /backend/package.json ./package.json
COPY --from=build-statge /backend/dist ./dist

CMD nginx -g "daemon off;" & yarn start:prod
