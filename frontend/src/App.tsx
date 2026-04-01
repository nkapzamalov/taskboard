import TaskBoard from "./components/TaskBoard"

function App() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Tasks</h1>
      <TaskBoard />
    </div>
  )
}

export default App
