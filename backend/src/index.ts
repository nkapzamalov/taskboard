import cors from "cors";
import express from "express";
import type { Express } from "express";
import taskRouter from "./routes/tasks.js"

const app: Express = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  }),
);
app.use(express.json());

app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
