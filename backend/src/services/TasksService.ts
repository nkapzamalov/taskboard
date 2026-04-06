import type { RowDataPacket } from "mysql2/promise";
import {
  DEFAULT_TASK_PRIORITY,
  DEFAULT_TASK_STATUS,
  TASK_STATUSES,
} from "../constants/tasks.js";
import TasksRepository from "../repositories/mysql/TasksRepository.js";
import type { PaginatedTasksResult, Task } from "../types/index.js";

class TasksService {
  async countTasksByStatus(): Promise<Record<string, number>> {
    const rows: RowDataPacket[] = await TasksRepository.getCountsByStatus();
    const counts: Record<string, number> = Object.fromEntries(
      TASK_STATUSES.map((s) => [s, 0])
    );
    for (const row of rows) {
      const status = row.status as string;
      if (status in counts) {
        counts[status] = Number(row.cnt);
      }
    }
    return counts;
  }

  async findAllTasks(
    status?: string,
    limit?: string,
    offset?: string
  ): Promise<PaginatedTasksResult> {
    return TasksRepository.getAll(status, limit, offset);
  }

  async findTaskById(id: number): Promise<Task | undefined> {
    return TasksRepository.getById(id);
  }

  async create(
    title: string,
    status: string | undefined,
    description: string | undefined | null,
    assignee: string | undefined | null,
    priority: string | undefined
  ): Promise<Task> {
    return TasksRepository.create(
      title,
      status ?? DEFAULT_TASK_STATUS,
      description ?? null,
      assignee ?? null,
      priority ?? DEFAULT_TASK_PRIORITY
    );
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task | undefined> {
    return TasksRepository.update(id, updates);
  }

  async deleteTask(id: number): Promise<boolean> {
    return TasksRepository.delete(id);
  }
}

export default new TasksService();
