 export interface Task {
  id: Number,
  title: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  description: string | null,
  assignee: string | null,
  priority: string
}
