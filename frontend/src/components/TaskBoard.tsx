import { Link } from "react-router";
import { groupByStatus } from "../helpers/tasks";
import useTasks from "../hooks/useTasks";

export default function TaskBoard() {
  const { tasks, isLoading, error } = useTasks();
  
  if (isLoading) {
    return <div className="text-black">Loading...</div>;
  }

  if (error) {
    return <div className="text-black">Something went wrong. Please try again later</div>;
  }

  const groupedTasks = groupByStatus(tasks);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {groupedTasks.map(({ status, tasks: statusTasks }) => (
        <div
          key={status}
          className="min-w-0 flex-1 rounded-lg bg-gray-900 p-6"
        >
          <h2 className="text-xl font-semibold mb-4 capitalize">{status}</h2>
          <ul className="space-y-3">
            {statusTasks.map((task) => (
              <Link key={task.id} to={`tasks/${task.id}`}>
                <li 
                  className="bg-gray-800 p-3 rounded hover:bg-gray-700 transition cursor-pointer"
                >
                  <p className="font-medium">{task.title}</p>
                  {task.description && (
                    <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                  )}
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Priority: {task.priority}</span>
                    {task.assignee && <span>Assigned to: {task.assignee}</span>}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
