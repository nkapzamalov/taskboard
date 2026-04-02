import { useParams } from "react-router";
import useFetchTasksById from "../hooks/useFetchTasksById";

function TaskPage(){
  const params = useParams<{id: string}>();
  const {isLoading, error, task} = useFetchTasksById(params.id);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {isLoading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-500">No such task</div>}
      <h1 className="text-3xl font-bold mb-8">Task </h1>
      <div>{task && task.title}</div>
      <div>{task && task.description}</div>
    </div>
  )
}

export default TaskPage;