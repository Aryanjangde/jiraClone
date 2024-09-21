// import React from 'react'
/* eslint-disable @typescript-eslint/no-unused-vars */
import TaskCard from "./TaskCard";


const mockTasks = [
  { id: 1, name: "Design new logo", priority: "High", deadline: "2023-06-30" },
  { id: 2, name: "Update user dashboard", priority: "Medium", deadline: "2023-07-15" },
  { id: 3, name: "Fix login bug", priority: "High", deadline: "2023-06-25" },
  { id: 4, name: "Write documentation", priority: "Low", deadline: "2023-07-30" },
  { id: 5, name: "Implement new feature", priority: "Medium", deadline: "2023-07-10" },
  { id: 6, name: "Refactor codebase", priority: "Low", deadline: "2023-08-15" },
  { id: 7, name: "Optimize database queries", priority: "High", deadline: "2023-07-05" },
  { id: 8, name: "Create user onboarding flow", priority: "Medium", deadline: "2023-07-20" },
  { id: 9, name: "Implement dark mode", priority: "Low", deadline: "2023-08-10" },
  { id: 10, name: "Set up CI/CD pipeline", priority: "High", deadline: "2023-07-01" },
  { id: 11, name: "Conduct user research", priority: "Medium", deadline: "2023-07-25" },
  { id: 12, name: "Update privacy policy", priority: "Low", deadline: "2023-08-05" },
]

export default function TaskBoard() {
  const todoTasks = mockTasks.slice(0, 4)
  const inProgressTasks = mockTasks.slice(4, 8)
  const doneTasks = mockTasks.slice(8)

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

              {section.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}