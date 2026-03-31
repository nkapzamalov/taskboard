import type { Request, Response } from "express";

import TasksService from "../services/TasksService.js";

class TasksController {
  async getAll(_req: Request, res: Response) {
    try {
      const tasks = await TasksService.findAllTasks();
      return res.json(tasks);
    } catch (error) {
      console.error("getAll tasks:", error);
      return res.status(500).json({ error: "Failed to load tasks" });
    }
  }
}

export default new TasksController();
