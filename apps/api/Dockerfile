FROM node:latest

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma generate

RUN yarn build

CMD [ "node", "dist/main.js" ]