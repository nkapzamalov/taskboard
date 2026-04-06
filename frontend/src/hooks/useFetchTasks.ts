import { useCallback, useEffect, useState } from "react";
import type { ApiResponse, FetchTasksProps, PaginatedTasksResult, Task } from "../types";
import { buildTasksUrl } from "../utils/helpers";

function useFetchTasks(options?: FetchTasksProps) {
  const status = options?.status;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] =
    useState<PaginatedTasksResult["pagination"] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchFirstPage() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(buildTasksUrl(status, 0));
        const json = (await response.json()) as ApiResponse<PaginatedTasksResult>;
        if (!response.ok) {
          if (!cancelled) setError(json.error ?? "Request failed");
          return;
        }
        if (json.data && !cancelled) {
          setTasks(json.data.tasks);
          setPagination(json.data.pagination);
        }
      } catch {
        if (!cancelled) setError("Something went wrong!");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchFirstPage();
    return () => {
      cancelled = true;
    };
  }, [status]);

  const loadMore = useCallback(async () => {
    if (!pagination?.hasMore || pagination.nextOffset == null) return;
    try {
      setIsLoadingMore(true);
      setError(null);
      const response = await fetch(
        buildTasksUrl(status, pagination.nextOffset)
      );
      const json = (await response.json()) as ApiResponse<PaginatedTasksResult>;
      if (!response.ok) {
        setError(json.error ?? "Request failed");
        return;
      }
      if (json.data) {
        setTasks((prev) => [...prev, ...json.data.tasks]);
        setPagination(json.data.pagination);
      }
    } catch {
      setError("Something went wrong!");
    } finally {
      setIsLoadingMore(false);
    }
  }, [pagination, status]);

  return {
    tasks,
    pagination,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    hasMore: pagination?.hasMore ?? false,
  };
}

export default useFetchTasks;
