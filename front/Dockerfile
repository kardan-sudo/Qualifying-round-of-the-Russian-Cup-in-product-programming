# Stage 1: Build the frontend
FROM node:18 as build-stage

WORKDIR /app
COPY front/package*.json ./
RUN npm install
COPY front/ ./
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY front/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
