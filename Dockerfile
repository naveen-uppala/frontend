# Stage 1: Build React app
 FROM node:22.11.0 AS build
 
 # Set the working directory for React app
 WORKDIR /app
 
 # Copy package.json and package-lock.json (if present) and install dependencies
 COPY package*.json ./
 RUN npm install --legacy-peer-deps
 
 # Copy the rest of the React app's source code
 COPY . .
 
 # Build the React app for production
 RUN npm run build




FROM node:22.11.0 AS final
 
 # Set working directory for the Express server
 WORKDIR /server
 
 # Install Express.js dependencies
 COPY server/package*.json ./
 RUN npm install --legacy-peer-deps
 
 # Copy the React build files from the build stage
 COPY --from=build /app/build ./build
 
 # Copy the Express server code
 COPY server/ ./
 
 # Expose the port on which the Express server will run
 EXPOSE 5000
 
 # Start the Express server
 CMD ["node", "index.js"]
