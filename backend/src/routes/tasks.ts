import { Router } from "express";
import TasksController from "../controllers/TasksController.js";

const router = Router();

router.get("/", TasksController.getAll);
router.get("/:id", TasksController.get);
router.post("/", TasksController.create);
router.patch("/:id", TasksController.update);
router.delete("/:id", TasksController.delete);

export default router;