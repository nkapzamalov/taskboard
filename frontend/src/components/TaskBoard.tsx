import { Link } from "react-router";
import { useMemo, useState } from "react";
import { groupByStatus } from "../utils/helpers";
import useFetchTasks from "../hooks/useFetchTasks";
import useFetchTaskCounts from "../hooks/useFetchTaskCounts";
import TaskListFilters from "./TaskBoardFilters";
import type { TaskFilters } from "../types";

export default function TaskBoard() {
  const [status, setStatus] = useState<TaskFilters["status"]>();
  const { tasks, isLoading, error } = useFetchTasks({ status });
  const { counts: statusCounts } = useFetchTaskCounts();

  const groupedTasks = useMemo(() => groupByStatus(tasks), [tasks]);

  return (
    <>
      <TaskListFilters
        counts={statusCounts}
        onChange={(filters) => setStatus(filters.status)}
      />
      
      {error && (
        <div className="text-red-500 p-4 bg-red-900/20 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        {isLoading ? (
          <div className="text-white w-full">Loading...</div>
        ) : (
          groupedTasks.map(({ status, tasks: statusTasks }) => (
            <div
              key={status}
              className="min-w-0 flex-1 rounded-lg bg-gray-900 p-6"
            >
              <ul className="space-y-3">
                {statusTasks.map((task) => (
                  <Link key={task.id} to={`tasks/${task.id}`}>
                    <li 
                      className="bg-gray-800 p-3 rounded hover:bg-gray-700 transition cursor-pointer"
                    >
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                      )}
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>Priority: {task.priority}</span>
                        {task.assignee && <span>Assigned to: {task.assignee}</span>}
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
}