import type { FetchTasksProps, Task } from "../types";
import { TASKS_API_BASE } from "../constants/api";
import { TASKS_PAGE_LIMIT } from "../constants/tasksPagination";
import { TASK_STATUS_ORDER } from "../constants/tasks";

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

export function buildTasksUrl(status: FetchTasksProps["status"], offset: number) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  params.set("limit", String(TASKS_PAGE_LIMIT));
  params.set("offset", String(offset));
  return `${TASKS_API_BASE}?${params.toString()}`;
}
