# Stage 1: Build stage
FROM node:22.11.0 AS stage1
COPY /. /node/
WORKDIR /node
RUN npm install
RUN npm run build

# Stage 2: Production stage
FROM nginx AS stage2
COPY --from=stage1 /node/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
