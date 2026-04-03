import { Router } from "express";
import TasksController from "../controllers/TasksController.js";
import ValidationCheck from "../middleware/ValidationCheck.js";
import ValidationResult from "../middleware/ValidationResult.js";

const router = Router();

router.get(
  "/",
  ValidationCheck.taskStatusQuery(),
  ValidationResult.handle(),
  TasksController.getAll
);
router.get(
  "/:id",
  ValidationCheck.taskId(),
  ValidationResult.handle(),
  TasksController.get
);
router.post(
  "/",
  ...ValidationCheck.taskCreateBody(),
  ValidationResult.handle(),
  TasksController.create
);
router.patch(
  "/:id",
  ValidationCheck.taskId(),
  ...ValidationCheck.taskUpdateBody(),
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
