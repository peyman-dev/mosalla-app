# Step 1: Build stage
FROM node:20 AS builder

WORKDIR /app

# Increase npm timeout to prevent timeout errors (further increase)
RUN npm config set fetch-timeout 300000  # 5 minutes
RUN npm config set fetch-retries 10  # Retry 10 times

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Run the build (Next.js app)
RUN npm run build

# Step 2: Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built files from the builder
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --production --legacy-peer-deps

# Set environment to production
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
