import { useEffect, useState } from "react";
import useFetchTaskCounts from "../hooks/useFetchTaskCounts";
import type { TaskFilters } from "../types";
import ErrorMessage from "./ErrorMessage";

type TaskBoardListFiltersProps = {
  onChange: (filters: TaskFilters) => void;
};

function TaskBoardListFilters({ onChange }: TaskBoardListFiltersProps) {
  const { counts, isLoading: countsLoading, error: countsError } =
    useFetchTaskCounts();
  const [status, setStatus] = useState<TaskFilters['status']>();

  useEffect(() => {
    onChange({ status })
  }, [status, onChange])

  const handleStatusChange = (newStatus: TaskFilters['status']) => {
      setStatus(status === newStatus ? undefined : newStatus);
  };

  const countLabel = (value: number) =>
    countsLoading ? "…" : countsError ? "—" : String(value);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={status === "todo"}
            onChange={() => handleStatusChange("todo")}
            className="cursor-pointer"
          />
          <span>To Do ({countLabel(counts.todo)})</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={status === "in-progress"}
            onChange={() => handleStatusChange("in-progress")}
            className="cursor-pointer"
          />
          <span>In Progress ({countLabel(counts["in-progress"])})</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={status === "done"}
            onChange={() => handleStatusChange("done")}
            className="cursor-pointer"
          />
          <span>Done ({countLabel(counts.done)})</span>
        </label>
      </div>
      {countsError && (
        <ErrorMessage message={countsError} variant="compact" />
      )}
    </div>
  )
}

export default TaskBoardListFilters;