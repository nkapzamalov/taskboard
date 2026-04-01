import useTasks from "./hooks/useTasks"

function App() {
  const {tasks, isLoading, error} = useTasks();

  if(isLoading){
    return <div className="text-black">Loading...</div>
  }

  if(error){
    return <div className="text-black">Something went wrong. Please try again later</div>
    
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}>{task.title}</li>
        })}
      </ul>
    </div>
  )
}

export default App
