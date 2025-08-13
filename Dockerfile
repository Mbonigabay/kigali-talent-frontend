# Stage 1: Build the React application
# We use a Node.js base image to build the project.
FROM node:slim as builder

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's cache.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the source code.
COPY . .

# Build the app for production to the 'dist' folder.
RUN npm run build

# Stage 2: Serve the application with a lightweight Nginx server
# We use an official Nginx image as our base.
FROM nginx:stable

# Copy the built files from the 'builder' stage into Nginx's public directory.
# The 'builder' stage's /app/dist folder contains our compiled static files.
COPY --from=builder /app/dist /usr/share/nginx/html

# The 'EXPOSE' instruction informs Docker that the container listens on port 80.
EXPOSE 80

# The Nginx server starts automatically, so we don't need a custom CMD here.
# Nginx is already configured to run in the foreground by default in the alpine image.
CMD ["nginx", "-g", "daemon off;"]
