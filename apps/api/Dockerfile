# build environment
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
CMD [ "npm", "run", "start" ]