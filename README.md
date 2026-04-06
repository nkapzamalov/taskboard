# Taskboard

Full-stack task board: **Express + TypeScript + MySQL** API in `backend/`, **React + Vite + Tailwind** UI in `frontend/`.

## Prerequisites

- **Node.js** (LTS recommended)
- **MySQL** (8.x or compatible) running and reachable

## Run locally (step by step)

### 1. Create the database

In MySQL, create an empty database (name it whatever you will put in `.env`):

```sql
CREATE DATABASE tasks;
```

### 2. Backend API

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and set:

| Variable        | Description |
|-----------------|-------------|
| `DB_HOST`       | MySQL host (e.g. `127.0.0.1`) |
| `DB_USER`       | MySQL user |
| `DB_PASSWORD`   | MySQL password (leave empty if none) |
| `DB_NAME`       | Same database name you created above |

Then:

```bash
npm install
npm run migrate
npm run seed 
npm run dev
```

The API runs at **http://localhost:3000** and allows CORS from the Vite dev app at **http://localhost:5173**.

### 3. Frontend

Open a **second** terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite dev app at **http://localhost:5173**

