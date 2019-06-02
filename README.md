# recipe-organizr
>A web-based cookbook application built as my practicum project for my masters in software engineering.

## Build Status
> This project uses Travis CI for CI/CD builds both on commit and when a pull request is opened.

[![Build Status](https://travis-ci.org/Bwvolleyball/recipe-organizr.svg?branch=master)](https://travis-ci.org/Bwvolleyball/recipe-organizr)

## Running Locally
> This project is a host of microservices.  Therefore, to run this locally, there are several projects that need to be run.

You have two options for running this project locally.
1. Launch everything via Docker. (Ideal for running the app)
2. Launch each service individually. (Idea for localhost development)

No matter which option you choose, after starting the app, it'll be accessible at http://localhost:8080

### Launching Via Docker

**Prerequisites** - Docker must be installed on your machine.

This way leverages the [Docker Compose Yaml](./docker-compose.yml) in the root of the project directory.

From the project root, simply run:

```bash
docker-compose pull && docker-compose up
```

### Launching All Apps Indivudually

#### Spring Boot Microservices
> The microservices are written with Spring Boot, and so they bring along an embedded Tomcat or Netty server to run on.

**Prerequisites** - Java must be installed on your machine.

The following spring boot microservices must be run:

1. [Gateway](./gateway) - this is an API gateway and Reactive/Netty router. - Port 8080
2. [Auth API](./auth-api) - this is an authorization api that tracks users who have logged in.  
It will eventually provide authorization for actions that require it. - Port 8181
3. [Recipe API](./recipe-api) - this is a microservice that integrates with a 3rd party recipes api 
and handles some translation before service recipes to the front end. - Port 8282

From the directory of each of these projects, you can run the following command to launch them:

```bash
./gradlew bootRun
```

#### Angular Application
> The UI is written as an angular app, so running it locally relies on the angular cli.

**Prerequisites** - The Angular CLI must be installed on your machine.

the [Recipe Oragnizr UI](./recipe-organizr-ui) is an angular application, and can be run locally with the following command:

```bash
ng serve --disable-host-check
```

`--disable-host-check` is required because the angular cli runs the app on port 4200, but it must be served through the gateway on port 8080.

#### Database

You will also need Postgres running.  See the [Postgres Instructions](#Postgres-SQL) below.

## Postgres SQL

Postgres SQL is used locally for development via a docker container.  The root [docker-compose.yml](docker-compose.yml) is responsible for declaring all necessary localhost development dependencies.

To launch Posgres locally, ensure you have docker installed for your OS, then from this directory, simply run:
```bash
docker-compose up postgres

# or launch it in the background

docker-compose up -d postgres
```

If you need a mechanism to view the data, there is a pgadmin container included with the project which can serve as a viewer of the database.
Use the following command to launch it.
```bash
docker-compse up pgadmin
```
To log in, the user name is: `user@email.com` and the password is `password`.

