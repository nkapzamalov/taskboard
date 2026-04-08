import cors from "cors";
import express from "express";
import type { Express } from "express";
import { CORS_ALLOWED_ORIGINS } from "./constants/server.js";
import taskRouter from "./routes/tasks.js";
import ResponseService from "./services/ResponseService.js";

const app: Express = express();
const port = process.env.APP_PORT;

app.use(
  cors({
    origin: [...CORS_ALLOWED_ORIGINS],
  }),
);
app.use(express.json());

app.use("/tasks", taskRouter);

app.use((_req, res, _next) => {
  ResponseService.notFound(res, "Not Found")
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
