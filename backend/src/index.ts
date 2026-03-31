import express from "express";
import 'dotenv/config'
import connection from "./config/db.js";
import type { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT;

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
