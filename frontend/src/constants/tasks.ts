export const TASK_STATUS_ORDER = ["todo", "in-progress", "done"] as const;

export const TASK_STATUS_LABELS: Record<
  (typeof TASK_STATUS_ORDER)[number],
  string
> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export const TASK_PRIORITY_ORDER = ["low", "medium", "high"] as const;

export const DEFAULT_TASK_STATUS: (typeof TASK_STATUS_ORDER)[number] = "todo";
export const DEFAULT_TASK_PRIORITY: (typeof TASK_PRIORITY_ORDER)[number] =
  "medium";
