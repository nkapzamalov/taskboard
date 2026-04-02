import type { Request, Response } from "express";
import TasksService from "../services/TasksService.js";
import ResponseService from "../services/ResponseService.js";

class TasksController {
  async getAll(_req: Request, res: Response) {
    const tasks = await TasksService.findAllTasks();
    return ResponseService.ok(res, tasks);
  }

  async get(req: Request, res: Response) {
    const id = Number(req.params.id)
    const task = await TasksService.findTaskById(id);
    return ResponseService.ok(res, task);
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

    return ResponseService.created(res, task)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const task = await TasksService.updateTask(Number(id), req.body);
    return ResponseService.ok(res, task);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await TasksService.deleteTask(Number(id));
    return ResponseService.noContent(res)
  }
}

export default new TasksController();