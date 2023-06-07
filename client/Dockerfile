# syntax=docker/dockerfile:1
# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the root container
COPY package*.json ./

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Copy the rest of the API project files to the container
COPY . .

# Install project dependencies
RUN npm install

# Run lint command
RUN npm run lint

# Set the environment variables
ENV PORT=3000

# Expose the port that the API will be running on
EXPOSE 3000

# Start the API server
CMD [ "npm", "run", "dev" ]
