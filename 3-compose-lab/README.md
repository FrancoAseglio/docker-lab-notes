# 📦 Lab 3: Docker Compose

A lightweight, full-stack local environment built with **Docker Compose**.
This lab features:
- a **Node.js (Express)** backend,
- a **MongoDB** data store with persistence,
- a **Mongo Express** for interactive database administration.

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
├── .env                     # Env file used by docker-compose
└── docker-compose.yaml      # Multi-container orchestration specification
```

The `.env` file only holds local demo values, so it is safe to commit here.

## 🚀 Running the Lab

To build and start all containers in the background, run:

```bash
docker compose up -d
```

## 🧹 Clean up

To stop the services and remove the containers, volumes, images, orphan containers, and networks created by this Compose project, run:

```bash
docker compose down --volumes --rmi all --remove-orphans
```

> WARNING: `--volumes` deletes the MongoDB data stored in the `mongo-data` volume.

---

> NOTE: _https://www.composerize.com_
Use the link above to convert docker CLI commands into docker-compose.yaml .
