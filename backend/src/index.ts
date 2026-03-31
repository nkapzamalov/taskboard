import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
