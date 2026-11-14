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
