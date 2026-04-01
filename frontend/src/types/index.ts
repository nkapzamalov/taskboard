 export interface Task {
  id: number,
  title: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  description: string | null,
  assignee: string | null,
  priority: string
}
