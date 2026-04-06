import "dotenv/config";
import mysql from "mysql2/promise";
import { DB_POOL_CONNECTION_LIMIT } from "../constants/db.js";

const access = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool({
  ...access,
  waitForConnections: true,
  connectionLimit: DB_POOL_CONNECTION_LIMIT,
  queueLimit: 0,
});

export default pool;
