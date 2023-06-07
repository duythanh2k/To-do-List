# syntax=docker/dockerfile:1
# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the root container
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install project dependencies
RUN npm install

# Run prisma
# RUN npx prisma generate

# Set the environment variables
ENV PORT=8000

# Expose the port that the API will be running on
EXPOSE 8000

# Start the API server
CMD ["npm", "run", "start:dev"]
