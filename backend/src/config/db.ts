import 'dotenv/config';
import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
};

const pool =  mysql.createPool(access);

export default pool;
