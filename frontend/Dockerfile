# Etap 1: build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etap 2: prod serwowanie przez Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
