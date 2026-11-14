# 📦 Docker Lab: container registry workflow

A lightweight, full-stack local environment built with **Docker commands and a Makefile**.
This lab features:
- a **Node.js (Express)** backend,
- a **MongoDB** data store with persistence,
- a **Mongo Express** for interactive database administration,
- a **Docker Hub** image tagging and push workflow.

The application source and Dockerfile are included in the `app/` directory.

## 🛠️ Project Structure

```text
.
├── app/
│    ├── config/             # DB connection and Swagger config
│    │     ├── db.js
│    │     └── swagger.js
│    ├── models/             # Mongoose Schema
│    │     └── Item.js
│    ├── public/             # Frontend Assets
│    │     ├── index.html
│    │     ├── scripts.js
│    │     └── style.css
│    ├── routes/             # API routing
│    │     └── itemRoutes.js
│    ├── Dockerfile          # Node.js container setup configuration
│    ├── package.json        # Node dependencies
│    └── server.js           # Main Express application entry point
│
├── Makefile                 # Build, push, run, and clean commands
└── README.md                # Lab documentation
```

## 🚀 Usage

Build the application image:

```bash
make docker-build
```

Tag and push the image to Docker Hub:

```bash
make docker-push
```

Start the application stack:

```bash
make docker-run
```

The services are available at:

- Application: http://localhost:3000
- Mongo Express: http://localhost:8081

The Mongo Express credentials are `admin` / `admin`.

Run the complete build, push, and start workflow with:

```bash
make all
```

Remove the containers and local Docker resources with:

```bash
make clean
```

`make clean` removes local containers, images, volumes, and the network.
It does **not** delete the remote Docker Hub repository  
remove `francoaseglio/docker-lab-app` manually via hub.docker.com if needed.
