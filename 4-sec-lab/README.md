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

## ✅ Verify it works

1. Check the services with `docker compose ps`. `app`, `mongodb` and `mongo-express`
   should all be running.
2. Read the app logs with `docker compose logs app`. Expect
   `Connected to MongoDB database: testdb`.
3. Open http://localhost:3000 and add an item. Mongo Express is at http://localhost:8081
   (`admin` / `admin`).

Now check the security controls:

4. The app does not run as root:
   ```bash
   docker compose exec app whoami
   ```
   It prints `node`.
5. MongoDB refuses anonymous access (run this after you have added an item):
   ```bash
   docker compose exec mongodb mongosh testdb --quiet --eval "db.items.find().toArray()"
   ```
   You get an error saying the command requires authentication.
6. The app user can read the data. Use the `MONGO_APP_PASSWORD` from your `.env`:
   ```bash
   docker compose exec mongodb mongosh testdb --quiet -u appuser -p <MONGO_APP_PASSWORD> \
     --authenticationDatabase testdb --eval "db.items.find().toArray()"
   ```
   This prints your items. (On Windows PowerShell, put it on one line without the `\`.)

## 🧹 Clean up

To stop the services and remove the containers, volumes, images, orphan containers, and networks created by this Compose project, run:

```bash
docker compose down --volumes --rmi all --remove-orphans
```

> WARNING: `--volumes` deletes the MongoDB data stored in the `mongo-data` volume.

## 🛠️ If something goes wrong

- **The app can't connect, or says authentication failed**: you probably changed the
  passwords in [`.env`](.env) *after* the first start. MongoDB only creates its users when
  the volume is empty, so the old passwords are still stored. Reset and start again
  (this deletes the lab's data):
  ```bash
  docker compose down --volumes
  docker compose up -d
  ```
- **`port is already allocated`**: another lab (or program) is using the port. Clean up the
  other lab first, or change the ports in [`.env`](.env).
- **`container name ... is already in use`**: a container from another lab is still around.
  Clean up that lab first.
- **The app keeps exiting**: run `docker compose logs app`. If it is not an authentication
  problem, it may have started before MongoDB was ready. Try `docker compose restart app`.
- **`Cannot connect to the Docker daemon`**: Docker isn't running. Start Docker Desktop
  (or the Docker service).
