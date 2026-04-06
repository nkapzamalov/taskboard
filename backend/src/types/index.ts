export interface Task {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  assignee: string | null;
  priority: string;
}

export interface TaskPagination {
  limit: number;
  offset: number;
  total: number;
  nextOffset: number | null;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface PaginatedTasksResult {
  tasks: Task[];
  pagination: TaskPagination;
}
