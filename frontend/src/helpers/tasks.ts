import type { Task } from "../types";


export function groupByStatus(tasks: Task[]) {
  const STATUS_ORDER = ["todo", "in-progress", "done"];

  const groupedTasks: Record<string, Task[]> = {};

  STATUS_ORDER.forEach(status => {
    groupedTasks[status] = [];
  });

  tasks.forEach(task => {
    const status = task.status.toLowerCase();
    if (groupedTasks[status]) {
      groupedTasks[status].push(task);
    }
  });

  return STATUS_ORDER.map(status => ({
    status,
    tasks: groupedTasks[status]
  }));
}