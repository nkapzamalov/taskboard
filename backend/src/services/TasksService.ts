import TasksRepository from "../repositories/mysql/TasksRepository.js";
import { Task } from "../types/index.js";

class TasksService {
  async findAllTasks(): Promise<Task[]> {
    const tasks = await TasksRepository.getAll();
    return tasks;
  }

  async findTaskById(id: number): Promise<Task> {
    return TasksRepository.getById(id);
  }

  async create(    
    title: string,
    status: string,
    description: string,
    assignee: string,
    priority: string
  ): Promise<Task>{
    return TasksRepository.create(
      title,
      status,
      description,
      assignee,
      priority
    )
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    return TasksRepository.update(id, updates);
  }

  async deleteTask(id: number): Promise<void> {
    return TasksRepository.delete(id);
  }
}

export default new TasksService();
