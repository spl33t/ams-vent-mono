# build environment
FROM node:latest as build
WORKDIR /app
COPY . .
EXPOSE 4000
RUN npm i
RUN npx prisma generate
RUN npm run build
CMD [ "node", "dist/main.js" ]