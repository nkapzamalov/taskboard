import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TASKS_API_BASE } from "../constants/api";
import {
  DEFAULT_TASK_PRIORITY,
  DEFAULT_TASK_STATUS,
  TASK_PRIORITY_ORDER,
  TASK_STATUS_ORDER,
} from "../constants/tasks";
import type { Task } from "../types";
import type { ApiResponse } from "../types";

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").min(3, "Min 3 characters"),
  status: z.enum(TASK_STATUS_ORDER),
  description: z.string(),
  assignee: z.string(),
  priority: z.enum(TASK_PRIORITY_ORDER),
});

type TaskFormFields = z.infer<typeof taskFormSchema>;

type TaskFormProps = {
  task?: Task;
};

function TaskForm({ task }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful},
  } = useForm<TaskFormFields>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: task
      ? {
          title: task.title,
          status: task.status,
          description: task.description,
          assignee: task.assignee,
          priority: task.priority,
        }
      : {
          status: DEFAULT_TASK_STATUS,
          priority: DEFAULT_TASK_PRIORITY,
        },
  });

  const onSubmit = async (data: TaskFormFields) => {
    if (!task) {
      try {
        const response = await fetch(TASKS_API_BASE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),

        });
        if (!response.ok) {
          const json = (await response.json()) as ApiResponse<null>;
          if(json.error){
            setError("root", {
              message: json.error,
            });
            return;
          }
        }
      } catch {
        setError("root", {
          message: "Something Went wrong",
        });
      }
    } else {
      try {
        const response = await fetch(`${TASKS_API_BASE}/${task.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          const json = (await response.json()) as ApiResponse<null>;
          if(json.error){
            setError("root", {
              message: json.error,
            });
            return;
          }
        }
      } catch {
        setError("root", {
          message: "Something Went wrong",
        });
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {task ? "Edit the task" : "Create a task"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Task title"
            {...register("title")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            {...register("status")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            {...register("priority")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Assignee</label>
          <input
            type="text"
            placeholder="Assignee name"
            {...register("assignee")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.assignee && (
            <p className="text-red-600 text-sm mt-1">{errors.assignee.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description (Optional)
          </label>
          <textarea
            placeholder="Task description"
            rows={3}
            {...register("description")}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {errors.root && (
          <p className="text-red-600 text-sm">{errors.root.message}</p>
        )}
      </form>
      {isSubmitSuccessful && (
        <div className="text-green-500">
          {task ? "Task updated" : "Task created"}
        </div>
      )}
    </div>
  );
}

export default TaskForm;