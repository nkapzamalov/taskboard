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

  async update(
    id: number,
    updates: Partial<Task>
  ): Promise<Task> {
    try {
      const fields: string[] = [];
      const values: (string | number | null)[] = [];

      if (updates.title !== undefined) {
        fields.push("title = ?");
        values.push(updates.title);
      }
      if (updates.status !== undefined) {
        fields.push("status = ?");
        values.push(updates.status);
      }
      if (updates.description !== undefined) {
        fields.push("description = ?");
        values.push(updates.description);
      }
      if (updates.assignee !== undefined) {
        fields.push("assignee = ?");
        values.push(updates.assignee);
      }
      if (updates.priority !== undefined) {
        fields.push("priority = ?");
        values.push(updates.priority);
      }

      if (fields.length === 0) {
        return this.getById(id);
      }

      values.push(id);

      await connection.query(
        `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
        values
      );

      return await this.getById(id);
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await connection.query(`DELETE FROM tasks WHERE id = ?`, [id]);
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }
}

export default new TasksRepository();