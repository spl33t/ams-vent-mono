# Stage 1: Build the React app
FROM node:alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:prod

# Stage 2: Production image to serve the static files
FROM node:alpine
WORKDIR /app

# Copy the build output to serve it with a simple HTTP server
COPY --from=build /app/build ./build

# Install a lightweight HTTP server
RUN npm install -g http-server

EXPOSE 4200
CMD ["http-server", "build", "-p", "4200"]