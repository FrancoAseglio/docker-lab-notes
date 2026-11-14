# 🐳 Docker Lab Notes

Hands-on Docker labs, built step by step. Each lab runs the **same small app**
(Node.js/Express + MongoDB + Mongo Express) in a different way, so you can see
what changes when you move from raw commands to Compose to a hardened setup.

Notes from my own learning path. Not perfect, but hopefully useful. Issues and PRs welcome!

## The labs

| # | Lab | What you learn | How you run it |
|---|-----|----------------|----------------|
| 1 | [`1-commands-lab`](1-commands-lab/) | Networks, volumes, `docker build`, `docker run` | Commands in [`cmd.md`](1-commands-lab/cmd.md) |
| 2 | [`2-container-registry-lab`](2-container-registry-lab/) | Tagging and pushing images to Docker Hub | `make` targets |
| 3 | [`3-compose-lab`](3-compose-lab/) | Multi-container setup with Docker Compose and `.env` | `docker compose up -d` |
| 4 | [`4-sec-lab`](4-sec-lab/) | Non-root user, MongoDB auth, least-privilege DB user | `docker compose up -d` |

Suggested order: 1 → 2 → 3 → 4. Each lab folder has its own README.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (with the Compose plugin)
- `make` (lab 2 only)
- A Docker Hub account (lab 2 only, if you want to push)

Quick check:

```bash
docker --version
docker compose version
```

## Things to know before you start

- **Run one lab at a time.** All labs use the same ports (`3000`, `8081`, `27017`)
  and the same container names. Clean up a lab before starting the next one.
- **Lab 2 pushes to Docker Hub.** In the [`Makefile`](2-container-registry-lab/Makefile),
  change `DOCKER_USER` to your own username and run `docker login` first.
- **Lab 4: change the passwords.** Edit the `change-me-*` values in
  [`4-sec-lab/.env`](4-sec-lab/.env) before running.
- **Credentials here are for local learning only.** Don't reuse them anywhere real.
- Every lab contains its own copy of the `app/` folder, so each one works on its own.

## Repo structure

```text
.
├── 1-commands-lab/             # Plain docker commands (see cmd.md)
├── 2-container-registry-lab/   # Makefile + Docker Hub workflow
├── 3-compose-lab/              # docker-compose.yaml + .env
├── 4-sec-lab/                  # Compose + security hardening
├── LICENSE
└── README.md
```

Inside each lab, `app/` holds the Node.js source and the `Dockerfile`.

## License

[MIT](LICENSE)
