# Use an official Node.js runtime as a parent image
FROM node:21.1.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./
# COPY ./package-lock.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
