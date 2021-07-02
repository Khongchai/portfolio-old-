FROM node:14

WORKDIR /usr/src/app/.vc

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/index.js" ]