import TasksRepository from "../repositories/mysql/TasksRepository.js";

class TasksService {
  async findAllTasks() {
    const tasks = await TasksRepository.getAll();
    return tasks;
  }
}

export default new TasksService();
