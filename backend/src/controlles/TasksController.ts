import type { Request, Response } from "express";

import TasksService from "../services/TasksService.js";

class TasksController {
  async getAll(_req: Request, res: Response) {
    const tasks = await TasksService.findAllTasks();
    return res.json(tasks);
  }
}

export default new TasksController();
