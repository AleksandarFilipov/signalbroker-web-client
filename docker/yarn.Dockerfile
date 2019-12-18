FROM node:8-alpine
RUN apk update
RUN apk add yarn python make g++

COPY package.json /data/package.json
COPY yarn.lock /data/yarn.lock
COPY babel.config.js /data/babel.config.js
COPY vue.config.js /data/vue.config.js
COPY src /data/src/
COPY public /data/public/

WORKDIR /data
RUN yarn

ENTRYPOINT []
CMD [ "yarn", "serve"]
