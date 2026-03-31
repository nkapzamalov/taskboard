import type { Request, Response } from "express";

import TasksService from "../services/TasksService.js";

class TasksController {
  async getAll(_req: Request, res: Response) {
    const tasks = await TasksService.findAllTasks();
    return res.json(tasks);
  }

  async get(req: Request, res: Response) {
    const task = await TasksService.findTaskById(Number(req.params.id));
    return res.json(task);
  }
}

export default new TasksController();
