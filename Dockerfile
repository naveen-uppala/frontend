# Stage 1: Build React app
FROM node:22.11.0 AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps && npm run build && cp -r build server
WORKDIR /app/server
RUN npm install --legacy-peer-deps

# Stage 2: Rnunning the BFF Server
FROM node:22-alpine AS final
WORKDIR /server
COPY --from=build /app/server .
EXPOSE 5000
CMD ["node", "index.js"]
