FROM node:18-alpine

RUN mkdir -p /home/app

COPY ./server /home/app/server
COPY ./package.json /home/app/

WORKDIR /home/app/

RUN npm install


CMD ["node", "/home/app/server/server.js"]
