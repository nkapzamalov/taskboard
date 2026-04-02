import TaskForm from "../components/TaskForm";
import DeleteTask from "../components/DeleteTask";
import { useParams } from "react-router";
import useFetchTasksById from "../hooks/useFetchTasksById";

function EditTaskPage (){
  const params = useParams<{id: string}>();
  const {isLoading, error, task} = useFetchTasksById(params.id);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {isLoading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-500">No such task</div>}
      {task && <TaskForm task={task}/>}
      {params.id && task && <DeleteTask id={params.id} />}
    </div>
  )
}

export default EditTaskPage;
