import { useEffect, useState } from "react";
import type { Task } from "../types";

function useTasks(){
  const url = "http://localhost:3000/tasks";
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(()=>{
    async function fetchTasks() {
      try {
        setIsLoading(true)
        const response = await fetch(url);
        const tasks = await response.json() as Task[];
        setTasks(tasks);
      } catch (error: any) {
        setError(error);
      } finally{
        setIsLoading(false)
      }
    }
    fetchTasks();
  },[])

  return {
    tasks,
    isLoading,
    error
  }
}

export default useTasks;