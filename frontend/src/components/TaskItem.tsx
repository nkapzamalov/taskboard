import { memo } from "react";
import { Link } from "react-router";
import type { Task } from "../types";

function TaskItem({ task }: { task: Task }) {
  return (
    <li>
      <Link
        to={`tasks/${task.id}`}
        className="block bg-gray-800 p-3 rounded-lg border border-gray-700/80 shadow-sm hover:bg-gray-700 hover:border-gray-600 transition cursor-pointer"
      >
        <p className="font-medium">{task.title}</p>
        {task.description && (
          <p className="text-sm text-gray-400 mt-1">{task.description}</p>
        )}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>Priority: {task.priority}</span>
          {task.assignee && <span>Assigned to: {task.assignee}</span>}
        </div>
      </Link>
    </li>
  );
}

export default memo(TaskItem);
