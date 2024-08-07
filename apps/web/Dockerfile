# Stage 1: Build the React app
FROM node:alpine as build

ARG ARG_APP_PORT

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:prod

# Stage 2: Production image to serve the static files
FROM node:alpine
WORKDIR /app

# Copy the build output to serve it with a simple HTTP server
COPY --from=build /app/dist ./dist

# Install a lightweight HTTP server
RUN npm install -g http-server

EXPOSE $ARG_APP_PORT
CMD ["http-server", "dist", "-p", "4200", "--proxy", "http://localhost:4200?", "--cors"]