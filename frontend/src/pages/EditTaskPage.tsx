import TaskForm from "../components/TaskForm";
import { useParams } from "react-router";
import useFetchTasksById from "../hooks/useFetchTasksById";

function EditTaskPage (){
  const params = useParams<{id: string}>();
  const {isLoading, error, task} = useFetchTasksById(params.id);

  if(isLoading){
    return <div className="text-white">Loading...</div>
  }

  if(error){
    return <div className="text-red-500">No such task</div>
  }

  return (
    <>
      {task && <TaskForm task={task}/>}
    </>
  )
}

export default EditTaskPage;
