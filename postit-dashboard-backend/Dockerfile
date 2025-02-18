FROM node:current

WORKDIR /usr/src/app

# Copy only package.json and package-lock.json (not node_modules)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

