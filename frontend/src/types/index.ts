export interface Task {
  id: number,
  title: string,
  status: "todo" | "in-progress" | "done",
  createdAt: string,
  updatedAt: string,
  description: string,
  assignee: string,
  priority: "low" | "medium" | "high";
}

export interface TaskFilters {
  status?: "todo" | "in-progress" | "done",
}

export type TaskStatusCounts = Record<
  NonNullable<TaskFilters["status"]>,
  number
>;

export type ApiSuccessResponse<T> = {
  error: null;
  data: T;
};

export type ApiErrorResponse = {
  error: string | null;
  data: null;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
