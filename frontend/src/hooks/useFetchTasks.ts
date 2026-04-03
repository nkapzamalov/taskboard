import { useEffect, useState } from "react";
import type { ApiResponse, Task } from "../types";

interface FetchTasksProps{
  status?: "todo" | "in-progress" | "done"
}

function useFetchTasks(options?: FetchTasksProps){
  const url = options?.status ? `http://localhost:3000/tasks?status=${options.status}` : "http://localhost:3000/tasks";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(()=>{
    async function fetchTasks() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url);
        const json = (await response.json()) as ApiResponse<Task[]>;
        if (!response.ok) {
          setError(json.error);
          return;
        }
        if(json.data){
           setTasks(json.data);
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
    tasks,
    isLoading,
    error
  }
}

export default useFetchTasks;
