# SET-UP
```bash
docker network create docker-lab-network

docker volume create mongo-data
```

# BUILD & RUN
```bash
docker run -d --name docker-lab-mongo \
  --network docker-lab-network \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  -v mongo-config:/data/configdb \
  mongo:7

docker build -t docker-lab-app ./app

docker run -d --name docker-lab-app \
  --network docker-lab-network \
  -p 3000:3000 \
  -e MONGO_HOST=docker-lab-mongo \
  -e MONGO_PORT=27017 \
  -e MONGO_DB=testdb \
  docker-lab-app

docker run -d --name docker-lab-mongo-express \
  --network docker-lab-network \
  -p 8081:8081 \
  -e ME_CONFIG_MONGODB_SERVER=docker-lab-mongo \
  -e ME_CONFIG_MONGODB_PORT=27017 \
  -e ME_CONFIG_BASICAUTH_USERNAME=admin \
  -e ME_CONFIG_BASICAUTH_PASSWORD=admin \
  --restart always mongo-express:1.0
```

# CLEAN-UP
```bash
docker stop docker-lab-app docker-lab-mongo docker-lab-mongo-express

docker rm docker-lab-app docker-lab-mongo docker-lab-mongo-express

docker rmi -f docker-lab-app mongo:7 mongo-express:1.0

docker volume rm mongo-data mongo-config

docker network rm docker-lab-network
```
---
To verify that the cleanup step completely cleared all resources, run:  

```bash
  docker ps -a && docker image ls && docker volume ls && docker network ls
```
No the docker-lab-* containers, images, volumes, or networks should output.
