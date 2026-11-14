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

## ✅ Verify it works

1. Check the services:
   ```bash
   docker compose ps
   ```
   `app`, `mongodb` and `mongo-express` should all show as running.
2. Read the app logs:
   ```bash
   docker compose logs app
   ```
   Expect `Server running on http://localhost:3000` and
   `Connected to MongoDB at mongodb://mongodb:27017/testdb`.
3. Open http://localhost:3000, add an item, and check it appears in the list.
   (A fresh database shows "Empty DB atm.".)
4. Open Mongo Express at http://localhost:8081 (`admin` / `admin`), then go to
   `testdb` → `items` to see the stored item. The API docs are at http://localhost:3000/api-docs.
5. Prove the data persists: run `docker compose restart mongodb`, wait a few seconds and
   reload the page. The item is still there, because it lives in the `mongo-data` volume.

## 🧹 Clean up

To stop the services and remove the containers, volumes, images, orphan containers, and networks created by this Compose project, run:

```bash
docker compose down --volumes --rmi all --remove-orphans
```

> WARNING: `--volumes` deletes the MongoDB data stored in the `mongo-data` volume.

---

> NOTE: _https://www.composerize.com_
Use the link above to convert docker CLI commands into docker-compose.yaml .

## 🛠️ If something goes wrong

- **`port is already allocated`**: another lab (or program) is using the port. Clean up the
  other lab first, or change the ports in [`.env`](.env).
- **`container name ... is already in use`**: a container from another lab is still around.
  Clean up that lab, or run `docker rm -f docker-lab-app docker-lab-mongo docker-lab-mongo-express`.
- **The app keeps exiting**: run `docker compose logs app`. It may have started before MongoDB
  was ready. Try `docker compose restart app`.
- **`Cannot connect to the Docker daemon`**: Docker isn't running. Start Docker Desktop
  (or the Docker service).
- To see everything at once: `docker compose ps -a` and `docker compose logs`.
