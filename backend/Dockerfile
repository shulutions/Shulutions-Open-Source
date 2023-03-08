FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Remove the node_modules directory to ensure a clean build
RUN rm -rf node_modules

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]