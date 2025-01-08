FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the backend
CMD ["npm", "run", "dev"]
