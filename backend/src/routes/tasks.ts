import { Router } from "express";
import TasksController from "../controlles/TasksController.js";

const router = Router();

router.get("/", TasksController.getAll);
router.get("/:id", TasksController.get);
router.post("/", TasksController.create);
router.patch("/:id", TasksController.update);

export default router;