FROM --platform=linux/amd64 node:lts-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM --platform=linux/amd64 nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/attendance-system /usr/share/nginx/html

EXPOSE 80