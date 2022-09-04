# Dependency Programs

- node
- npm
- docker
- docker-compose

# Usage

Ports:

- Client: 3000 - http://localhost:3000
- Server: 5000 - http://localhost:5000 (as proxy: http://localhost:3000/api, http://localhost:3000/static)

## Install

```sh
npm run install
```

## Production

```sh
npm run build
npm run serve
```

## Dev

```sh
npm run dev
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
- [ ] PostgreSQL in Docker
- [ ] Animations
- [ ] Backend Tests in Jest
