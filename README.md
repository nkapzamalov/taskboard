## Run with Docker

Start the **backend first** so MySQL and the API are up before you open the UI.

### 1. Backend (API + MySQL)

From the repository root:

1. **Go to the backend folder**

   ```bash
   cd backend
   ```

2. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Defaults use `APP_PORT=3000` and `DB_HOST=mysql` (the MySQL service name inside Compose). Change `APP_PORT` in `.env` only if you need another host port.

3. **Ensure the `taskboard` database exists**

   ```sql
   CREATE DATABASE taskboard;
   ```

4. **Build and start containers**

   ```bash
   docker compose up --build -d
   ```

5. **Run migrations and seed data** (inside the `nodejs` container)

   ```bash
   docker compose exec nodejs sh -c "npm run migrate && npm run seed"
   ```

6. **Check the API**

   The API is available at `http://localhost:<APP_PORT>` (default **http://localhost:3000**).

### 2. Frontend (Vite dev server)

Open a **second** terminal, from the repository root:

1. **Go to the frontend folder**

   ```bash
   cd frontend
   ```

2. **Build and start the UI container**

   ```bash
   docker compose up --build
   ```

   The dev server listens on **http://localhost:5173** .

