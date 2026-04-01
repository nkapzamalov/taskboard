import { useParams } from "react-router";

function TaskPage(){
  const params = useParams<{id: string}>();
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Task {params.id}</h1>
    </div>
  )
}

export default TaskPage;