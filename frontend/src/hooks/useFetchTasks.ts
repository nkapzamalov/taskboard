import { useEffect, useState } from "react";
import type { ApiResponse, Task } from "../types";

function useFetchTasks(){
  const url = "http://localhost:3000/tasks";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(()=>{
    async function fetchTasks() {
      try {
        setIsLoading(true)
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
  },[])

  return {
    tasks,
    isLoading,
    error
  }
}

export default useFetchTasks;
