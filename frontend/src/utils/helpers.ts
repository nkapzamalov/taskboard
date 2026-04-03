import type { Task } from "../types";

export const TASK_STATUS_ORDER = ["todo", "in-progress", "done"] as const;

export function groupByStatus(tasks: Task[]) {
  const groupedTasks: Record<string, Task[]> = {};

  TASK_STATUS_ORDER.forEach((status) => {
    groupedTasks[status] = [];
  });

  tasks.forEach((task) => {
    const status = task.status.toLowerCase();
    if (groupedTasks[status]) {
      groupedTasks[status].push(task);
    }
  });

  return TASK_STATUS_ORDER.map((status) => ({
    status,
    tasks: groupedTasks[status],
  }));
}