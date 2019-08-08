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

sudo docker kill $(docker ps -q)
sudo docker rm $(docker ps -aq)
# had to use this article to fix docker-compose: https://rafpe.ninja/2016/03/25/docker-compose-error-while-loading-shared-libraries-libz-so-1/
sudo bash -c "$(declare -f docker-compose); docker-compose pull"
sudo bash -c "$(declare -f docker-compose); docker-compose up --force-recreate --remove-orphans -d"

sudo docker image prune -f
