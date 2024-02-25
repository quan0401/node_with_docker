# Docker-Node

Learn Docker with a simple Node app

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Dockerfile Configurations](#dockerfile-configurations)
  - [Prerequisites](#prerequisites)
  - [Build Docker Image](#build-docker-image)
- [Run Docker Image (Without Using docker-compose)](#run-docker-image-without-using-docker-compose)
- [Docker Compose](#docker-compose)
  - [Docker Compose Base File](#docker-compose-base-file)
  - [Up Docker Compose](#up-docker-compose)
- [Additional Commands](#additional-commands)
- [Acknowledgments](#acknowledgments)

## Introduction

The main purpose of this project is to dockerize a simple NodeJS application and establish a development/production workflow using Docker and NodeJS.

## Setup

### Option 1: Run on the local machine

```bash
git clone https://github.com/quan0401/node_with_docker
cd node_with_docker
npm run dev # If NodeJS is already installed
```

If NodeJS is not installed, consider installing it, as we aim to learn Docker and NodeJS together.

### Option 2: Run on Docker (recommended)

```bash
git clone https://github.com/quan0401/node_with_docker
cd node_with_docker
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

## Dockerfile Configurations

```Dockerfile
FROM node:18
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --only=production; fi

COPY . ./
ENV PORT 4000
EXPOSE ${PORT}
CMD ["node", "index.js"]
```

### Explanation:

- `FROM`: Specifies the base environment for the Docker image, using the official NodeJS image with version 18.
- ...

### Prerequisites

Docker must be installed on your local machine.

### Use docker-compose to run

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

Builds the Docker image based on the Dockerfile.

### Docker Compose Base File

Create a `docker-compose.yml` file with the following content:

```yaml
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "3000:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro

  node-app:
    platform: "linux/arm64"
    build:
      context: .
      platforms:
        - linux/amd64
        - linux/arm64
    image: quan0401/node-app
    volumes:
      - ./:/app
      - /app/node_modules
    environment:
      - PORT=3000
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo
    restart: unless-stopped
    volumes:
      - mongo-db:/data/db

  redis:
    image: redis

volumes:
  mongo-db:
```

### Up Docker Compose

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

Uses the Docker Compose command to create and start Docker containers based on the configurations in the specified Compose file.

## Additional Commands

- `docker exec -it node-app bash`: Access the container terminal in detached mode using the Bash shell.
- ...

## Acknowledgments

Give credit to any third-party libraries, tools, or resources that you used or were inspired by.

Feel free to modify any part of it according to your needs!
