
# Stage 1: Build React app

FROM node:22.11.0 AS build
WORKDIR /app                         # Set the working directory for React app
COPY . .                             # Copy package.json and package-lock.json (if present) and install dependencies
RUN npm install --legacy-peer-deps   # Install packages without checking for peer dependency compatibility
RUN npm run build                    # Build the React app for production




# Stage 2: Set up Express server with React build files
FROM node:22.11.0 AS final
WORKDIR /server                        # Set working directory for the Express server
COPY server/ ./
RUN npm install --legacy-peer-deps     # Copy the React build files from the build stage
COPY --from=build /app/build ./build
EXPOSE 5000                            # Expose the port on which the Express server will run
CMD ["node", "index.js"]               # Start the Express server
