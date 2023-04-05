# Use an official Node.js runtime as a parent image
FROM node:14-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build --prod

# Use an official Nginx runtime as a parent image
FROM nginx:1.21-alpine

# Copy the built application from the previous stage
COPY --from=builder /app/dist/shulutions-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

