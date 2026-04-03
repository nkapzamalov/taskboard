import { useEffect, useState } from "react";
import type { TaskFilters } from "../types";

type TaskBoardListFiltersProps = {
    onChange: (filters: TaskFilters) => void;
}

function TaskBoardListFilters({ onChange }: TaskBoardListFiltersProps){
  const [status, setStatus] = useState<TaskFilters['status']>();

  useEffect(() => {
    onChange({ status })
  }, [status, onChange])

  const handleStatusChange = (newStatus: TaskFilters['status']) => {
      setStatus(status === newStatus ? undefined : newStatus);
  };

  return (
    <div className="flex gap-4 mb-6">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={status === "todo"}
          onChange={() => handleStatusChange("todo")}
          className="cursor-pointer"
        />
        <span>To Do</span>
      </label>  

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={status === "in-progress"}
          onChange={() => handleStatusChange("in-progress")}
          className="cursor-pointer"
        />
        <span>In Progress</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={status === "done"}
          onChange={() => handleStatusChange("done")}
          className="cursor-pointer"
        />
        <span>Done</span>
      </label>
    </div>
  )
}

export default TaskBoardListFilters;