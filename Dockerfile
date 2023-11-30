# Use an official Node.js runtime as the base image
FROM node:16.13.0 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application (replace 'build' with your actual build script)
RUN npm run build

# Use a lightweight HTTP server to serve the static files
FROM nginx:alpine

# Copy the built React application from the builder stage to the nginx container
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# The default command starts the nginx web server
CMD ["nginx", "-g", "daemon off;"]

