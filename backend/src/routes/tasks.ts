import { Router } from "express";
import TasksController from "../controlles/TasksController.js";

const router = Router();

router.get("/", TasksController.getAll);

export default router;