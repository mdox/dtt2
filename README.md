# Dependency Programs

- node
- npm
- docker
- docker-compose

# Main Utilites

- vite (for frontend)
- jest (for testing)
- knex (for backend, handling the database)

# Final Model

Web Client <-> Server -> Controller -> Service -> DAO -> Database

# Final Branches

- part-1
- part-2

# Usage

Ports:

- Client: 3000 - http://localhost:3000
- Server: 5000 - http://localhost:5000 (as proxy: http://localhost:3000/api, http://localhost:3000/static)
- Database: 5432

## Install

```sh
npm run init
npm run db:start           # For Part 2
npm run server:db:init:all # For Part 2
```

## Production

```sh
npm run build
npm run db:start # For Part 2
npm run serve
```

## Dev

```sh
npm run db:start # For Part 2
npm run dev
```

## Shutdown Database

```sh
npm run db:stop
```

## Test

```sh
npm run server:test
```

# TODO

## Part 1

### Part 1 Backend

- [x] GET api/drivers
- [x] Randomized places
- [x] Serve Images by Backend server
- [x] POST api/drivers/{driverId}/overtake

### Part 1 Frontend

- [x] /drivers page
- [x] Card: name, team, place, code, photo
- [x] Button for Overtake
- [x] Minimal style

## Part 2

- [x] Flags
- [x] Multiple overtake, Drag & Drop
- [x] PostgreSQL in Docker
- [x] Animations
- [x] Backend Tests in Jest
