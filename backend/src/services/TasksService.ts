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
}

export default new TasksService();
