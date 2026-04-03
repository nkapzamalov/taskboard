import type { Request, Response } from "express";
import TasksService from "../services/TasksService.js";
import ResponseService from "../services/ResponseService.js";

class TasksController {
  async getAll(req: Request, res: Response) {
    try {
      const status =
        typeof req.query.status === "string" ? req.query.status : undefined;
      const tasks = await TasksService.findAllTasks(status);
      return ResponseService.ok(res, tasks);
    } catch (err) {
      return ResponseService.internalServerError(
        res,
        "An unexpected error occurred. Please try again later."
      );
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const task = await TasksService.findTaskById(id);
      if (!task) {
        return ResponseService.notFound(res, "Task not found");
      }
      return ResponseService.ok(res, task);
    } catch (err) {
      return ResponseService.internalServerError(
        res,
        "An unexpected error occurred. Please try again later."
      );
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, status, description, assignee, priority } = req.body;

      const task = await TasksService.create(
        title,
        status,
        description,
        assignee,
        priority
      );

      return ResponseService.created(res, task);
    } catch (err) {
      return ResponseService.internalServerError(
        res,
        "An unexpected error occurred. Please try again later."
      );
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await TasksService.updateTask(Number(id), req.body);
      if (!task) {
        return ResponseService.notFound(res, "Task not found");
      }
      return ResponseService.ok(res, task);
    } catch (err) {
      return ResponseService.internalServerError(
        res,
        "An unexpected error occurred. Please try again later."
      );
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await TasksService.deleteTask(Number(id));
      if (!deleted) {
        return ResponseService.notFound(res, "Task not found");
      }
      return ResponseService.noContent(res);
    } catch (err) {
      return ResponseService.internalServerError(
        res,
        "An unexpected error occurred. Please try again later."
      );
    }
  }
}
export default new TasksController();
