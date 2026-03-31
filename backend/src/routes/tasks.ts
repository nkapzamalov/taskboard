import { Router } from "express";
import TasksController from "../controlles/TasksController.js";

const router = Router();

router.get("/", TasksController.getAll);
router.get("/:id", TasksController.get);
router.post("/", TasksController.create);

export default router;