import { param, body, query } from "express-validator";

const TASK_STATUSES = ["todo", "in-progress", "done"] as const;
const TASK_PRIORITIES = ["low", "medium", "high"] as const;
const DESCRIPTION_MAX_LEN = 65535;

class ValidationCheck {
  taskId() {
    return param("id")
      .isInt({ min: 1 })
      .withMessage("Invalid task ID format");
  }

  taskStatusQuery() {
    return query("status")
      .optional()
      .isIn(TASK_STATUSES)
      .withMessage("Invalid status");
  }

  taskCreateBody() {
    return [
      body("title")
        .isString()
        .withMessage("Title must be a string")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 255 })
        .withMessage("Title must be at most 255 characters"),
      body("status")
        .optional()
        .isIn(TASK_STATUSES)
        .withMessage("Invalid status"),
      body("description")
        .optional({ values: "null" })
        .isString()
        .withMessage("Description must be a string")
        .isLength({ max: DESCRIPTION_MAX_LEN })
        .withMessage(`Description must be at most ${DESCRIPTION_MAX_LEN} characters`),
      body("assignee")
        .optional({ values: "null" })
        .isString()
        .withMessage("Assignee must be a string")
        .isLength({ max: 255 })
        .withMessage("Assignee must be at most 255 characters"),
      body("priority")
        .optional()
        .isIn(TASK_PRIORITIES)
        .withMessage("Priority must be low, medium, or high"),
    ];
  }

  taskUpdateBody() {
    return [
      body("title")
        .optional()
        .isString()
        .withMessage("Title must be a string")
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .isLength({ max: 255 })
        .withMessage("Title must be at most 255 characters"),
      body("status")
        .optional()
        .isIn(TASK_STATUSES)
        .withMessage("Invalid status"),
      body("description")
        .optional({ values: "null" })
        .custom((value) => value === null || typeof value === "string")
        .withMessage("Description must be a string or null")
        .custom((value) => {
          if (value === null || typeof value !== "string") return true;
          return value.length <= DESCRIPTION_MAX_LEN;
        })
        .withMessage(`Description must be at most ${DESCRIPTION_MAX_LEN} characters`),
      body("assignee")
        .optional({ values: "null" })
        .custom((value) => value === null || typeof value === "string")
        .withMessage("Assignee must be a string or null")
        .custom((value) => {
          if (value === null || typeof value !== "string") return true;
          return value.length <= 255;
        })
        .withMessage("Assignee must be at most 255 characters"),
      body("priority")
        .optional()
        .isIn(TASK_PRIORITIES)
        .withMessage("Priority must be low, medium, or high"),
    ];
  }
}

export default new ValidationCheck();
