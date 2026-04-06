import TaskForm from "../components/TaskForm";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useParams } from "react-router";
import useFetchTasksById from "../hooks/useFetchTasksById";

function EditTaskPage (){
  const params = useParams<{id: string}>();
  const {isLoading, error, task} = useFetchTasksById(params.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} variant="plain" />;
  }

  return (
    <>
      {task && <TaskForm task={task}/>}
    </>
  )
}

export default EditTaskPage;
