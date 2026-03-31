import connection from "../../config/db.js";
import { Task } from "../../types/index.js";
import { RowDataPacket } from "mysql2/promise";

class TasksRepository {
  async getAll(): Promise<Task[]> {
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM tasks`
    );
    return rows as Task[];
  }

  async getById(id: number): Promise<Task> {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );
    return rows[0] as Task;
  }
}

export default new TasksRepository();