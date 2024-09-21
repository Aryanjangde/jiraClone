// import React from 'react'
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import { useProjectData } from "../context/Context"




const TaskCard = ({ task }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-blue-100" draggable>
    <h3 className="font-semibold text-lg mb-2 text-blue-800">{task.title}</h3>
    <div className="flex justify-between text-sm">
      {console.log(task)}
      <span className={`px-2 py-1 rounded ${
        task.priority === 'CRITICAL' ? 'bg-red-600 text-white' :
        task.priority === 'HIGH' ? 'bg-red-200 text-red-800' :
        task.priority === 'MEDIUM' ? 'bg-yellow-200 text-yellow-800' :
        'bg-green-200 text-green-800'
      }`}>
        {task.priority[0] + task.priority.slice(1).toLowerCase()}
      </span>
      <span className="text-blue-600">{new Date(task.deadline).toLocaleDateString("en-US")}</span>
    </div>         
  </div>
)


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