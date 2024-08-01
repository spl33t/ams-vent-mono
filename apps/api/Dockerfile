# build environment
FROM node:latest as build

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 4000

RUN npx prisma generate
CMD [ "npm", "run", "dev" ]