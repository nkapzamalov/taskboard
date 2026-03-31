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

  async create(req: Request, res: Response) {
    const { title, status, description, assignee, priority } = req.body;

    const task = await TasksService.create(
      title,
      status,
      description,
      assignee,
      priority
    );

    return res.status(201).json(task);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const task = await TasksService.updateTask(Number(id), req.body);
    return res.status(200).json(task);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await TasksService.deleteTask(Number(id));
    return res.status(204).send();
  }
}

export default new TasksController();