import {
  TASKS_PAGE_DEFAULT_LIMIT,
  TASKS_PAGE_MAX_LIMIT,
} from "../../constants/tasksPagination.js";
import connection from "../../config/db.js";
import { Task } from "../../types/index.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

class TasksRepository {
  async getCountsByStatus(): Promise<RowDataPacket[]> {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT status, COUNT(*) AS cnt FROM tasks GROUP BY status`
      );
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }

  async getAll(status?: string, limit?: string, offset?: string) {
    try {
      const limitParsed = Number(limit);
      const offsetParsed = Number(offset);
      const limitNum = Math.min(
        TASKS_PAGE_MAX_LIMIT,
        Math.max(
          1,
          Number.isFinite(limitParsed) && limitParsed > 0
            ? limitParsed
            : TASKS_PAGE_DEFAULT_LIMIT
        )
      );
      const offsetNum = Math.max(
        0,
        Number.isFinite(offsetParsed) && offsetParsed >= 0 ? offsetParsed : 0
      );

      let countSql = `SELECT COUNT(*) as total FROM tasks`;
      const countParams: (string | number)[] = [];

      if (status) {
        countSql += ` WHERE status = ?`;
        countParams.push(status);
      }

      const [countResult] = await connection.query<RowDataPacket[]>(
        countSql,
        countParams
      );
      const total = Number((countResult[0] as { total: number }).total);

      // Keep offset within the last page so LIMIT/OFFSET only targets real rows
      let effectiveOffset = offsetNum;
      if (total === 0) {
        effectiveOffset = 0;
      } else {
        const maxOffset =
          Math.floor((total - 1) / limitNum) * limitNum;
        effectiveOffset = Math.min(offsetNum, maxOffset);
      }

      let dataSql = `SELECT * FROM tasks`;
      const dataParams: (string | number)[] = [];

      if (status) {
        dataSql += ` WHERE status = ?`;
        dataParams.push(status);
      }

      dataSql += ` LIMIT ? OFFSET ?`;
      dataParams.push(limitNum, effectiveOffset);

      const [rows] = await connection.query<RowDataPacket[]>(dataSql, dataParams);

      const nextOffset = effectiveOffset + limitNum;
      const hasMore = nextOffset < total;

      return {
        tasks: rows as Task[],
        pagination: {
          limit: limitNum,
          offset: effectiveOffset,
          total,
          nextOffset: hasMore ? nextOffset : null,
          hasMore: hasMore,
          currentPage: Math.floor(effectiveOffset / limitNum) + 1,
          totalPages: Math.ceil(total / limitNum) || 1,
        },
      };
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }

  async getById(id: number): Promise<Task | undefined> {
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM tasks WHERE id = ?`,
        [id]
      );
      return rows[0] as Task | undefined;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }

  async create(
    title: string,
    status: string,
    description: string | null,
    assignee: string | null,
    priority: string
  ): Promise<Task> {
    try {
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO tasks (title, status, description, assignee, priority, createdAt, updatedAt) 
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [title, status, description, assignee, priority]
      );

      const created = await this.getById(result.insertId);
      if (!created) {
        throw new Error("Failed to load task after insert");
      }
      return created;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }

  async update(
    id: number,
    updates: Partial<Task>
  ): Promise<Task | undefined> {
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

  async delete(id: number): Promise<boolean> {
    try {
      const [result] = await connection.query<ResultSetHeader>(
        `DELETE FROM tasks WHERE id = ?`,
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }
}

export default new TasksRepository();