# recipe-organizr
>A web-based cookbook application built as my practicum project for my masters in software engineering.

## Build Status
> This project uses Travis CI for CI/CD builds both on commit and when a pull request is opened.

[![Build Status](https://travis-ci.org/Bwvolleyball/recipe-organizr.svg?branch=master)](https://travis-ci.org/Bwvolleyball/recipe-organizr)

## Postgres SQL

Postgres SQL is used locally for development via a docker container.  The root [docker-compose.yml](docker-compose.yml) is responsible for declaring all necessary localhost development dependencies.

To launch Posgres locally, ensure you have docker installed for your OS, then from this directory, simply run:
```bash
docker-compose up

# or launch it in the background

docker-compose up -d
```
