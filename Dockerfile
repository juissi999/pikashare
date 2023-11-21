FROM node:18-alpine

RUN mkdir -p /home/app

COPY ./server /home/app/server
COPY ./package.json /home/app/
COPY ./.env /home/app/

WORKDIR /home/app/

RUN npm install

RUN mkdir data
RUN touch data/db.json

CMD ["node", "/home/app/server/server.js"]
