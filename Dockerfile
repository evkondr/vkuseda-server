# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app


COPY package*.json .
RUN npm install
ENV PORT=
ENV API_KEY=
ENV JWT_SECRET=
ENV SMTP_HOST=
ENV SMTP_PORT=
ENV SMTP_USER=
ENV SMTP_PASSWORD=
ENV SMTP_TO=
# Copy the rest of the source files into the image.
COPY /src/ ./src/
COPY types.ts .
COPY tsconfig.json .
# Run the build script.
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["node", "./dist/src/index.js"]
