DOCKER_USER := francoaseglio
IMAGE_NAME  := docker-lab-app
TIMESTAMP   := $(shell date +%Y%m%d_%H%M%S)
TAG         := $(DOCKER_USER)/$(IMAGE_NAME):$(TIMESTAMP)

.PHONY: help docker-build docker-push docker-run all clean

help: ## Show this help menu
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?##"}; {printf "%-20s %s\n", $$1, $$2}'

docker-build: ## Build the Node.js application image
	docker build -t $(IMAGE_NAME):local ./app

docker-push: ## Tag and push image to Docker Hub
	@echo "Tagging image as $(TAG)..."
	docker tag $(IMAGE_NAME):local $(TAG)
	@echo "Pushing image to Docker Hub..."
	docker push $(TAG)

docker-run: ## Run the application with MongoDB and Mongo Express
	docker network create docker-lab-network 2>/dev/null || true
	
	docker run -d --name docker-lab-mongo \
		--network docker-lab-network \
		-p 27017:27017 \
		-v mongo-data:/data/db \
		-v mongo-config:/data/configdb \
		mongo:7
	
	docker run -d --name docker-lab-app \
		--network docker-lab-network \
		-p 3000:3000 \
		-e MONGO_HOST=docker-lab-mongo \
		-e MONGO_PORT=27017 \
		-e MONGO_DB=testdb \
		$(IMAGE_NAME):local
	
	docker run -d --name docker-lab-mongo-express \
		--network docker-lab-network \
		-p 8081:8081 \
		-e ME_CONFIG_MONGODB_SERVER=docker-lab-mongo \
		-e ME_CONFIG_MONGODB_PORT=27017 \
		-e ME_CONFIG_BASICAUTH_USERNAME=admin \
		-e ME_CONFIG_BASICAUTH_PASSWORD=admin \
		--restart always \
		mongo-express:1.0

all: docker-build docker-push docker-run ## Build, push, and run

clean: ## Stop containers, remove images, and delete the remote repository
	@echo "Container removal..."
	-@docker rm -f docker-lab-app docker-lab-mongo docker-lab-mongo-express
	
	@echo "Image removal..."
	-@docker image rm -f $(IMAGE_NAME):local mongo:7 mongo-express:1.0
	-@docker images '$(DOCKER_USER)/$(IMAGE_NAME)' -q | xargs -r docker image rm -f
	
	@echo "Volume/network removal..."
	-@docker volume rm mongo-data mongo-config
	-@docker network rm docker-lab-network
	
	@echo "All cleaned"
