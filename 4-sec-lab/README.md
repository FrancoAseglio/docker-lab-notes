# Docker Lab: security-hardened Node.js & MongoDB

This lab keeps the same Node.js, MongoDB, Mongo Express, and Compose structure as
the previous labs, while demonstrating practical container security defaults.

## Security controls

- The Node.js process runs as the built-in non-root `node` user.
- MongoDB is enabled with authentication and creates a separate `appuser` with
  only the `readWrite` role on `testdb`.
- The MongoDB root account is used only for administration and is not passed to
  the application.
- MongoDB authentication is enabled, and the database admin UI uses basic
	authentication.

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
│    │     ├── script.js
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
