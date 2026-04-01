import { useEffect, useState } from "react";
import type { Task } from "../types";

function useFetchTasksById(id: string | undefined) {
  const url = `http://localhost:3000/tasks/${id}`;
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState<Task>();

  useEffect(()=>{
    async function fetchTasks() {
      try {
        setIsLoading(true)
        const response = await fetch(url);
        const task = await response.json() as Task;
        setTask(task);
      } catch (error: any) {
        setError(error);
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