# pikashare


## Docker

### Display

Containers
`docker ps -a`

Images
`docker images`

### Build using docker

1. install docker
1. At source directory run

`docker build -t pikashare:v1 .`

### Use the container

`docker run -d pikashare:v1`

### Stop the container

`docker container stop container_hash`

### remove the container

`docker rm container_hash`

### remove the image

`docker rmi image_hash`
