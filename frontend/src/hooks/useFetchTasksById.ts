import { useEffect, useState } from "react";
import { TASKS_API_BASE } from "../constants/api";
import type { ApiResponse, Task } from "../types";

function useFetchTasksById(id: string | undefined) {
  const url = `${TASKS_API_BASE}/${id}`;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState<Task>();

  useEffect(()=>{
    async function fetchTasks() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url);
        const json = (await response.json()) as ApiResponse<Task>;
        if (!response.ok) {
          setError(json.error);
          return;
        }
        if(json.data){
           setTask(json.data);
        }
      } catch {
        setError("Something went wrong!");
      } finally{
        setIsLoading(false)
      }
    }
    fetchTasks();
  },[url])

  return {
    task,
    isLoading,
    error
  }
}

export default useFetchTasksById;
