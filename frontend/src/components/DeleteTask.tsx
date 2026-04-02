import { useNavigate } from "react-router";
import { useState } from "react";

type DeleteTaskProps = {
  id: string;
};

function DeleteTask({ id }: DeleteTaskProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="px-4 py-2 rounded border border-red-500 text-red-400 hover:bg-red-950 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Deleting…" : "Delete task"}
      </button>
      {error && (
        <p className="text-red-500 text-sm" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default DeleteTask;