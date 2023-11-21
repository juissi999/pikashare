# pikashare


## Docker

### Display

Containers
```docker ps -a```

Images
```docker images```

### Build using docker

1. Install docker
1. At source directory run

```docker build -t pikashare:v1 .```

### Use the container

Run the container
```docker run -d pikashare:v1```

Run the container and map ports to host
```docker run -d -p 80:8080 pikashare:v1```

Stop the container

```docker container stop container_hash```

Remove the container

```docker rm container_hash```

Remove the image

```docker rmi image_hash```
