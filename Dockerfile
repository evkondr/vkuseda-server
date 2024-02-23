# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-bullseye-slim as base

# Set container user
USER node
# Set working directory for all build stages.
WORKDIR /app
# Copy files
COPY --chown=node:node package*.json .
COPY --chown=node:node . .
# Run build
RUN npm install && npm run build
# Expose the port that the application listens on.
EXPOSE 4000
# Run the application.
CMD ["npm", "run", "prod"]
