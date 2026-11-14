# 🔒 Lab 4: security-hardened Node.js & MongoDB

This lab keeps the same Node.js, MongoDB, Mongo Express, and Compose structure as
the previous labs, while demonstrating practical container security defaults.

## Security controls

- The Node.js process runs as the built-in non-root `node` user.
- MongoDB is enabled with authentication and creates a separate `appuser` with
  only the `readWrite` role on `testdb`.
- The MongoDB root account is used only for administration and is not passed to
  the application.
- The database admin UI (Mongo Express) is protected with basic authentication.
- MongoDB is published only on `127.0.0.1`, so it is not reachable from other machines.

## 🛠️ Project Structure

```text
.
├── app/
│    ├── config/             # DB connection and Swagger config
│    │     ├── db.js
│    │     ├── mongo-init.js # Creates the least-privilege app user
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

## ⚙️ Before you start

Edit [`.env`](.env) and replace the `change-me-*` passwords with your own.

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
