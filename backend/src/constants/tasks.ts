export const TASK_STATUSES = ["todo", "in-progress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export const DESCRIPTION_MAX_LEN = 65535;

export const DEFAULT_TASK_STATUS: (typeof TASK_STATUSES)[number] = "todo";
export const DEFAULT_TASK_PRIORITY: (typeof TASK_PRIORITIES)[number] = "medium";
