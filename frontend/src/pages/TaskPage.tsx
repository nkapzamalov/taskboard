import { Link, useParams } from "react-router";
import DeleteTask from "../components/DeleteTask";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import useFetchTasksById from "../hooks/useFetchTasksById";

function TaskPage() {
  const params = useParams<{ id: string }>();
  const { isLoading, error, task } = useFetchTasksById(params.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} variant="plain" />;
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/"
        className="text-sm text-gray-400 hover:text-white transition w-fit"
      >
        ← Back to board
      </Link>

      <div className="rounded-lg bg-gray-900 p-6">
        {task && (
          <>
            <p className="text-sm text-gray-500 capitalize mb-2">{task.status}</p>
            <h1 className="text-2xl font-semibold">{task.title}</h1>
            {task.description ? (
              <p className="text-gray-400 mt-3 leading-relaxed">
                {task.description}
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-3 italic">No description</p>
            )}
            <div className="flex flex-wrap justify-between items-center gap-2 mt-4 text-xs text-gray-500">
              <span>Priority: {task.priority}</span>
              {task.assignee ? (
                <span>Assigned to: {task.assignee}</span>
              ) : (
                <span>Unassigned</span>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center border-t border-gray-800 pt-6">
              <Link
                to={`/tasks/edit/${params.id}`}
                className="rounded bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 transition"
              >
                Edit task
              </Link>
              {params.id && <DeleteTask id={params.id} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskPage;
