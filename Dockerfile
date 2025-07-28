# Stage 1: Build React app
FROM node:22.11.0 AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps \
  && npm run build \
  && cp -r build server \
  && cd server \
  && npm install --legacy-peer-deps

# Stage 2: Run the BFF Server
FROM node:22-alpine AS final
WORKDIR /server
COPY --from=build /app/server .
COPY my-private-root-ca.pem /server/certs/my-private-root-ca.pem
EXPOSE 5000
CMD ["node", "index.js"]
