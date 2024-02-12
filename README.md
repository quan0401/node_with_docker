# Docker-Node

Learn Docker with simple node app

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

Provide a brief introduction to wer project. What does it do? Why is it useful?
The main purpose of this project is to `dockernize` a simple NodeJS project. It also creates dev/prod work flow with docker and NodeJS

## Setup

```bash
https://github.com/quan0401/node_with_docker
```

If we have NodeJS already installed on wer computer. We can use `npm run dev` to run NodeJS project application on `localhost:3000`, we will see some text's displayed on the browser.

In case we didn't install NodeJS on wer computer, it woulde be really nice. Since we trying to learn `docker` in the first place.

## Dockerfile configurations

```bash
FROM node:18
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
          then npm install; \
          else npm install --only=production; \
          fi

COPY . ./
ENV PORT 4000
EXPOSE ${PORT}
CMD ["node", "index.js"]
```

### Explanation:

- At the start of Dockerfile we must have `FROM`. It indicates what environment, and that environment need to build into a Image. In our case we environment with image named `node:18`, this is a built in image and official Image from NodeJS team. And we use NodeJS version 18 in this repo.
- Next we have keyword `WORKDIR`. Indicating inside the Image, creates a folder name `app` and redirect us to `/app` path.
- Next we have `COPY package.json`. We may have noticed that there are two `COPY` in this file and we may be wondering why we dont do it in a single command. The reason is that Docker have a thing call `Volume`. In the first `COPY` is different volume from the second. In wer building Image process sometimes we have to build it multiple times. Those volumes will be cache for quick build in case we build it again. If the volume havent change anything it will use from the cache. Else It will rebuild again. So in our case if `package.json` doesn't change, we don't have to re-install those packages everytime we build the image again.
- `ARG NODE_ENV` to set a variable named NODE_ENV. If statement to check whether it's a dev env. If it is, npm installation will include devDependencies.
- Set env `PORT` variable to 4000 and expose it for external usage outside of the container.
- The last command is to specify what command to run in terminal when the container is running (run-time).

### Prerequisites

Docker must be installed only local machine.

### Build docker image

```bash

docker build . -t node-app-img

```

Build Image base on Dockerfile. `-t` flag to specify the flag name of the building the image. In our case is `node-app-img`.

## Run docker image (without using docker-compose)

Provide guidelines for contributing to wer project. This could include information on how to report bugs, suggest features, or submit pull requests.

```bash

docker run -d --rm -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 --name node-app node-app-img

```

Run the docker container:

- `-d`: run in detach mode.
- `--rm`: automatically remove the container when it stops.
- `-v $(pwd):/app:ro`: sync files/folders between current `folder and /app` in the container. `:ro` is read-only prevent create files or override existed files in containers.
- `-p 3000:3000`: map port 3000 on local machine to port 3000 on the container (local:container).
- `--name`: use image `node-app-img` to create container with specified name `node-app`.

## Docker compose

### + Docker-compose base file

```bash

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

### + Up Docker-compose

```bash

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

```

`docker-compose` command is used to manage multi-container Docker applications:

- `-f docker-compose.yml`: This specify the primary Compose file named `docker-compose.yml` that contains the main configuration for Docker services.
- `-f docker-compose.yml`: This includes an additional Compose file named `docker-compose.dev.yml`. The `-f` option allow to extend or override configurations defined in the primary file. Typically, a separate file like `docker-compose.dev.yml` is used for development specific settings.
- `up`: This command is used to create and start Docker containers based on the configurations provided in the specified Compose files.

## Some addtional commands that may be helpful

- `docker exec -it node-app bash`: if we have the container running in `detach mode` and we want to access the container terminal. This conmmand will help we to achieve that using `bash` terminal.
- `docker-compose build --build`: If we made some change to our application, the `docker-compose` is not intelligent enough to notice that and rebuild the image again. So we need `--build` to build the image before run the container.
- `docker-compose down -v`: stop the running containers and remove all anonymous volumes.

## Acknowledgments

Give credit to any third-party libraries, tools, or resources that we used or were inspired by.

```

```

```

```
