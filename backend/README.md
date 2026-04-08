# Backend

Express + MySQL. Run from the **`backend/`** folder with Docker.

```bash
cp .env.example .env
```

```bash
docker compose up --build -d
```

```bash
docker compose exec nodejs sh
npm run migrate
npm run seed
exit
```

API: `http://localhost:<APP_PORT>` (e.g. `3000`).
