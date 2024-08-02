# build environment
FROM node:18-alpine as build
WORKDIR /app
COPY . .
EXPOSE 4000
RUN npm i
RUN npx prisma generate
CMD [ "npm", "run", "start:dev" ]