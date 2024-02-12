````markdown
# Docker-Node

Learn Docker with a simple Node app.

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

```bash
git clone https://github.com/quan0401/node_with_docker
cd node_with_docker
```
````

If NodeJS is already installed on your computer, use `npm run dev` to run the NodeJS project application on `localhost:3000`. You will see some text displayed in the browser.

In case NodeJS is not installed, consider installing it, as we aim to learn Docker and NodeJS together.

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
- `WORKDIR`: Sets the working directory inside the image to `/app`.
- `COPY package.json`: Copies the package.json file to leverage Docker caching for faster builds.
- `ARG NODE_ENV`: Sets an environment variable to determine whether to install devDependencies.
- `ENV PORT`: Sets the environment variable for the application port.
- `EXPOSE`: Exposes the specified port outside the container.
- `CMD`: Specifies the command to run when the container starts.

### Prerequisites

Docker must be installed on your local machine.

### Build Docker Image

```bash
docker build . -t node-app-img
```

Builds the Docker image based on the Dockerfile. The `-t` flag specifies the image name as `node-app-img`.

## Run Docker Image (Without Using docker-compose)

```bash
docker run -d --rm -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 --name node-app node-app-img
```

Runs the Docker container:

- `-d`: Runs in detached mode.
- `--rm`: Automatically removes the container when it stops.
- `-v $(pwd):/app:ro`: Syncs files/folders between the current folder and `/app` in the container. `:ro` is read-only to prevent file creation or override in the container.
- `-p 3000:3000`: Maps port 3000 on the local machine to port 3000 on the container.
- `--name`: Names the container as `node-app`.

## Docker Compose

### Docker Compose Base File

Create a `docker-compose.yml` file with the following content:

```yaml
version: "3"
services:
  node-app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
      - /app/node_modules
    environment:
      - PORT=3000
```

### Up Docker Compose

```bash
docker-compose -f docker-compose.yml up
```

Uses the Docker Compose command to create and start Docker containers based on the configurations in the specified Compose file.

## Additional Commands

- `docker exec -it node-app bash`: Access the container terminal in detached mode using the Bash shell.
- `docker-compose build --build`: Rebuilds the image when changes are made to the application.
- `docker-compose down -v`: Stops running containers and removes anonymous volumes.

## Acknowledgments

Give credit to any third-party libraries, tools, or resources that you used or were inspired by.

```

Feel free to make any further adjustments or add more specific details based on your project's requirements.
```
