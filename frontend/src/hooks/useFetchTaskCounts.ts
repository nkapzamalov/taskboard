import { useEffect, useState } from "react";
import { TASKS_COUNTS_URL } from "../constants/api";
import type { ApiResponse, TaskStatusCounts } from "../types";

function useFetchTaskCounts() {
  const [counts, setCounts] = useState<TaskStatusCounts>({
    todo: 0,
    "in-progress": 0,
    done: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCounts() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(TASKS_COUNTS_URL);
        const json = (await response.json()) as ApiResponse<TaskStatusCounts>;
        if (!response.ok) {
          setError(json.error);
          return;
        }
        if (json.data) {
          setCounts(json.data);
        }
      } catch {
        setError("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCounts();
  }, []);

  return { counts, isLoading, error };
}

export default useFetchTaskCounts;
