import connection from "../../config/db.js";
import { Task } from "../../types/index.js";
import { RowDataPacket } from "mysql2/promise";

class TasksRepository {
  async getAll(): Promise<Task[]> {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM tasks`
      );
      return rows as Task[];
    } catch (error) {
      throw error;
    }
  }
}

export default new TasksRepository();