import { useNavigate } from "react-router";
import { useState } from "react";
import { TASKS_API_BASE } from "../constants/api";
import type { ApiResponse } from "../types";

type DeleteTaskProps = {
  id: string;
};

function DeleteTask({ id }: DeleteTaskProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      const response = await fetch(`${TASKS_API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const json = (await response.json()) as ApiResponse<null>;
        if(json.error){
          setError(json.error);
          return;
        }
     
      }
      navigate("/");
    } catch {
      setError("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isDeleting}
        className="px-4 py-2 rounded border border-red-500 text-red-400 hover:bg-red-950 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeleting ? "Deleting…" : "Delete task"}
      </button>
      {error && (
        <p className="text-red-500 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default DeleteTask;