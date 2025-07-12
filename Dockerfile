# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json .

# Install all dependencies (including react-scripts) with --legacy-peer-deps to avoid dependency conflicts
RUN npm install --legacy-peer-deps crypto-browserify

# Copy the rest of the application files
COPY . .

# Expose the port your React app will run on
EXPOSE 5173

# Run the application (this assumes you are using react-scripts)
CMD ["npm", "run", "dev"]
