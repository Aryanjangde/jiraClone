// import React from 'react'
/* eslint-disable @typescript-eslint/no-unused-vars */
const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-blue-100">
    <h3 className="font-semibold text-lg mb-2 text-blue-800">{task.name}</h3>
    <div className="flex justify-between text-sm">
      <span className={`px-2 py-1 rounded ${
        task.priority === 'High' ? 'bg-red-200 text-red-800' :
        task.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
        'bg-green-200 text-green-800'
      }`}>
        {task.priority}
      </span>
      <span className="text-blue-600">{task.deadline}</span>
    </div>
  </div>
)


export default function TaskBoard() {
  const {projectId, state} = useProjectData()

  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    const getAllTasks = async() =>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/projects/${projectId}/tasks`)
        const json = await res.json()
        setTasks(json.data)
      }
      catch(err){
        console.log(err)
      }
    }

    getAllTasks()
  },[projectId, state])
  const todoTasks = tasks.filter((task) => task.status === "TODO") 
  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS")
  const doneTasks = tasks.filter((task) => task.status === "DONE") 



  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {[
          { title: "TODO", tasks: todoTasks },
          { title: "IN-PROGRESS", tasks: inProgressTasks },
          { title: "DONE", tasks: doneTasks }
        ].map((section, index) => (
          <div key={index} className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-blue-200 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-blue-800 pb-2 border-b border-blue-200">{section.title}</h2>
            <div className="overflow-y-auto flex-grow">
              {section.tasks.length > 0  ?
              section.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              )) : 
              <h1>No Tasks Yet</h1>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}