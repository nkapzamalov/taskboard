import { param, body, query } from "express-validator";

class ValidationCheck {
  taskId() {
    return param("id")
      .isInt({ min: 1 })
      .withMessage("Invalid task ID format");
  }

  taskTitle() {
    return body("title")
      .isString()
      .withMessage("Title is required")
      .isLength({ min: 1, max: 255 })
      .withMessage("Title must be between 1 and 255 characters");
  }

  taskStatusQuery() {
    return query("status")
      .optional()
      .isIn(["todo", "in-progress", "done"])
      .withMessage("Invalid status");
  }
}

export default new ValidationCheck();
