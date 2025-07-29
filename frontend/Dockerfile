# Build stage
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built files to nginx html dir
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
