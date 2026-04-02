import { Link } from "react-router"
import TaskBoard from "../components/TaskBoard"

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex gap-4 text-3xl font-bold mb-8">
        <h1 className="">Tasks</h1>
        <Link to={"tasks/create"}>Create a task</Link>
      </div>
      <TaskBoard />
    </div>
  )
}

export default HomePage