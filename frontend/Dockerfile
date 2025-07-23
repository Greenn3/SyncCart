# Etap 1: build Reacta
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etap 2: serwowanie przez NGINX z SSL
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# certyfikaty muszą być widoczne z hosta
VOLUME ["/etc/letsencrypt"]

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
