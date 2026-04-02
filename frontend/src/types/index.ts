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
