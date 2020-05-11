FROM node:13-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && apk del .gyp
COPY . .