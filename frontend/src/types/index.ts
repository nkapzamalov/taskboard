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

/** Mirrors `backend/src/services/ResponseService.ts` JSON bodies */
export type ApiSuccessResponse<T> = {
  error: null;
  data: T;
};

export type ApiErrorResponse = {
  error: string | null;
  data: null;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
