import { Link } from "react-router";
import { useMemo, useState } from "react";
import { TASK_STATUS_LABELS } from "../constants/tasks";
import { groupByStatus } from "../utils/helpers";
import useFetchTasks from "../hooks/useFetchTasks";
import TaskListFilters from "./TaskBoardFilters";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import TaskItem from "./TaskItem";
import type { TaskFilters } from "../types";

export default function TaskBoard() {
  const [status, setStatus] = useState<TaskFilters["status"]>();
  const {
    tasks,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    hasMore,
  } = useFetchTasks({ status });

  const groupedTasks = useMemo(() => groupByStatus(tasks), [tasks]);
  const isEmpty = !isLoading && tasks.length === 0;

  return (
    <>
      <TaskListFilters
        onChange={(filters) => setStatus(filters.status)}
      />
      
      {error && <ErrorMessage message={error} />}

      <div className="flex flex-col gap-6 md:flex-row">
        {isLoading ? (
          <Loader className="w-full" />
        ) : isEmpty ? (
          <div className="w-full rounded-lg border border-gray-700/80 bg-gray-900 px-8 py-16 text-center">
            <p className="text-lg font-medium text-white">
              {status
                ? "No tasks match this filter"
                : "No tasks yet"}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {status
                ? "Try another status or clear the filter to see all tasks."
                : "Create a task to get started."}
            </p>
            {!status && (
              <Link
                to="/tasks/create"
                className="mt-6 inline-block rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white border border-gray-600 hover:bg-gray-600 transition"
              >
                Create task
              </Link>
            )}
          </div>
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
                  <TaskItem key={task.id} task={task} />
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {!isLoading && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={isLoadingMore}
            className="rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white border border-gray-600 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}