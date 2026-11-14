# 📦 Lab 1: Docker commands

A lightweight, full-stack local environment built with **Docker Commands**.
This lab features:
- a **Node.js (Express)** backend,
- a **MongoDB** data store with persistence,
- a **Mongo Express** for interactive database administration.

Everything is run by hand with plain `docker` commands: no Compose, no Makefile.

---

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
└── cmd.md                   # Docker commands 
```

---

## 🚀 Running the Lab

Open [`cmd.md`](cmd.md) and run the commands from the `1-commands-lab/` folder, in order:

1. **SET-UP**: create the network and the volume
2. **BUILD & RUN**: start MongoDB, build and start the app, start Mongo Express
3. **CLEAN-UP**: stop and remove everything

Then open:

- App: http://localhost:3000
- Mongo Express: http://localhost:8081 (`admin` / `admin`)

---

## ✅ Verify it works

1. Check that the three containers are running:
   ```bash
   docker ps
   ```
   You should see `docker-lab-app`, `docker-lab-mongo` and `docker-lab-mongo-express`,
   each with a status starting with `Up`.
2. Read the app logs:
   ```bash
   docker logs docker-lab-app
   ```
   Expect a line like `Server running on http://localhost:3000` and one like
   `Connected to MongoDB at mongodb://docker-lab-mongo:27017/testdb`.
3. Open http://localhost:3000. A fresh database shows "Empty DB atm.".
   Add an item and it appears in the list.
4. Open http://localhost:3000/items (or run `curl http://localhost:3000/items`).
   It returns `[]` on an empty database, otherwise a JSON list of your items.
   The API docs are at http://localhost:3000/api-docs.
5. Open Mongo Express at http://localhost:8081 (`admin` / `admin`), then go to
   `testdb` → `items`. The item you added is stored there.
6. Prove the data persists: run `docker restart docker-lab-mongo`, wait a few seconds
   and reload the page. The item is still there, because it lives in the `mongo-data` volume.

## 🛠️ If something goes wrong

- **`port is already allocated`**: something else uses port `3000`, `8081` or `27017`,
  often a container from another lab. Run `docker ps` to find it, run that lab's clean-up,
  or change the left side of `-p` (for example `-p 3001:3000`) and open the new port.
- **`container name ... is already in use`**: a leftover from an earlier run. Remove it with
  `docker rm -f docker-lab-app docker-lab-mongo docker-lab-mongo-express`.
- **The app is missing from `docker ps`**: run `docker ps -a` to see it as `Exited`, then
  `docker logs docker-lab-app`. It often starts before MongoDB is ready and gives up.
  Start it again with `docker start docker-lab-app`.
- **`Cannot connect to the Docker daemon`**: Docker isn't running. Start Docker Desktop
  (or the Docker service) and try again.
- **Windows:** the commands in `cmd.md` use `\` line breaks, which only work in bash.
  Use Git Bash or WSL, or join each command into one line (remove the `\` and the line breaks).
