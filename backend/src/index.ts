import express from "express";
import 'dotenv/config'

import { Express } from "express";

import tasksRouter from "./routes/tasks.js";

const app: Express = express();
const port = process.env.PORT;

app.use("/tasks", tasksRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
