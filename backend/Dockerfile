FROM ghcr.io/puppeteer/puppeteer:latest

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Create app directory
WORKDIR /usr/src/app

# The official puppeteer image runs as the 'pptruser'. Switch to root to copy files and install
USER root

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Set correct permissions
RUN chown -R pptruser:pptruser /usr/src/app

# Switch back to non-root user
USER pptruser

# Expose port
EXPOSE 5000

# Start command
CMD [ "node", "server.js" ]
