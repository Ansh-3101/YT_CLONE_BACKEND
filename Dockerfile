FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update -y
RUN apt-get install -y nodejs

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY controllers controllers
COPY models models
COPY utils utils
COPY middlewares middlewares
COPY validators validators
COPY routes routes
COPY db.js db.js
COPY index.js index.js
COPY .env .env

ENTRYPOINT [ "node", "index.js" ]
