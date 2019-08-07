#! /bin/bash

# Set the docker-compose command
function docker-compose {
  docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose:1.24.1 "$@"
}

curl https://raw.githubusercontent.com/Bwvolleyball/recipe-organizr/master/gcp/docker-compose.yml --output docker-compose.yml

docker-compose pull
docker-compose up --force-recreate --remove-orphans -d

docker image prune -f
