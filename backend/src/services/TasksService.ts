import type { RowDataPacket } from "mysql2/promise";
import TasksRepository from "../repositories/mysql/TasksRepository.js";
import { Task } from "../types/index.js";

class TasksService {
  async countTasksByStatus(): Promise<Record<string, number>> {
    const rows: RowDataPacket[] = await TasksRepository.getCountsByStatus();
    const counts: Record<string, number> = {
      todo: 0,
      "in-progress": 0,
      done: 0,
    };
    for (const row of rows) {
      const status = row.status as string;
      if (status in counts) {
        counts[status] = Number(row.cnt);
      }
    }
    return counts;
  }

  async findAllTasks(status?: string): Promise<Task[]> {
    const tasks = await TasksRepository.getAll(status);
    return tasks;
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
      status ?? "todo",
      description ?? null,
      assignee ?? null,
      priority ?? "medium"
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
