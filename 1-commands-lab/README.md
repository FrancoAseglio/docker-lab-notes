# 📦 Docker Lab: basic Node.js & MongoDB interaction

A lightweight, full-stack local environment built with **Docker Commands**.
This lab features:
- a **Node.js (Express)** backend,
- a **MongoDB** data store with persistence,
- a **Mongo Express** for interactive database administration.

Use the _cmd.md_ as reference.  

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
│    │     ├── script.js
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
