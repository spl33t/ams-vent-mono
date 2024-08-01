FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]