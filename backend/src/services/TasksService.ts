import TasksRepository from "../repositories/mysql/TasksRepository.js";
import { Task } from "../types/index.js";

class TasksService {
  async findAllTasks(): Promise<Task[]> {
    const tasks = await TasksRepository.getAll();
    return tasks;
  }
}

export default new TasksService();
