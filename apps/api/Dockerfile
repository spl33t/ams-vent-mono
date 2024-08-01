# build environment
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
RUN npx prisma generate
CMD [ "npm", "run", "start" ]