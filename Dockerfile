# # Stage 1: Build React app
#  FROM node:22.11.0 AS build
#  WORKDIR /app
#  COPY package*.json ./
#  RUN npm install --legacy-peer-deps
#  COPY . .
#  RUN npm run build

# Stage 1: Build React app
FROM node:22.11.0 AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps && npm run build
COPY build /server
WORKDIR /server
RUN npm install --legacy-peer-deps


FROM node:22-alpine AS final
WORKDIR /server
COPY --from=build /app/server .
EXPOSE 5000
CMD ["node", "index.js"]
