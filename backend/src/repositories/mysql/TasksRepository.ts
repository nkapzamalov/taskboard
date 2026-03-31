import connection from "../../config/db.js";
import { Task } from "../../types/index.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

class TasksRepository {
  async getAll(): Promise<Task[]> {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM tasks`
      );
      return rows as Task[];
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }

  async getById(id: number): Promise<Task> {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM tasks WHERE id = ?`,
        [id]
      );
      return rows[0] as Task;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }

  async create(
    title: string,
    status: string,
    description: string,
    assignee: string,
    priority: string
  ): Promise<Task> {
    try {
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO tasks (title, status, description, assignee, priority, createdAt, updatedAt) 
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [title, status, description, assignee, priority]
      );
      
      return await this.getById(result.insertId);
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }
}

export default new TasksRepository();