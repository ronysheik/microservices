# Use the official Node.js image as a base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Permission to access modules
RUN chmod +x ./node_modules/.bin/tsc

# Build the React app
RUN npm run build

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
