import { Link } from "react-router";
import { useMemo, useState } from "react";
import { groupByStatus, TASK_STATUS_LABELS } from "../utils/helpers";
import useFetchTasks from "../hooks/useFetchTasks";
import TaskListFilters from "./TaskBoardFilters";
import type { TaskFilters } from "../types";

export default function TaskBoard() {
  const [status, setStatus] = useState<TaskFilters["status"]>();
  const { tasks, isLoading, error } = useFetchTasks({ status });

  const groupedTasks = useMemo(() => groupByStatus(tasks), [tasks]);
  
  return (
    <>
      <TaskListFilters
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
              <h2 className="text-lg font-semibold text-white mb-4 pb-3 border-b border-gray-700">
                {TASK_STATUS_LABELS[status]}
              </h2>
              <ul className="flex flex-col gap-5 list-none p-0 m-0">
                {statusTasks.map((task) => (
                  <li key={task.id}>
                    <Link
                      to={`tasks/${task.id}`}
                      className="block bg-gray-800 p-3 rounded-lg border border-gray-700/80 shadow-sm hover:bg-gray-700 hover:border-gray-600 transition cursor-pointer"
                    >
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                      )}
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>Priority: {task.priority}</span>
                        {task.assignee && <span>Assigned to: {task.assignee}</span>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
}