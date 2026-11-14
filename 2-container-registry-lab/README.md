# 📦 Lab 2: container registry workflow

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

Tag and push the image to Docker Hub (first change `DOCKER_USER` in the `Makefile` to your own
username and run `docker login`):

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

> `make all` includes the push, so it needs a Docker Hub account and `docker login`.
> Without one, run `make docker-build docker-run` instead.

Remove the containers and local Docker resources with:

```bash
make clean
```

`make clean` removes local containers, images, volumes, and the network.
It does **not** delete the remote Docker Hub repository.
If you pushed an image, remove it manually via hub.docker.com
(for example `francoaseglio/docker-lab-app`, or your own username).

## ✅ Verify it works

1. Check that the three containers are running:
   ```bash
   docker ps
   ```
   You should see `docker-lab-app`, `docker-lab-mongo` and `docker-lab-mongo-express`,
   each with a status starting with `Up`.
2. Read the app logs with `docker logs docker-lab-app`. Expect
   `Server running on http://localhost:3000` and a `Connected to MongoDB at ...` line.
3. Open http://localhost:3000, add an item, and check it shows up in the list.
   Mongo Express is at http://localhost:8081 (`admin` / `admin`).
4. List your local images:
   ```bash
   docker images
   ```
   `docker-lab-app:local` is the image you built.
5. After `make docker-push`, the timestamped tag `<your-user>/docker-lab-app:<timestamp>`
   also appears in `docker images`, and on your Docker Hub repository page.

## 🛠️ If something goes wrong

- **`unauthorized` or `access denied` on push**: run `docker login`, and make sure
  `DOCKER_USER` in the `Makefile` is your own Docker Hub username.
- **`make: command not found`** (common on Windows): install `make`, or use WSL or Git Bash.
  You can also run the equivalent commands from [Lab 1](../1-commands-lab/cmd.md).
- **`port is already allocated`** or **`container name ... is already in use`**:
  a container from another lab is still running. Run `make clean`, or that lab's clean-up,
  then try again.
- **The app is missing from `docker ps`**: run `docker logs docker-lab-app`. It may have
  started before MongoDB was ready. Start it again with `docker start docker-lab-app`.
- **`Cannot connect to the Docker daemon`**: Docker isn't running. Start Docker Desktop
  (or the Docker service).
