# Pidwin Assessment

The Pidwin Fullstack Assessment.

## Prerequisites
You will need the following installed to setup this project:
- [Just](https://github.com/casey/just) p.s. you can do this with ```brew install just```
- Docker
- Docker compose
- npm

## Project setup

To run the project you can use the following command:

``` just install-deps && just run-projects ```

This command will install the dependencies from both the frontend and backend portion of the project. Then it will use docker compose to spin up a mongodb server and the backend, then starting the frontend using the usual ``` npm start ```

## Frontend

For more info look [here](./frontend/README.md)

## Backend

For more info look [here](./backend/readme.md)
