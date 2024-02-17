# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app


# COPY package*.json .
COPY --chown=node:node . .
RUN npm install && npm run build

# Copy the rest of the source files into the image.


# Run the build script.
# RUN npm run build

# Expose the port that the application listens on.
EXPOSE 4000

USER node
# Run the application.
CMD ["node", "./dist/src/index.js"]
