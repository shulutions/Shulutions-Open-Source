# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Remove the node_modules directory to ensure a clean build
RUN rm -rf node_modules

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
