# Step 1: Use an official Node.js runtime as a parent image
FROM node:16

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code to the working directory
COPY . .

# Step 6: Set environment variables (you can use .env or environment variables)
# ENV NODE_ENV=production
# ENV DATABASE_URL=postgres://postgres:postgres@localhost:5432/taodb

# Step 7: Expose the port the app runs on (if applicable, e.g., Express runs on port 3000)
EXPOSE 4001

# Step 8: Define the command to run your app (this assumes the start script is defined in package.json)
CMD [ "npm", "start" ]