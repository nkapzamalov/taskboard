import { Link, useParams } from "react-router";
import DeleteTask from "../components/DeleteTask";
import useFetchTasksById from "../hooks/useFetchTasksById";

function TaskPage(){
  const params = useParams<{id: string}>();
  const {isLoading, error, task} = useFetchTasksById(params.id);

  return (
    <>
      {isLoading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-500">No such task</div>}
      <h1 className="text-3xl font-bold mb-8">Task </h1>
      <div>{task && task.title}</div>
      <div>{task && task.description}</div>
      <div className="mt-6 flex flex-wrap gap-4 items-center">
        <Link
          to={`/tasks/edit/${params.id}`}
          className="text-blue-400 hover:underline"
        >
          Edit the TASK
        </Link>
      </div>
      {params.id && task && <DeleteTask id={params.id} />}
    </>
  )
}

export default TaskPage;