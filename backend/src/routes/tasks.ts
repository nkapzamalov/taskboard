import { Router } from "express";
import TasksController from "../controllers/TasksController.js";
import ValidationCheck from "../middleware/ValidationCheck.js";
import ValidationResult from "../middleware/ValidationResult.js";

const router = Router();

router.get("/", 
  TasksController.getAll
);
router.get(
  "/:id",
  ValidationCheck.taskId(),
  ValidationResult.handle(),
  TasksController.get
);
router.post("/", 
  TasksController.create
);
router.patch(
  "/:id",
  ValidationCheck.taskId(),
  ValidationResult.handle(),
  TasksController.update
);
router.delete(
  "/:id",
  ValidationCheck.taskId(),
  ValidationResult.handle(),
  TasksController.delete
);

export default router;
