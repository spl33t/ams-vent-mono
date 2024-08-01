# build environment
FROM node:alpine as build
ENV export NODE_OPTIONS=--max-old-space-size=42768
WORKDIR /app
COPY . .
EXPOSE 4000
RUN npm i
RUN npm run build