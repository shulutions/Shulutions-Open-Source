# Stage 1: Build the Angular application
FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build -- --prod

# Stage 2: Serve the Angular application using Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist/your-app-name /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
